import React, { useState } from 'react';
import { Shield, Lock, AlertCircle, Check, ChevronRight, Bot, FileSearch, Globe, Server, Cpu, CreditCard, Database, ShieldCheck, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SecurityPlatform = () => {
  const [showFreeScanner, setShowFreeScanner] = useState(false);
  const [scanUrl, setScanUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const stats = [
    { value: '99.9%', label: 'Precisión en Detección', icon: ShieldCheck },
    { value: '24/7', label: 'Monitoreo Continuo', icon: Server },
    { value: '+5000', label: 'Empresas Protegidas', icon: Globe },
    { value: '+1M', label: 'Amenazas Detectadas', icon: Database }
  ];

  const features = [
    {
      icon: Bot,
      title: 'IA Avanzada de Última Generación',
      description: 'Sistema de inteligencia artificial que evoluciona y aprende de cada análisis realizado'
    },
    {
      icon: Shield,
      title: 'Protección Automatizada',
      description: 'Detección y corrección automática de vulnerabilidades en tiempo real'
    },
    {
      icon: Cpu,
      title: 'Tecnología Quantum-Ready',
      description: 'Preparada para enfrentar amenazas de la era cuántica'
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: '299',
      features: [
        'Escaneo básico de vulnerabilidades',
        'Análisis de puertos abiertos',
        'Detección de malware',
        'Reporte mensual detallado',
        'Soporte por email'
      ],
      scanLimit: '1 escaneo/mes',
      icon: Shield
    },
    {
      name: 'Professional',
      price: '699',
      features: [
        'Todo lo de Basic +',
        'Pruebas de penetración automatizadas',
        'Análisis de configuraciones',
        'Detección de endpoints vulnerables',
        'Parches automáticos básicos',
        'Soporte 24/7 prioritario'
      ],
      scanLimit: '5 escaneos/mes',
      icon: Lock,
      popular: true
    },
    {
      name: 'Enterprise',
      price: '1499',
      features: [
        'Todo lo de Professional +',
        'Auditoría completa de seguridad',
        'Análisis de código fuente',
        'Protección DDoS avanzada',
        'Parches automáticos inteligentes',
        'API personalizada',
        'Consultor de seguridad dedicado'
      ],
      scanLimit: 'Escaneos ilimitados',
      icon: AlertCircle
    }
  ];

  const handleFreeScan = async () => {
    setScanning(true);
    try {
      const response = await fetch('/api/scan/free', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target_url: scanUrl })
      });
      const data = await response.json();
      setScanResults(data);
    } catch (error) {
      console.error('Scan failed:', error);
    }
    setScanning(false);
  };

  const handlePayment = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6">
            Net-Fix Hub
          </h1>
          <p className="text-xl text-indigo-300 mb-2">by Aparicio Edge Technologies</p>
          <p className="text-2xl text-gray-300 mb-8">
            Plataforma de Seguridad Avanzada Impulsada por IA
          </p>

          {/* Free Scanner Section */}
          <div className="max-w-2xl mx-auto mb-12 p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-indigo-500/20">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Prueba Gratuita</h2>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={scanUrl}
                onChange={(e) => setScanUrl(e.target.value)}
                placeholder="Ingresa el dominio a escanear"
                className="flex-1 px-4 py-2 bg-slate-800 border border-indigo-500/30 rounded-lg text-white"
              />
              <button
                onClick={handleFreeScan}
                disabled={scanning}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg flex items-center gap-2"
              >
                {scanning ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Escanear
              </button>
            </div>
            {scanResults && (
              <div className="text-left bg-slate-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-300 mb-2">Resultados del Escaneo</h3>
                <pre className="text-sm text-gray-300 overflow-auto">
                  {JSON.stringify(scanResults, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-white/5 backdrop-blur-lg border-indigo-500/20">
              <CardHeader>
                <stat.icon className="w-8 h-8 text-indigo-400 mb-2" />
                <CardTitle className="text-3xl font-bold text-white">{stat.value}</CardTitle>
                <CardDescription className="text-indigo-200">{stat.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Tecnología de Vanguardia
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-white/5 backdrop-blur-lg border-indigo-500/20 hover:bg-white/10 transition-colors">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
                <CardTitle className="text-xl font-bold text-white">{feature.title}</CardTitle>
                <CardDescription className="text-indigo-200">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Plans Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Planes de Protección
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative bg-white/5 backdrop-blur-lg border-indigo-500/20 hover:bg-white/10 transition-all ${
                plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg">
                  Más Popular
                </div>
              )}
              <CardHeader>
                <plan.icon className="w-12 h-12 text-indigo-400 mb-4" />
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold text-indigo-400">${plan.price}</span>
                  <span className="text-indigo-200">/mes</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-indigo-200">
                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-indigo-400 mr-3" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-4">
                  <Alert className="bg-slate-800/50 border-indigo-500/30">
                    <AlertTitle className="text-white">Límite de Escaneos</AlertTitle>
                    <AlertDescription className="text-indigo-200">{plan.scanLimit}</AlertDescription>
                  </Alert>
                  <button 
                    onClick={() => handlePayment(plan)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Seleccionar Plan
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-slate-800/90 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="text-white">Procesar Pago Seguro</CardTitle>
              <CardDescription className="text-indigo-200">
                Plan seleccionado: {selectedPlan.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg text-white">
                  <p>Total a pagar: ${selectedPlan.price}/mes</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowPayment(false)}
                className="px-4 py-2 text-indigo-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg">
                Pagar Ahora
              </button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SecurityPlatform;
