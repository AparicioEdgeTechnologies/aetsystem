export interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
    temperature: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    cached: number;
  };
  network: {
    inbound: number;
    outbound: number;
    activeConnections: number;
    errors: number;
  };
  security: {
    threats: number;
    incidents: number;
    blockedAttacks: number;
    vulnerabilities: number;
  };
}

export interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  type: string;
  message: string;
  source: string;
  timestamp: Date;
  metadata: Record<string, any>;
  acknowledged: boolean;
}

// src/lib/monitoring/monitor.ts
import { Redis } from 'ioredis';
import { EventEmitter } from 'events';
import { SystemMetrics, Alert } from './types';

export class SystemMonitor extends EventEmitter {
  private redis: Redis;
  private metrics: SystemMetrics;
  private alerts: Alert[];
  private checkInterval: NodeJS.Timeout;

  constructor() {
    super();
    this.redis = new Redis(process.env.REDIS_URL);
    this.alerts = [];
    this.initializeMonitoring();
  }

  private async initializeMonitoring() {
    this.checkInterval = setInterval(() => {
      this.collectMetrics();
      this.analyzeMetrics();
    }, 5000); // cada 5 segundos

    // Suscribirse a eventos de seguridad
    this.redis.subscribe('security:events');
    this.redis.on('message', (channel, message) => {
      if (channel === 'security:events') {
        this.handleSecurityEvent(JSON.parse(message));
      }
    });
  }

  private async collectMetrics() {
    try {
      const metrics = await Promise.all([
        this.collectCPUMetrics(),
        this.collectMemoryMetrics(),
        this.collectNetworkMetrics(),
        this.collectSecurityMetrics()
      ]);

      this.metrics = {
        cpu: metrics[0],
        memory: metrics[1],
        network: metrics[2],
        security: metrics[3]
      };

      await this.redis.set('system:metrics', JSON.stringify(this.metrics));
      this.emit('metrics', this.metrics);
    } catch (error) {
      this.createAlert({
        severity: 'error',
        type: 'monitoring',
        message: 'Error collecting system metrics',
        source: 'SystemMonitor',
        metadata: { error: error.message }
      });
    }
  }

  private async analyzeMetrics() {
    // Análisis de CPU
    if (this.metrics.cpu.usage > 90) {
      this.createAlert({
        severity: 'warning',
        type: 'performance',
        message: 'High CPU usage detected',
        source: 'SystemMonitor',
        metadata: { usage: this.metrics.cpu.usage }
      });
    }

    // Análisis de memoria
    const memoryUsagePercent = (this.metrics.memory.used / this.metrics.memory.total) * 100;
    if (memoryUsagePercent > 85) {
      this.createAlert({
        severity: 'warning',
        type: 'performance',
        message: 'High memory usage detected',
        source: 'SystemMonitor',
        metadata: { usage: memoryUsagePercent }
      });
    }

    // Análisis de red
    if (this.metrics.network.errors > 100) {
      this.createAlert({
        severity: 'error',
        type: 'network',
        message: 'High network error rate detected',
        source: 'SystemMonitor',
        metadata: { errors: this.metrics.network.errors }
      });
    }

    // Análisis de seguridad
    if (this.metrics.security.threats > 0) {
      this.createAlert({
        severity: 'critical',
        type: 'security',
        message: 'Active security threats detected',
        source: 'SystemMonitor',
        metadata: { threats: this.metrics.security.threats }
      });
    }
  }

  private createAlert(alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>) {
    const newAlert: Alert = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      acknowledged: false,
      ...alert
    };

    this.alerts.push(newAlert);
    this.emit('alert', newAlert);

    // Publicar alerta
    this.redis.publish('system:alerts', JSON.stringify(newAlert));
  }

  async getMetrics(): Promise<SystemMetrics> {
    return this.metrics;
  }

  async getAlerts(options: { acknowledged?: boolean } = {}): Promise<Alert[]> {
    return this.alerts.filter(alert => {
      if (typeof options.acknowledged === 'boolean') {
        return alert.acknowledged === options.acknowledged;
      }
      return true;
    });
  }

  async acknowledgeAlert(alertId: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      this.emit('alert:acknowledged', alert);
    }
  }

  destroy() {
    clearInterval(this.checkInterval);
    this.redis.disconnect();
  }
}

// src/pages/api/monitor/metrics.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSystemMonitor } from '@/lib/monitoring';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const monitor = getSystemMonitor();
    const metrics = await monitor.getMetrics();
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
}
