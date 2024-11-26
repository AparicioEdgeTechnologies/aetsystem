// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  AlertCircle, 
  Check, 
  ChevronRight, 
  Bot, 
  FileSearch, 
  Globe, 
  Server, 
  Cpu, 
  CreditCard, 
  Database, 
  ShieldCheck, 
  Search,
  Menu,
  X,
  Activity
} from 'lucide-react';
import Link from 'next/link';

const NetFixHub = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scanUrl, setScanUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [showFreeScanner, setShowFreeScanner] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
      description: 'Sistema de inteligencia artificial que evoluciona y aprende de cada análisis'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-sm border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white">Net-Fix Hub</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                Características
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Precios
              </Link>
              <Link href="#scanner" className="text-gray-300 hover:text-white transition-colors">
                Scanner Demo
              </Link>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
                Iniciar Sesión
              </button>
            </div>

            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4">
              <Link href="#features" className="block text-gray-300 hover:text-white py-2">
                Características
              </Link>
              <Link href="#pricing" className="block text-gray-300 hover:text-white py-2">
                Precios
              </Link>
              <Link href="#scanner" className="block text-gray-300 hover:text-white py-2">
                Scanner Demo
              </Link>
              <button className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </nav>

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
            <div key={stat.label} className="bg-white/5 backdrop-blur-lg border-indigo-500/20 rounded-xl p-6">
              <stat.icon className="w-8 h-8 text-indigo-400 mb-2" />
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-indigo-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Tecnología de Vanguardia
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white/5 backdrop-blur-lg border-indigo-500/20 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-indigo-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Planes de Protección
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-white/5 backdrop-blur-lg border-indigo-500/20 rounded-xl p-6 hover:bg-white/10 transition-all ${
                plan.popular ? 'ring-2 ring-indigo-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-xl">
                  Más Popular
                </div>
              )}
              <plan.icon className="w-12 h-12 text-indigo-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold text-indigo-400 mb-6">
                ${plan.price}
                <span className="text-indigo-200 text-lg">/mes</span>
              </div>
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-indigo-400 mr-3" />
                    <span className="text-indigo-200">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-slate-800/50 border-indigo-500/30 rounded-lg p-4">
                  <div className="text-white font-semibold">Límite de Escaneos</div>
                  <div className="text-indigo-200">{plan.scanLimit}</div>
                </div>
                <button 
                  onClick={() => handlePayment(plan)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Seleccionar Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-slate-800/90 border-indigo-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Procesar Pago Seguro</h2>
            <p className="text-indigo-200 mb-6">
              Plan seleccionado: {selectedPlan?.name}
            </p>
            <div className="bg-slate-700/50 p-4 rounded-lg text-white mb-6">
              <p>Total a pagar: ${selectedPlan?.price}/mes</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowPayment(false)}
                className="px-4 py-2 text-indigo-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg">
                Pagar Ahora
              </button>
            </div>
          </div>
        </div>