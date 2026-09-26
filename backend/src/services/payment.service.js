import crypto from 'crypto';
import { EventEmitter } from 'events';

/**
 * Splittab / Shared Expedition Expense Backend:
 * - Optimistic Concurrency Control (OCC) with versioning
 * - Realtime backend contracts & Pub/Sub event broker
 * - HMAC/SHA-256 webhook signature verification
 * - Dead Letter Queue (DLQ) with retry policies
 */

class PaymentEventBroker extends EventEmitter {}
export const paymentPubSub = new PaymentEventBroker();

// In-memory ledger storage
const expeditionLedgers = new Map();
const deadLetterQueue = [];

// Seed sample expedition shared expense tab
expeditionLedgers.set('tab-iae-44', {
  tabId: 'tab-iae-44',
  title: '44th Indian Antarctic Expedition — Logistics & Fieldwork Pool',
  totalAmount: 1450000,
  currency: 'INR',
  version: 1, // OCC version tracking
  participants: [
    { userId: 'u1', name: 'Dr. R. Sengupta (Chief Scientist)', share: 450000, paid: 500000, balance: 50000 },
    { userId: 'u2', name: 'IMD Polar Meteorological Team', share: 500000, paid: 500000, balance: 0 },
    { userId: 'u3', name: 'Survey of India Glaciology Wing', share: 500000, paid: 450000, balance: -50000 }
  ],
  transactions: [
    { txId: 'tx-101', from: 'u1', amount: 500000, description: 'Charter Fuel Deposit', timestamp: '2026-09-15T10:00:00Z' }
  ]
});

/**
 * Optimistic Concurrency Control (OCC) Transaction Execution:
 * Detects write-write conflicts if client version mismatches server version.
 */
export function executeExpenseTransaction({ tabId, expectedVersion, fromUserId, toUserId, amount, description }) {
  const ledger = expeditionLedgers.get(tabId);
  if (!ledger) {
    throw new Error(`Expense tab "${tabId}" not found`);
  }

  // OCC check
  if (ledger.version !== expectedVersion) {
    const error = new Error(`OCC Conflict: Ledger was modified by another operation (Client version: ${expectedVersion}, Current version: ${ledger.version}). Please refresh and retry.`);
    error.code = 'ERR_OCC_VERSION_MISMATCH';
    error.currentVersion = ledger.version;
    throw error;
  }

  // Update balances
  const sender = ledger.participants.find(p => p.userId === fromUserId);
  const recipient = ledger.participants.find(p => p.userId === toUserId);

  if (!sender) {
    throw new Error(`Participant "${fromUserId}" not found in ledger`);
  }

  const txId = `tx-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
  const transaction = {
    txId,
    from: fromUserId,
    to: toUserId,
    amount,
    description,
    timestamp: new Date().toISOString()
  };

  sender.paid = (sender.paid || 0) + amount;
  if (recipient) {
    recipient.paid = (recipient.paid || 0) - amount;
  }

  // Atomically increment OCC version
  ledger.version += 1;
  ledger.transactions.push(transaction);

  // Broadcast realtime event over Pub/Sub
  paymentPubSub.emit('EXPENSE_SETTLED', {
    tabId,
    newVersion: ledger.version,
    transaction
  });

  return {
    success: true,
    tabId,
    newVersion: ledger.version,
    transaction
  };
}

/**
 * HMAC/SHA-256 Webhook Verification
 */
export function verifyWebhookSignature(payloadString, incomingSignature, secretKey = 'polar-webhook-hmac-secret-2026') {
  if (!incomingSignature) return false;

  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(payloadString)
    .digest('hex');

  // Constant-time buffer comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf8'),
      Buffer.from(incomingSignature, 'utf8')
    );
  } catch {
    return false;
  }
}

/**
 * Dead Letter Queue (DLQ) Manager
 */
export function routeToDeadLetterQueue(jobPayload, error, retryCount = 0) {
  const dlqEntry = {
    id: `dlq-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
    payload: jobPayload,
    error: error.message || String(error),
    failedAt: new Date().toISOString(),
    retriesExhausted: retryCount,
    status: 'DEAD_LETTER'
  };

  deadLetterQueue.push(dlqEntry);

  paymentPubSub.emit('DLQ_ALERT', dlqEntry);
  return dlqEntry;
}

export function getDeadLetterQueue() {
  return [...deadLetterQueue];
}

export function getLedger(tabId) {
  return expeditionLedgers.get(tabId) || null;
}
