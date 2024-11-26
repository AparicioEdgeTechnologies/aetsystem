#!/bin/bash

# Colores
GREEN="\033[0;32m"
# shellcheck disable=SC2034
RED="\033[0;31m"
BLUE="\033[0;34m"
NC="\033[0m"

# Configuración
DOMAIN="hapariciop.uk"
SERVER_IP="TU_IP_DEL_SERVIDOR"

echo -e "${BLUE}Configurando DNS para México y Estados Unidos${NC}"

# Solicitar credenciales de Cloudflare
echo -e "${GREEN}Ingresa tus credenciales de Cloudflare:${NC}"
read -p "Email de Cloudflare: " CF_EMAIL
read -sp "API Key de Cloudflare: " CF_API_KEY
echo
read -p "Zone ID: " ZONE_ID

# Configurar registros DNS para balanceo geográfico
echo -e "${GREEN}Configurando registros DNS...${NC}"

# Registro A principal
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
     -H "X-Auth-Email: $CF_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data "{
       \"type\": \"A\",
       \"name\": \"@\",
       \"content\": \"$SERVER_IP\",
       \"ttl\": 1,
       \"proxied\": true
     }"

# Configurar reglas de load balancing para diferentes regiones
echo -e "${GREEN}Configurando reglas de geolocalización...${NC}"

# Configurar Page Rules para caché
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/pagerules" \
     -H "X-Auth-Email: $CF_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data "{
       \"targets\": [
         {
           \"target\": \"url\",
           \"constraint\": {
             \"operator\": \"matches\",
             \"value\": \"*$DOMAIN/*\"
           }
         }
       ],
       \"actions\": [
         {
           \"id\": \"cache_level\",
           \"value\": \"cache_everything\"
         },
         {
           \"id\": \"edge_cache_ttl\",
           \"value\": 7200
         }
       ],
       \"status\": \"active\"
     }"

# Configurar encaminamiento optimizado
echo -e "${GREEN}Configurando encaminamiento optimizado...${NC}"

# Configurar Argo Smart Routing si está disponible
curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/argo/smart_routing" \
     -H "X-Auth-Email: $CF_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data "{
       \"value\": \"on\"
     }"

# Configurar reglas de firewall para geo-restricción
echo -e "${GREEN}Configurando reglas de firewall...${NC}"

# Permitir México y Estados Unidos
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules" \
     -H "X-Auth-Email: $CF_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data "[
       {
         \"filter\": {
           \"expression\": \"(ip.geoip.country eq \\\"MX\\\" or ip.geoip.country eq \\\"US\\\")\",
           \"paused\": false
         },
         \"action\": \"allow\"
       }
     ]"

# Configurar Workers para redirección geográfica
cat > geo-worker.js << EOL
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const country = request.headers.get('CF-IPCountry')
  
  // Optimizar para México y Estados Unidos
  if (country === 'MX' || country === 'US') {
    const response = await fetch(request)
    return new Response(response.body, {
      ...response,
      headers: {
        ...response.headers,
        'Cache-Control': 'public, max-age=7200',
        'X-Geo-Location': country
      }
    })
  }
  
  return fetch(request)
}
EOL

# Guardar configuración
echo -e "${BLUE}Guardando configuración...${NC}"
cat > dns-config.txt << EOL
Configuración DNS para ${DOMAIN}

Registros DNS:
- Tipo: A
- Nombre: @
- Contenido: ${SERVER_IP}
- Proxy: Activado

Optimización geográfica:
- México (MX)
- Estados Unidos (US)

Configuración de caché:
- TTL Edge: 7200 segundos
- Nivel de caché: Cache Everything

Reglas de firewall:
- Permitir: MX, US
- Smart Routing: Activado

Datacenter primarios:
- Dallas (Estados Unidos)
- Ciudad de México (México)

Recomendaciones:
1. Monitorear latencia desde ambos países
2. Verificar tiempos de respuesta
3. Comprobar distribución de tráfico
EOL

echo -e "${GREEN}¡Configuración DNS completada!${NC}"
echo -e "\nPasos para verificar:"
echo "1. Prueba desde México: https://www.whatsmydns.net/#A/$DOMAIN"
echo "2. Prueba desde Estados Unidos: https://www.whatsmydns.net/#A/$DOMAIN"
echo "3. Verifica la latencia: https://tools.keycdn.com/ping"

echo -e "\n${BLUE}Instrucciones adicionales:${NC}"
echo "1. Configurar monitoreo en Cloudflare"
echo "2. Verificar los logs de acceso"
echo "3. Comprobar métricas de caché"
