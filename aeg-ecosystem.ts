/**
 * Aparicio Edge Technologies
 * Enterprise Security Solutions Ecosystem
 */

interface AEGSolution {
  name: string;
  codename: string;
  category: string;
  pricing: PricingTier[];
  features: string[];
  integration: IntegrationOptions;
  deployment: DeploymentType[];
}

// Categorías Principales
enum SecurityCategories {
  NETWORK = "Network Security",
  DATA = "Data Protection",
  IDENTITY = "Identity & Access",
  COMPLIANCE = "Compliance & Audit",
  CLOUD = "Cloud Security",
  INTELLIGENCE = "Threat Intelligence",
  MOBILE = "Mobile Security",
  IOT = "IoT Security",
  QUANTUM = "Quantum Security",
  DEVSECOPS = "DevSecOps"
}

const AEGPortfolio: AEGSolution[] = [
  // PROTECCIÓN BÁSICA
  {
    name: "AEG Shield",
    codename: "shield-core",
    category: SecurityCategories.NETWORK,
    features: [
      "Firewall inteligente con IA",
      "IDS/IPS automatizado",
      "VPN corporativa",
      "Gestión SSL",
      "Monitoreo de red"
    ]
  },

  // GESTIÓN DE DATOS
  {
    name: "AEG Vault",
    codename: "vault-secure",
    category: SecurityCategories.DATA,
    features: [
      "Backup encriptado",
      "Almacenamiento seguro",
      "Recuperación de desastres",
      "Sincronización empresarial",
      "Cumplimiento normativo"
    ]
  },

  // IDENTIDAD Y ACCESO
  {
    name: "AEG Guard",
    codename: "guard-iam",
    category: SecurityCategories.IDENTITY,
    features: [
      "Autenticación multifactor",
      "Single Sign-On (SSO)",
      "Gestión de identidades",
      "Control de acceso",
      "Auditoría de usuarios"
    ]
  },

  // ANÁLISIS Y DETECCIÓN
  {
    name: "AEG Scanner",
    codename: "scanner-pro",
    category: SecurityCategories.INTELLIGENCE,
    features: [
      "Escaneo de vulnerabilidades",
      "Análisis de malware",
      "Pentesting automatizado",
      "Reportes detallados",
      "Remediación automática"
    ]
  },

  // MONITORIZACIÓN
  {
    name: "AEG Monitor",
    codename: "monitor-365",
    category: SecurityCategories.NETWORK,
    features: [
      "Monitoreo 24/7",
      "Alertas en tiempo real",
      "Análisis de logs",
      "Métricas de rendimiento",
      "Reportes automatizados"
    ]
  }
];