import crypto from 'crypto';
import { routeToDeadLetterQueue } from './payment.service.js';

/**
 * Enterprise Webhook Delivery System:
 * - Queue decoupling & service-event segregation
 * - Worker queue batching with concurrency controls
 * - Backpressure handling (High/Low water marks)
 * - Automatic exponential backoff retries & Dead Letter Queue routing
 */

class WebhookDeliveryQueue {
  constructor(options = {}) {
    this.concurrencyLimit = options.concurrencyLimit || 5;
    this.highWaterMark = options.highWaterMark || 100; // Trigger backpressure
    this.lowWaterMark = options.lowWaterMark || 20;   // Relieve backpressure
    this.batchSize = options.batchSize || 10;
    this.maxRetries = options.maxRetries || 3;

    this.queue = [];
    this.activeWorkers = 0;
    this.isBackpressureActive = false;
    this.subscribers = new Map(); // eventType -> array of webhook targets
    this.deliveryLogs = [];

    // Register initial polar portal event subscribers
    this.registerSubscriber('dataset.published', 'https://data.gov.in/api/webhook/ncpor-intake');
    this.registerSubscriber('weather.alert', 'https://imd.gov.in/api/v1/polar-severe-weather');
    this.registerSubscriber('expedition.milestone', 'https://moes.gov.in/api/webhooks/portal-events');
  }

  registerSubscriber(eventType, targetUrl) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set());
    }
    this.subscribers.get(eventType).add(targetUrl);
  }

  /**
   * Enqueue a new event (with service-event segregation)
   */
  publishEvent(eventType, payload) {
    // 1. Check Backpressure
    if (this.queue.length >= this.highWaterMark) {
      this.isBackpressureActive = true;
      const error = new Error(`Backpressure Active: Webhook delivery queue saturated (${this.queue.length} items). Ingestion throttled.`);
      error.code = 'ERR_BACKPRESSURE_THRESHOLD_EXCEEDED';
      throw error;
    }

    const targets = this.subscribers.get(eventType) || new Set();
    const eventId = `evt-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    const timestamp = new Date().toISOString();

    for (const targetUrl of targets) {
      const job = {
        jobId: `job-${crypto.randomBytes(4).toString('hex')}`,
        eventId,
        eventType,
        targetUrl,
        payload,
        timestamp,
        retryCount: 0,
        nextAttemptAt: Date.now()
      };
      this.queue.push(job);
    }

    // Trigger worker processing
    this.processQueue();

    return {
      eventId,
      queuedJobs: targets.size,
      currentQueueLength: this.queue.length,
      backpressure: this.isBackpressureActive
    };
  }

  async processQueue() {
    if (this.activeWorkers >= this.concurrencyLimit || this.queue.length === 0) {
      return;
    }

    // Check relief of backpressure
    if (this.isBackpressureActive && this.queue.length <= this.lowWaterMark) {
      this.isBackpressureActive = false;
    }

    const now = Date.now();
    const readyJobs = this.queue.filter(j => j.nextAttemptAt <= now).slice(0, this.batchSize);

    if (readyJobs.length === 0) return;

    // Pull jobs from queue
    for (const job of readyJobs) {
      const idx = this.queue.indexOf(job);
      if (idx !== -1) this.queue.splice(idx, 1);
    }

    this.activeWorkers += readyJobs.length;

    // Execute jobs concurrently with safe limit
    await Promise.allSettled(readyJobs.map(job => this.dispatchJob(job)));

    this.activeWorkers -= readyJobs.length;

    // Recurse for remaining work
    if (this.queue.length > 0) {
      setTimeout(() => this.processQueue(), 50);
    }
  }

  async dispatchJob(job) {
    try {
      // Sign payload with HMAC SHA-256 for recipient security verification
      const signature = crypto
        .createHmac('sha256', 'polar-webhook-hmac-secret-2026')
        .update(JSON.stringify(job.payload))
        .digest('hex');

      // Simulated network dispatch with guaranteed tracking
      const isSuccess = Math.random() > 0.05; // 95% simulated delivery success rate

      if (!isSuccess) {
        throw new Error('Remote endpoint connection reset / HTTP 504 Gateway Timeout');
      }

      this.deliveryLogs.unshift({
        jobId: job.jobId,
        eventType: job.eventType,
        targetUrl: job.targetUrl,
        signatureHeader: signature,
        status: 'DELIVERED',
        deliveredAt: new Date().toISOString()
      });

      if (this.deliveryLogs.length > 50) this.deliveryLogs.pop();
    } catch (err) {
      job.retryCount += 1;
      if (job.retryCount <= this.maxRetries) {
        // Exponential backoff: 2s, 4s, 8s...
        const backoffMs = Math.pow(2, job.retryCount) * 1000;
        job.nextAttemptAt = Date.now() + backoffMs;
        this.queue.push(job);
      } else {
        // Exceeded retries -> route to Dead Letter Queue (DLQ)
        routeToDeadLetterQueue(job, err, job.retryCount);
      }
    }
  }

  getMetrics() {
    return {
      queueLength: this.queue.length,
      activeWorkers: this.activeWorkers,
      concurrencyLimit: this.concurrencyLimit,
      isBackpressureActive: this.isBackpressureActive,
      subscribersCount: Array.from(this.subscribers.entries()).map(([event, set]) => ({
        event,
        subscribers: set.size
      })),
      recentDeliveries: this.deliveryLogs.slice(0, 10)
    };
  }
}

export const webhookDeliverySystem = new WebhookDeliveryQueue();
