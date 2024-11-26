```bash
#!/bin/bash

# Colores para mensajes
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=== Instalación de AET Platform ===${NC}"

# 1. Crear estructura de directorios
echo -e "${BLUE}Creando estructura de directorios...${NC}"
mkdir -p aet-platform/{src,public,config}
mkdir -p aet-platform/src/{components,pages,services,styles}

# 2. Inicializar proyecto
echo -e "${BLUE}Inicializando proyecto...${NC}"
cd aet-platform
npm init -y

# 3. Instalar dependencias principales
echo -e "${BLUE}Instalando dependencias...${NC}"
npm install next react react-dom typescript @types/react @types/node
npm install tailwindcss postcss autoprefixer
npm install lucide-react @radix-ui/react-dialog @radix-ui/react-dropdown-menu

# 4. Configurar TypeScript
echo -e "${BLUE}Configurando TypeScript...${NC}"
npx tsc --init

# 5. Configurar Next.js
echo -e "${BLUE}Configurando Next.js...${NC}"
cat > next.config.js << EOL
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
EOL

# 6. Configurar Tailwind
echo -e "${BLUE}Configurando Tailwind CSS...${NC}"
npx tailwindcss init -p

# 7. Crear archivos principales
echo -e "${BLUE}Creando archivos principales...${NC}"

# Package.json actualizado
cat > package.json << EOL
{
  "name": "aet-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
EOL

# Página principal
cat > src/pages/index.tsx << EOL
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
EOL

# Estilos globales
cat > src/styles/globals.css << EOL
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #1a56db;
  --secondary: #4f46e5;
  --accent: #7c3aed;
}

body {
  @apply bg-gray-50;
}
EOL

# Configuración de Tailwind
cat > tailwind.config.js << EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      },
    },
  },
  plugins: [],
}
EOL

# 8. Crear archivo .env
cat > .env.local << EOL
NEXT_PUBLIC_APP_NAME=AET Platform
NEXT_PUBLIC_API_URL=http://localhost:3000
EOL

# 9. Crear .gitignore
cat > .gitignore << EOL
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOL

# 10. Inicializar Git
echo -e "${BLUE}Inicializando repositorio Git...${NC}"
git init
git add .
git commit -m "Configuración inicial de AET Platform"

echo -e "${GREEN}¡Instalación completada!${NC}"
echo -e "${BLUE}Para iniciar el servidor de desarrollo:${NC}"
echo "cd aet-platform"
echo "npm run dev"
echo -e "${BLUE}La aplicación estará disponible en:${NC} http://localhost:3000"

# Mensaje final
echo -e "\n${GREEN}=== Instalación Exitosa ===${NC}"
echo -e "Estructura del proyecto creada y configurada."
echo -e "Ubicación: ./aet-platform"
```
