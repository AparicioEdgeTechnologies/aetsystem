import React from 'react';
import { Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Shield className="w-16 h-16 text-blue-600 mx-auto" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            AET Platform
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Sistema de Seguridad Inteligente
          </p>
        </div>
      </div>
    </div>
  );
}
