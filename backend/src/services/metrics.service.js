/**
 * Prometheus & Grafana Metrics Engine + Mock High-Load Booking Simulation
 * Compatible with Prometheus scraping, Grafana dashboards, and k6 benchmarking.
 */

class MetricsRegistry {
  constructor() {
    this.counters = new Map();
    this.latencies = [];
    this.activeBookings = 142;
    this.totalBerthsAvailable = 200;
  }

  incrementCounter(name, value = 1, labels = {}) {
    const key = `${name}_${JSON.stringify(labels)}`;
    const current = this.counters.get(key) || { name, value: 0, labels };
    current.value += value;
    this.counters.set(key, current);
  }

  recordLatency(durationMs) {
    this.latencies.push(durationMs);
    if (this.latencies.length > 500) this.latencies.shift();
  }

  getPercentiles() {
    if (this.latencies.length === 0) return { p50: 0, p90: 0, p99: 0 };
    const sorted = [...this.latencies].sort((a, b) => a - b);
    const p50 = sorted[Math.floor(sorted.length * 0.5)] || 0;
    const p90 = sorted[Math.floor(sorted.length * 0.9)] || 0;
    const p99 = sorted[Math.floor(sorted.length * 0.99)] || 0;
    return { p50, p90, p99 };
  }

  /**
   * Generates standard Prometheus text-based format for scraping
   */
  toPrometheusFormat() {
    const lines = [];
    lines.push('# HELP ncpor_http_requests_total Total number of HTTP requests');
    lines.push('# TYPE ncpor_http_requests_total counter');

    for (const [, item] of this.counters.entries()) {
      const labelStr = Object.entries(item.labels)
        .map(([k, v]) => `${k}="${v}"`)
        .join(',');
      lines.push(`${item.name}{${labelStr}} ${item.value}`);
    }

    const { p50, p90, p99 } = this.getPercentiles();
    lines.push('# HELP ncpor_request_latency_ms Latency percentiles');
    lines.push('# TYPE ncpor_request_latency_ms gauge');
    lines.push(`ncpor_request_latency_ms{quantile="0.5"} ${p50}`);
    lines.push(`ncpor_request_latency_ms{quantile="0.9"} ${p90}`);
    lines.push(`ncpor_request_latency_ms{quantile="0.99"} ${p99}`);

    lines.push('# HELP ncpor_expedition_berths_active Active reserved expedition berths under load');
    lines.push('# TYPE ncpor_expedition_berths_active gauge');
    lines.push(`ncpor_expedition_berths_active ${this.activeBookings}`);

    return lines.join('\n');
  }

  /**
   * Mock Expedition Berth / Ticket Booking under heavy simulated load (k6 benchmark harness)
   */
  simulateBookingLoad({ scientistId, expeditionCode = 'IAE-44', berthsRequested = 1 }) {
    const startTime = Date.now();

    // Check inventory
    if (this.activeBookings + berthsRequested > this.totalBerthsAvailable) {
      this.incrementCounter('ncpor_booking_rejections_total', 1, { reason: 'capacity_exhausted' });
      const latency = Date.now() - startTime + Math.floor(Math.random() * 8 + 2);
      this.recordLatency(latency);
      return {
        success: false,
        error: 'Expedition Berths Fully Booked',
        available: this.totalBerthsAvailable - this.activeBookings
      };
    }

    this.activeBookings += berthsRequested;
    this.incrementCounter('ncpor_booking_success_total', 1, { expedition: expeditionCode });
    const latency = Date.now() - startTime + Math.floor(Math.random() * 12 + 4);
    this.recordLatency(latency);

    return {
      success: true,
      bookingRef: `NC-RES-${Date.now().toString(36).toUpperCase()}`,
      scientistId,
      expeditionCode,
      berthsReserved: berthsRequested,
      remainingBerths: this.totalBerthsAvailable - this.activeBookings,
      latencyMs: latency
    };
  }

  /**
   * Grafana Dashboard configuration export (ready to import in Grafana)
   */
  getGrafanaDashboardSchema() {
    return {
      title: 'NCPOR Portal High-Load Benchmarking Dashboard',
      uid: 'ncpor-k6-grafana-metrics',
      panels: [
        { title: 'Throughput (RPS)', type: 'graph', targets: [{ expr: 'rate(ncpor_http_requests_total[1m])' }] },
        { title: 'p99 Latency (ms)', type: 'gauge', targets: [{ expr: 'ncpor_request_latency_ms{quantile="0.99"}' }] },
        { title: 'Expedition Berth Contention', type: 'stat', targets: [{ expr: 'ncpor_expedition_berths_active' }] }
      ]
    };
  }
}

export const metricsRegistry = new MetricsRegistry();
