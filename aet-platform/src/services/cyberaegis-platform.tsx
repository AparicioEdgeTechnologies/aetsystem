import React, { useState } from 'react';
import { 
  Shield, Lock, AlertCircle, Check, ChevronRight, Bot, 
  FileSearch, Globe, Server, Cpu, CreditCard, Database, 
  ShieldCheck, Search, Menu, X, Settings, LogOut, 
  Bell, User, Terminal, Activity, BarChart, Zap 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CyberAegisPlatform = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [loading, setLoading] = useState(false);

  const metrics = [
    { label: 'Vulnerabilidades', value: '147', icon: AlertCircle, color: 'text-red-400' },
    { label: 'Sistemas Protegidos', value: '1,284', icon: Shield, color: 'text-green-400' },
    { label: 'Amenazas Bloqueadas', value: '8,942', icon: Lock, color: 'text-blue-400' },
    { label: 'Nivel de Seguridad', value: '94%', icon: Activity, color: 'text-purple-400' }
  ];

  const NavBar = () => (
    <nav className="bg-slate-900 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-purple-400" />
            <span className="ml-2 text-xl font-bold text-white">CyberAegis</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button className="text-gray-300 hover:text-white px-3 py-2">Dashboard</button>
                <button className="text-gray-300 hover:text-white px-3 py-2">Escaneos</button>
                <button className="text-gray-300 hover:text-white px-3 py-2">Reportes</button>
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-300 hover:text-white cursor-pointer" />
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500">
                  Mi Cuenta
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentView('login')}
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => setCurrentView('register')}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-2">
            {isAuthenticated ? (
              <>
                <a href="#" className="block text-gray-300 hover:text-white px-3 py-2">Dashboard</a>
                <a href="#" className="block text-gray-300 hover:text-white px-3 py-2">Escaneos</a>
                <a href="#" className="block text-gray-300 hover:text-white px-3 py-2">Reportes</a>
                <a href="#" className="block text-gray-300 hover:text-white px-3 py-2">Mi Cuenta</a>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentView('login')}
                  className="block w-full text-left text-gray-300 hover:text-white px-3 py-2"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => setCurrentView('register')}
                  className="block w-full text-left text-gray-300 hover:text-white px-3 py-2"
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );

  const Scanner = () => {
    const [url, setUrl] = useState('');

    const handleScan = () => {
      setLoading(true);
      // Simulación de escaneo
      setTimeout(() => {
        setScanData({
          vulnerabilities: 3,
          riskLevel: 'Medio',
          recommendations: [
            'Actualizar certificados SSL',
            'Configurar WAF',
            'Actualizar dependencias'
          ]
        });
        setLoading(false);
      }, 2000);
    };

    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Card className="bg-white/5 backdrop-blur-lg border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Escáner de Seguridad</CardTitle>
            <CardDescription className="text-purple-300">
              Analiza las vulnerabilidades de tu sitio web
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Ingresa la URL a analizar"
                className="flex-1 px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white"
              />
              <button
                onClick={handleScan}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg flex items-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                {loading ? 'Analizando...' : 'Escanear'}
              </button>
            </div>

            {scanData && (
              <div className="mt-6 space-y-4">
                <Alert className="bg-red-500/10 border-red-500/50">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <AlertDescription className="text-red-400">
                    Se encontraron {scanData.vulnerabilities} vulnerabilidades
                  </AlertDescription>
                </Alert>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Recomendaciones:</h3>
                  <ul className="space-y-2">
                    {scanData.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center gap-2 text-purple-300">
                        <Check className="w-4 h-4 text-purple-400" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <NavBar />
      <main className="py-8">
        <Scanner />
      </main>
    </div>
  );
};

export default CyberAegisPlatform;
