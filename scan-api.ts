import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

// Schema de validación
const scanRequestSchema = z.object({
  target_url: z.string().url()
})

// Rate limiting simple (deberías usar una solución más robusta en producción)
const REQUESTS_PER_MINUTE = 3
const requests = new Map<string, number[]>()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validar el cuerpo de la petición
    const body = scanRequestSchema.parse(req.body)
    
    // Rate limiting básico
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const now = Date.now()
    const userRequests = requests.get(ip as string) || []
    const recentRequests = userRequests.filter(time => now - time < 60000)
    
    if (recentRequests.length >= REQUESTS_PER_MINUTE) {
      return res.status(429).json({ error: 'Too many requests' })
    }
    
    requests.set(ip as string, [...recentRequests, now])

    // Simulación de escaneo (reemplazar con tu lógica real)
    const scanResults = {
      url: body.target_url,
      timestamp: new Date().toISOString(),
      findings: [
        {
          severity: 'info',
          description: 'Puerto 80 (HTTP) abierto',
        },
        {
          severity: 'low',
          description: 'Servidor web detectado: nginx',
        }
      ],
      summary: {
        high: 0,
        medium: 0,
        low: 1,
        info: 1
      }
    }

    return res.status(200).json(scanResults)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid request data' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}
