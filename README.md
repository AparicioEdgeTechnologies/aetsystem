# Aparicio Edge Technologies (AET) Platform

AET Platform es una solución de seguridad empresarial avanzada que proporciona monitoreo continuo, detección de vulnerabilidades y protección en tiempo real impulsada por IA.

## Características Principales

- 🛡️ **Escaneo de Seguridad Avanzado**
  - Análisis de vulnerabilidades
  - Pruebas de penetración automatizadas
  - Detección de malware
  - Análisis de configuraciones

- 🔍 **Monitorización en Tiempo Real**
  - Dashboard en tiempo real
  - Alertas instantáneas
  - Métricas de rendimiento
  - Análisis de tendencias

- 🤖 **IA y Automatización**
  - Detección proactiva de amenazas
  - Respuesta automática a incidentes
  - Aprendizaje continuo
  - Optimización automática

- 💼 **Gestión Empresarial**
  - Múltiples organizaciones
  - Control de acceso granular
  - Informes personalizados
  - Integración API

## Requisitos Previos

- Node.js 18+
- Docker y Docker Compose
- PostgreSQL 14+
- Redis 7+

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/aparicioedge/aet-platform.git
cd aet-platform
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```

4. Iniciar servicios con Docker:
```bash
docker-compose up -d
```

5. Ejecutar migraciones:
```bash
npm run prisma:migrate
```

## Desarrollo

```bash
# Iniciar en modo desarrollo
npm run dev

# Ejecutar tests
npm run test

# Verificar linting
npm run lint

# Construir para producción
npm run build
```

## Despliegue

El proyecto utiliza GitHub Actions para CI/CD y Pulumi para infraestructura como código. Para desplegar:

1. Configurar secretos en GitHub:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`

2. Pushear a la rama main:
```bash
git push origin main
```

## Estructura del Proyecto

```
aet-platform/
├── apps/                # Aplicaciones principales
│   ├── web/            # Frontend Next.js
│   ├── scanner/        # Servicio de escaneo
│   └── monitor/        # Servicio de monitoreo
├── packages/           # Paquetes compartidos
├── infrastructure/     # Configuración de infraestructura
├── prisma/            # Esquema y migraciones
└── docker/            # Configuración Docker
```

## API Documentation

La documentación de la API está disponible en `/docs/api` cuando el servidor está en ejecución.

## Contribución

1. Fork el repositorio
2. Crear una rama para la característica: `git checkout -b feature/nueva-caracteristica`
3. Commit los cambios: `git commit -am 'Añadir nueva característica'`
4. Push a la rama: `git push origin feature/nueva-caracteristica`
5. Crear un Pull Request

## Licencia

Copyright © 2024 Aparicio Edge Technologies. Todos los derechos reservados.

## Soporte

Para soporte técnico, contactar a:
- Email: support@aparicioedge.tech
- Web: https://aparicioedge.tech/support
aet-platform/
├── apps/
│   ├── web/               # Next.js frontend
│   ├── netfix-hub/        # Security platform
│   ├── aeg-shield/        # Network protection
│   ├── aeg-guard/         # Access management
│   ├── aeg-scanner/       # Vulnerability scanner
│   └── aeg-monitor/       # System monitoring
├── packages/
│   ├── core/              # Shared core functionality
│   ├── ui/                # Component library
│   ├── utils/             # Shared utilities
│   └── config/            # Shared configuration
├── docs/
│   ├── api/              # API documentation
│   ├── deployment/       # Deployment guides
│   └── security/         # Security documentation
├── scripts/              # Development scripts
└── docker/              # Containerization
