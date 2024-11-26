# Net-Fix Hub

Plataforma de auditoría de seguridad automatizada impulsada por IA.

## Estructura del Proyecto

```
net-fix-hub/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── auth/
│   │   └── scanner/
│   ├── scripts/
│   └── requirements.txt
├── docker/
│   ├── frontend.dockerfile
│   ├── backend.dockerfile
│   └── docker-compose.yml
└── README.md
```

## Requisitos

- Node.js >= 16
- Python >= 3.9
- PostgreSQL >= 13
- Docker & Docker Compose

## Configuración del Entorno

1. Clonar el repositorio:
```bash
git clone https://github.com/tuorganizacion/net-fix-hub.git
cd net-fix-hub
```

2. Configurar variables de entorno:
```bash
# Backend (.env)
DATABASE_URL=postgresql://user:password@localhost:5432/netfixhub
SECRET_KEY=your-secret-key
STRIPE_API_KEY=your-stripe-key
ALLOWED_HOSTS=localhost,netfixhub.com

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Instalar dependencias:
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # o `venv\Scripts\activate` en Windows
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

## Desarrollo Local

1. Iniciar servicios:
```bash
docker-compose up -d database
```

2. Iniciar backend:
```bash
cd backend
python manage.py migrate
python manage.py runserver
```

3. Iniciar frontend:
```bash
cd frontend
npm run dev
```

## Despliegue en Cloudflare

1. Crear proyecto en Cloudflare Pages:
```bash
# Instalar Wrangler
npm install -g wrangler

# Login en Cloudflare
wrangler login

# Publicar
cd frontend
wrangler pages publish build
```

2. Configurar Workers:
```bash
cd backend
wrangler publish
```

3. Configurar DNS en Cloudflare:
- Agregar dominio
- Configurar registros A y CNAME
- Habilitar SSL/TLS

## Seguridad

- Todas las contraseñas se almacenan hasheadas
- Implementación de CORS
- Rate limiting
- Protección contra CSRF
- Headers de seguridad configurados
- Auditoría de accesos

## Contribuir

1. Fork el repositorio
2. Crear rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

Propiedad de Aparicio Edge Technologies. Todos los derechos reservados.
