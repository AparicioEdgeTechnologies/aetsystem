import React, { useState } from 'react';
import { Shield, Lock, AlertCircle, Check, ChevronRight, Bot, FileSearch, Globe, Server, Cpu, CreditCard, Database, ShieldCheck, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SecurityPlatform = () => {
  const [showFreeScanner, setShowFreeScanner] = useState(false);
  const [scanUrl, setScanUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  // Color scheme
  const colors = {
    primary: '#6366F1', // Indigo
    secondary: '#EC4899', // Pink
    accent: '#8B5CF6', // Purple
    success: '#10B981', // Emerald
    warning: '#F59E0B', // Amber
    background: '#0F172A', // Slate 900
    foreground: '#F8FAFC', // Slate 50
  };

  const handleFreeScan = async () => {
    setScanning(true);
    try {
      const response = await fetch('/api/scan/free', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target_url: scanUrl }),
      });
      const data = await response.json();
      setScanResults(data);
    } catch (error) {
      console.error('Scan failed:', error);
    }
    setScanning(false);
  };

  // ... [Previous code for stats, features, and plans remains the same]

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${colors.background} 0%, #1E1B4B 100%)` }}>
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-10 animate-gradient"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="animate-fadeIn">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6">
              Net-Fix Hub
            </h1>
            <p className="text-xl text-indigo-300 mb-2">by Aparicio Edge Technologies</p>
            <p className="text-2xl text-gray-300 mb-8">