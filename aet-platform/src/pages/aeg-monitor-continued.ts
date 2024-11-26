// Continuación de apps/aeg-monitor/src/index.ts

  private async initializeCollectors(): Promise<void> {
    this.collectors = [
      new SystemMetricCollector(),
      new NetworkMetricCollector(),
      new SecurityMetricCollector(),
      new ApplicationMetricCollector()
    ];

    await Promise.all(this.collectors.map(c => c.initialize()));
  }

  private startMonitoring(): void {
    setInterval(async () => {
      for (const collector of this.collectors) {
        try {
          const metrics = await collector.collect();
          this.processMetrics(metrics);
        } catch (error) {
          this.logEvent({
            timestamp: new Date(),
            level: 'error',
            source: 'AEG Monitor',
            message: `Collector failed: ${error.message}`,
            data: { collector: collector.name }
          });
        }
      }
    }, 60000); // Cada minuto

    // Evaluación de alertas
    setInterval(() => {
      this.evaluateAlertRules();
    }, 30000); // Cada 30 segundos
  }

  private async processMetrics(metrics: Metric[]): Promise<void> {
    for (const metric of metrics) {
      const history = this.metrics.get(metric.name) || [];
      history.push(metric);
      
      // Mantener solo las últimas 24 horas de métricas
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const filtered = history.filter(m => m.timestamp > dayAgo);
      
      this.metrics.set(metric.name, filtered);
      
      // Publicar para tiempo real
      await this.publishMetric(metric);
    }
  }

  private async evaluateAlertRules(): Promise<void> {
    for (const rule of this.rules) {
      const metrics = this.metrics.get(rule.metricName);
      if (!metrics || metrics.length === 0) continue;

      const latestMetric = metrics[metrics.length - 1];
      const shouldAlert = rule.evaluate(latestMetric);

      if (shouldAlert) {
        const alert = await this.createAlert(rule, latestMetric);
        await this.notifyAlert(alert);
      }
    }
  }

  public async addAlertRule(rule: Omit<AlertRule, 'id'>): Promise<AlertRule> {
    const newRule = {
      ...rule,
      id: generateUUID()
    };
    this.rules.push(newRule);
    return newRule;
  }

  public async getMetrics(
    name: string,
    timeRange: { start: Date; end: Date }
  ): Promise<Metric[]> {
    const metrics = this.metrics.get(name) || [];
    return metrics.filter(
      m => m.timestamp >= timeRange.start && m.timestamp <= timeRange.end
    );
  }

  public async acknowledgeAlert(alertId: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      await this.updateAlert(alert);
    }
  }
}

abstract class MetricCollector {
  constructor(public readonly name: string) {}
  abstract initialize(): Promise<void>;
  abstract collect(): Promise<Metric[]>;
}

class SystemMetricCollector extends MetricCollector {
  constructor() {
    super('System');
  }

  async initialize(): Promise<void> {
    // Inicializar colector de sistema
  }

  async collect(): Promise<Metric[]> {
    // Recolectar métricas del sistema
    return [
      {
        name: 'cpu_usage',
        value: await this.getCPUUsage(),
        unit: 'percentage',
        timestamp: new Date(),
        tags: { type: 'system' }
      },
      {
        name: 'memory_usage',
        value: await this.getMemoryUsage(),
        unit: 'bytes',
        timestamp: new Date(),
        tags: { type: 'system' }
      }
    ];
  }

  private async getCPUUsage(): Promise<number> {
    // Implementar obtención de CPU
    return 0;
  }

  private async getMemoryUsage(): Promise<number> {
    // Implementar obtención de memoria
    return 0;
  }
}

class NetworkMetricCollector extends MetricCollector