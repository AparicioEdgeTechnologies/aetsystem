import React, { useState } from 'react';
import { Shield, Database, Lock, Search, Activity, Cloud, Mobile, Cpu, Code, Key } from 'lucide-react';

const AEGDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const solutions = [
    {
      category: 'Core Security',
      products: [
        { 
          name: 'AEG Shield', 
          icon: Shield,
          description: 'Protección integral de red',
          features: ['Firewall IA', 'IDS/IPS', 'VPN']
        },
        { 
          name: 'AEG Vault', 
          icon: Database,
          description: 'Gestión segura de datos',
          features: ['Backup', 'Encriptación', 'Recovery']
        },
        { 
          name: 'AEG Guard', 
          icon: Lock,
          description: 'Control de acceso avanzado',
          features: ['MFA', 'SSO', 'IAM']
        }
      ]
    },
    {
      category: 'Advanced Protection',
      products: [
        { 
          name: 'AEG Scanner', 
          icon: Search,
          description: 'Análisis de vulnerabilidades',
          features: ['Pentesting', 'Malware', 'Reportes']
        },
        { 
          name: 'AEG Monitor', 
          icon: Activity,
          description: 'Monitorización 24/7',
          features: ['Alertas', 'Logs', 'Métricas']
        }
      ]
    },
    {
      category: 'Cloud & Mobile',
      products: [
        { 
          name: 'AEG Cloud', 
          icon: Cloud,
          description: 'Seguridad multi-cloud',
          features: ['AWS', 'Azure', 'GCP']
        },
        { 
          name: 'AEG Mobile', 
          icon: Mobile,
          description: 'Protección móvil',
          features: ['MDM', 'Apps', 'BYOD']
        }
      ]
    },
    {
      category: 'Next-Gen Security',
      products: [
        { 
          name: 'AEG DevSecOps', 
          icon: Code,
          description: 'Seguridad en desarrollo',
          features: ['Pipeline', 'Testing', 'CI/CD']
        },
        { 
          name: 'AEG Quantum', 
          icon: Cpu,
          description: 'Seguridad cuántica',
          features: ['Encriptación', 'PQC', 'QKD']
        },
        { 
          name: 'AEG Zero Trust', 
          icon: Key,
          description: 'Arquitectura Zero Trust',
          features: ['Verificación', 'Micro-seg', 'Políticas']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Soluciones de Seguridad
          </h1>
          <p className="text-xl text-purple-300">
            Aparicio Edge Technologies
          </p>
        </header>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Todas
          </button>
          {solutions.map(section => (
            <button
              key={section.category}
              onClick={() => setSelectedCategory(section.category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === section.category 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {section.category}
            </button>
          ))}
        </div>

        {/* Grid de soluciones */}
        <div className="grid gap-8">
          {solutions
            .filter(section => selectedCategory === 'all' || selectedCategory === section.category)
            .map(section => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {section.category}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {section.products.map(product => (
                    <div 
                      key={product.name}
                      className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <product.icon className="w-8 h-8 text-purple-400" />
                        <h3 className="text-xl font-semibold text-white">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-gray-300 mb-4">
                        {product.description}
                      </p>
                      <ul className="space-y-2">
                        {product.features.map(feature => (
                          <li 
                            key={feature}
                            className="flex items-center gap-2 text-gray-400"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AEGDashboard;
