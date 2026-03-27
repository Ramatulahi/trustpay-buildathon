import { UserModel } from "@/models/User";
import type { TransactionDocument } from "@/models/Transaction";
import { TransactionModel } from "@/models/Transaction";

const VELOCITY_WINDOW_MS = 60 * 1000;
const VELOCITY_LIMIT = 5;
const HIGH_AMOUNT_THRESHOLD = 200000;
const NEW_ACCOUNT_DAYS = 14;
const DISPUTE_THRESHOLD = 2;
const SECURITY_BLOCK_THRESHOLD = 60;

type CyberCheckPayload = {
  transactionId: string;
  amount: number;
  buyerId: string;
  currentStatus: string;
};

type ExternalCyberResponse = {
  riskScore?: number;
  message?: string;
  error?: string;
};

export type CyberCheckResult = {
  blocked: boolean;
  riskScore: number;
  reasons: string[];
  message: string;
};

const clampRisk = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

async function runExternalCyberCheck(payload: CyberCheckPayload): Promise<CyberCheckResult | null> {
  const endpoint = process.env.CYBERSECURITY_CONFIRM_URL;

  if (!endpoint) {
    return null;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CYBERSECURITY_SHARED_SECRET
        ? { "X-TrustPay-Signature": process.env.CYBERSECURITY_SHARED_SECRET }
        : {}),
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  let body: ExternalCyberResponse | null = null;

  try {
    body = (await response.json()) as ExternalCyberResponse;
  } catch {
    body = null;
  }

  const riskScore = clampRisk(body?.riskScore ?? 0);

  if (response.status === 403) {
    return {
      blocked: true,
      riskScore,
      reasons: ["External cyber defense layer blocked transaction."],
      message: body?.message ?? "High-risk transaction detected. Manual review required.",
    };
  }

  if (!response.ok) {
    return {
      blocked: true,
      riskScore,
      reasons: ["Cyber defense service unavailable."],
      message: "Security verification failed. Try again later.",
    };
  }

  return {
    blocked: false,
    riskScore,
    reasons: [],
    message: body?.message ?? "Security checks passed.",
  };
}

async function runLocalCyberCheck(transaction: TransactionDocument): Promise<CyberCheckResult> {
  const buyer = await UserModel.findById(transaction.buyerId).lean();

  if (!buyer) {
    return {
      blocked: true,
      riskScore: 100,
      reasons: ["Buyer account not found."],
      message: "High-risk transaction detected. Manual review required.",
    };
  }

  const velocityCount = await TransactionModel.countDocuments({
    buyerId: transaction.buyerId,
    createdAt: { $gte: new Date(Date.now() - VELOCITY_WINDOW_MS) },
  });

  const reasons: string[] = [];
  let riskScore = 0;

  if (velocityCount > VELOCITY_LIMIT) {
    reasons.push("High transaction velocity detected.");
    riskScore += 40;
  }

  const accountAgeMs = Date.now() - new Date(buyer.createdAt).getTime();
  const accountAgeDays = accountAgeMs / (1000 * 60 * 60 * 24);

  if (accountAgeDays <= NEW_ACCOUNT_DAYS && transaction.amount >= HIGH_AMOUNT_THRESHOLD) {
    reasons.push("New account moving high value funds.");
    riskScore += 35;
  }

  if (buyer.activeDisputes >= DISPUTE_THRESHOLD) {
    reasons.push("Buyer has multiple active disputes.");
    riskScore += 25 + Math.min(20, (buyer.activeDisputes - DISPUTE_THRESHOLD) * 5);
  }

  if (buyer.trustScore < 40) {
    reasons.push("Buyer trust score is below safe threshold.");
    riskScore += 10;
  }

  const clampedRiskScore = clampRisk(riskScore);
  const blocked = clampedRiskScore >= SECURITY_BLOCK_THRESHOLD;

  return {
    blocked,
    riskScore: clampedRiskScore,
    reasons,
    message: blocked
      ? "High-risk transaction detected. Manual review required."
      : "Security checks passed.",
  };
}

export async function runCyberDefenseCheck(transaction: TransactionDocument): Promise<CyberCheckResult> {
  const payload: CyberCheckPayload = {
    transactionId: transaction.transactionId,
    amount: transaction.amount,
    buyerId: transaction.buyerId,
    currentStatus: transaction.status,
  };

  const externalResult = await runExternalCyberCheck(payload);

  if (externalResult) {
    return externalResult;
  }

  return runLocalCyberCheck(transaction);
}
