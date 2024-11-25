import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export const PLANS = {
  BASIC: {
    id: 'basic',
    name: 'Basic',
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    price: 299,
    features: [
      'Escaneo básico de vulnerabilidades',
      'Análisis de puertos abiertos',
      'Detección de malware',
      'Reporte mensual detallado',
      'Soporte por email'
    ],
    limits: {
      scansPerMonth: 5,
      usersPerOrg: 3,
      retentionDays: 30
    }
  },
  PRO: {
    id: 'pro',
    name: 'Professional',
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    price: 699,
    features: [
      'Todo lo de Basic +',
      'Pruebas de penetración automatizadas',
      'Análisis de configuraciones',
      'Parches automáticos',
      'Soporte 24/7'
    ],
    limits: {
      scansPerMonth: 20,
      usersPerOrg: 10,
      retentionDays: 90
    }
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    price: 1499,
    features: [
      'Todo lo de Professional +',
      'Auditoría completa de seguridad',
      'Análisis de código fuente',
      'Protección DDoS avanzada',
      'API personalizada',
      'Consultor dedicado'
    ],
    limits: {
      scansPerMonth: -1, // ilimitado
      usersPerOrg: -1, // ilimitado
      retentionDays: 365
    }
  }
};

// src/lib/stripe/subscription.ts
import { prisma } from '@/lib/db';
import type { Subscription, User, Organization } from '@prisma/client';

export class SubscriptionManager {
  async createSubscription(organizationId: string, planId: string): Promise<Subscription> {
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
      include: { subscription: true }
    });

    if (!organization) {
      throw new Error('Organization not found');
    }

    const plan = PLANS[planId.toUpperCase()];
    if (!plan) {
      throw new Error('Invalid plan');
    }

    // Crear o actualizar cliente en Stripe
    let stripeCustomerId = organization.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: organization.billingEmail,
        metadata: { organizationId }
      });
      stripeCustomerId = customer.id;

      await prisma.organization.update({
        where: { id: organizationId },
        data: { stripeCustomerId }
      });
    }

    // Crear suscripción en Stripe
    const subscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: plan.priceId }],
      metadata: { organizationId }
    });

    // Guardar suscripción en la base de datos
    return await prisma.subscription.create({
      data: {
        organizationId,
        planId: plan.id,
        status: 'active',
        stripeSubscriptionId: subscription.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: false
      }
    });
  }

  async cancelSubscription(organizationId: string): Promise<void> {
    const subscription = await prisma.subscription.findFirst({
      where: { organizationId }
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Cancelar en Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true
    });

    // Actualizar en base de datos
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { cancelAtPeriodEnd: true }
    });
  }

  async upgradeSubscription(organizationId: string, newPlanId: string): Promise<Subscription> {
    const subscription = await prisma.subscription.findFirst({
      where: { organizationId },
      include: { organization: true }
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const plan = PLANS[newPlanId.toUpperCase()];
    if (!plan) {
      throw new Error('Invalid plan');
    }

    // Actualizar suscripción en Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      items: [{
        id: subscription.stripeSubscriptionId,
        price: plan.priceId
      }],
      proration_behavior: 'always_invoice'
    });

    // Actualizar en base de datos
    return await prisma.subscription.update({
      where: { id: subscription.id },
      data: { planId: plan.id }
    });
  }

  async checkSubscriptionStatus(organizationId: string): Promise<{
    isActive: boolean;
    plan: typeof PLANS[keyof typeof PLANS];
    daysRemaining: number;
  }> {
    const subscription = await prisma.subscription.findFirst({
      where: { organizationId }
    });

    if (!subscription) {
      return {
        isActive: false,
        plan: PLANS.BASIC,
        daysRemaining: 0
      };
    }

    const now = new Date();
    const daysRemaining = Math.ceil(
      (subscription.currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      isActive: subscription.status === 'active',
      plan: PLANS[subscription.planId.toUpperCase()],
      daysRemaining
    };
  }
}

// src/pages/api/webhooks/stripe.ts
import { buffer } from 'micro';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature']!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeletion(deletedSubscription);
        break;
      case 'invoice.payment_failed':
        const invoice = event.data.object as Stripe.Invoice;
        await handleFailedPayment(invoice);
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const organizationId = subscription.metadata.organizationId;
  
  await prisma.subscription.update({
    where: {
      stripeSubscriptionId: subscription.id
    },
    data: {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end
    }
  });
}

async function handleSubscriptionDeletion(subscription: Stripe.Subscription) {
  await prisma.subscription.update({
    where: {
      stripeSubscriptionId: subscription.id
    },
    data: {
      status: 'canceled'
    }
  });
}

async function handleFailedPayment(invoice: Stripe.Invoice) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      stripeSubscriptionId: invoice.subscription as string
    },
    include: {
      organization: true
    }
  });

  if (subscription) {
    // Notificar al usuario del fallo de pago
    await sendPaymentFailureNotification(
      subscription.organization.billingEmail,
      invoice.hosted_invoice_url!
    );
  }
}
