// packages/core/index.ts
export interface AEGService {
  name: string;
  version: string;
  initialize(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  status(): Promise<ServiceStatus>;
}

export enum ServiceStatus {
  STARTING = 'starting',
  RUNNING = 'running',
  STOPPING = 'stopping',
  STOPPED = 'stopped',
  ERROR = 'error'
}

export interface SecurityEvent {
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'critical';
  source: string;
  message: string;
  data?: Record<string, unknown>;
}

export class BaseService implements AEGService {
  protected status: ServiceStatus = ServiceStatus.STOPPED;
  protected events: SecurityEvent[] = [];

  constructor(
    public readonly name: string,
    public readonly version: string
  ) {}

  async initialize(): Promise<void> {
    this.status = ServiceStatus.STARTING;
    // Implementación específica en cada servicio
  }

  async start(): Promise<void> {
    if (this.status !== ServiceStatus.STARTING) {
      throw new Error('Service must be initialized before starting');
    }
    this.status = ServiceStatus.RUNNING;
  }

  async stop(): Promise<void> {
    this.status = ServiceStatus.STOPPING;
    // Limpieza y parada
    this.status = ServiceStatus.STOPPED;
  }

  async getStatus(): Promise<ServiceStatus> {
    return this.status;
  }

  protected logEvent(event: SecurityEvent): void {
    this.events.push(event);
    // Implementar logging real
  }
}

// Configuración de tipos comunes
export interface User {
  id: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  AUDITOR = 'auditor'
}

export interface Permission {
  resource: string;
  action: 'read' | 'write' | 'delete' | 'admin';
}

// Sistema de logs centralizado
export class Logger {
  static log(level: string, message: string, meta?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    console.log(JSON.stringify({
      timestamp,
      level,
      message,
      ...meta
    }));
  }
}

// Gestión de errores
export class SecurityError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly severity: 'low' | 'medium' | 'high' | 'critical'
  ) {
    super(message);
    this.name = 'SecurityError';
  }
}

// Utilidades de seguridad
export class SecurityUtils {
  static async hash(data: string): Promise<string> {
    // Implementar hashing seguro
    return 'hashed_' + data;
  }

  static async encrypt(data: string, key: string): Promise<string> {
    // Implementar encriptación
    return 'encrypted_' + data;
  }

  static async decrypt(data: string, key: string): Promise<string> {
    // Implementar desencriptación
    return data.replace('encrypted_', '');
  }
}
