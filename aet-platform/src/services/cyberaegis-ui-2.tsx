import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, AlertCircle, Terminal, Cpu, Globe, Server, Database,
  BarChart2, Users, Clock, ChevronRight, Menu, X, ExternalLink
} from 'lucide-react';

const CyberAegisApp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', id: 'home' },
    { name: 'Servicios', id: 'services' },
    { name: 'Características', id: 'features' },
    { name: 'Precios', id: 'pricing' },
    { name: 'Contacto', id: 'contact' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Análisis Automatizado',
      description: 'Detección continua de vulnerabilidades con IA avanzada'
    },
    {
      icon: Terminal,
      title: 'Pentesting Inteligente',
      description: 'Pruebas de penetración automatizadas y personalizables'
    },
    {
      icon: Lock,
      title: 'Protección en Tiempo Real',
      description: 'Monitoreo 24/7 y respuesta automática a amenazas'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Precisión', icon: BarChart2 },
    { value: '24/7', label: 'Monitoreo', icon: Clock },
    { value: '+5000', label: 'Empresas Protegidas', icon: Users },
    { value: '+1M', label: 'Amenazas Detectadas', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white">CyberAegis</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
                Iniciar Ahora
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-lg"
                >
                  {item.name}
                </button>
              ))}
              <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
                Iniciar Ahora
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900/50 to-slate-900/50" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="animate-fade-in space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Seguridad Automatizada
              <br />
              con Inteligencia Artificial
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Protege tu infraestructura digital con análisis continuo de vulnerabilidades
              y respuesta automática a amenazas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-2">
                Comenzar Ahora
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-3 border border-purple-400 text-purple-400 rounded-lg hover:bg-purple-400/10 transition-colors flex items-center gap-2">
                Ver Demo
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Tecnología de Vanguardia
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Nuestra plataforma utiliza las últimas tecnologías en ciberseguridad
              para mantener tu infraestructura protegida.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:bg-white/10 transition-colors">
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-purple-900/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Comienza a proteger tu infraestructura hoy
          </h2>
          <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
            Iniciar Prueba Gratuita
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
                <span className="ml-2 text-lg font-bold text-white">CyberAegis</span>
              </div>
              <p className="text-gray-400">
                Seguridad automatizada para la era digital
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Características</li>
                <li>Precios</li>
                <li>Documentación</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sobre Nosotros</li>
                <li>Blog</li>
                <li>Carreras</li>
                <li>Contacto</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacidad</li>
                <li>Términos</li>
                <li>Seguridad</li>
                <li>Cumplimiento</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 CyberAegis. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CyberAegisApp;
