# Net-Fix Hub - Security Audit Platform

Plataforma propietaria de auditoría de seguridad automatizada impulsada por IA, desarrollada por Aparicio Edge Technologies.

⚠️ **REPOSITORIO PRIVADO Y CONFIDENCIAL** ⚠️

Este repositorio contiene código propietario y confidencial. Está estrictamente prohibida su distribución o uso no autorizado.

## Credenciales de Superadmin
```
Email: admin@netfixhub.com
Password: NetFix2024!@#

IMPORTANTE: Cambiar esta contraseña inmediatamente después del primer inicio de sesión.
```

## Estructura del Proyecto

```
net-fix-hub/
├── frontend/                 # Next.js + React
├── backend/                  # FastAPI + PostgreSQL
├── infrastructure/           # Cloudflare + Docker
└── docs/                    # Documentación interna
```

## Variables de Entorno

### Producción
```env
# Backend (.env.production)
DATABASE_URL=postgresql://[USUARIO_PRODUCCION]:[CONTRASEÑA_PRODUCCION]@[HOST]/netfixhub_prod
JWT_SECRET=[JWT_SECRET_PRODUCCION]
STRIPE_API_KEY=[STRIPE_KEY_PRODUCCION]
ADMIN_EMAIL=admin@netfixhub.com
SMTP_HOST=[SMTP_HOST]
SMTP_PORT=[SMTP_PORT]
SMTP_USER=[SMTP_USER]
SMTP_PASS=[SMTP_PASS]

# Frontend (.env.production)
NEXT_PUBLIC_API_URL=https://api.netfixhub.com
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=[STRIPE_PUBLIC_KEY]
```

### Desarrollo
```env
# Backend (.env.development)
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/netfixhub_dev
JWT_SECRET=dev_secret_key
STRIPE_API_KEY=sk_test_...

# Frontend (.env.development)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

## Configuración Local

1. **Base de Datos:**
```bash
docker-compose -f docker/development.yml up -d database
```

2. **Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: `venv\Scripts\activate`
pip install -r requirements.txt
python manage.py migrate
python scripts/create_superuser.py
python manage.py runserver
```

3. **Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Despliegue

### Pre-requisitos
- Acceso a Cloudflare Dashboard
- Credenciales de AWS para backups
- Acceso a Stripe Dashboard
- Certificados SSL

### Proceso de Despliegue
1. **Preparación:**
   ```bash
   # Asegurarse de estar en la rama correcta
   git checkout production
   
   # Actualizar dependencias
   cd frontend && npm install
   cd ../backend && pip install -r requirements.txt
   ```

2. **Build y Deploy:**
   ```bash
   # Build Frontend
   cd frontend
   npm run build
   
   # Deploy a Cloudflare
   wrangler publish
   ```

3. **Base de Datos:**
   ```bash
   # Backup antes de migración
   pg_dump -U postgres netfixhub_prod > backup_$(date +%Y%m%d).sql
   
   # Aplicar migraciones
   python manage.py migrate
   ```

## Monitoreo y Logs

- Dashboard: https://dashboard.netfixhub.com
- Logs: https://logs.netfixhub.com
- Métricas: https://metrics.netfixhub.com

## Contactos Clave

- **DevOps:** devops@netfixhub.com
- **Seguridad:** security@netfixhub.com
- **Emergencias:** +1 (XXX) XXX-XXXX

## Procedimientos de Emergencia

1. **Caída del Servicio:**
   ```bash
   # Rollback rápido
   cd infrastructure
   ./scripts/rollback.sh
   ```

2. **Compromisos de Seguridad:**
   - Ejecutar `./security/lockdown.sh`
   - Notificar al equipo de seguridad
   - Iniciar protocolo de incident response

## Mantenimiento

### Backups
```bash
# Backup manual
./scripts/backup.sh

# Restaurar backup
./scripts/restore.sh [NOMBRE_BACKUP]
```

### Actualizaciones
```bash
# Actualizar dependencias
./scripts/update_deps.sh

# Actualizar certificados SSL
./scripts/update_certs.sh
```

## Tests

```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm run test
```

## Notas Importantes

- No exponer las variables de entorno
- Mantener las credenciales de superadmin seguras
- Realizar backups antes de cada despliegue
- Seguir el proceso de code review
- Mantener los logs por al menos 90 días

---

© 2024 Aparicio Edge Technologies - Todos los derechos reservados.

AVISO DE CONFIDENCIALIDAD: Este repositorio y su c