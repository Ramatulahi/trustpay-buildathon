import { appendLogHash } from "@/lib/blockchain-log";
import { connectToDatabase } from "@/lib/db";
import { runCyberDefenseCheck } from "@/lib/cyber-defense";
import { addTrustScore } from "@/lib/trust";
import { TransactionModel } from "@/models/Transaction";

type ConfirmResult = {
  status: number;
  body: Record<string, unknown>;
};

export async function confirmTransactionWithCyberGate(
  transactionId: string,
): Promise<ConfirmResult> {
  await connectToDatabase();

  const transaction = await TransactionModel.findOne({ transactionId });

  if (!transaction) {
    return {
      status: 404,
      body: { error: "Transaction not found." },
    };
  }

  if (transaction.status !== "ESCROW") {
    return {
      status: 400,
      body: {
        error: "Invalid transaction state.",
        message: "Transaction must be in ESCROW before confirmation.",
        currentStatus: transaction.status,
      },
    };
  }

  const cyberCheck = await runCyberDefenseCheck(transaction);

  if (cyberCheck.blocked) {
    transaction.logHashes = appendLogHash(transaction.logHashes, "SECURITY_BLOCK", {
      transactionId: transaction.transactionId,
      riskScore: cyberCheck.riskScore,
      reasons: cyberCheck.reasons,
    });

    await transaction.save();

    return {
      status: 403,
      body: {
        error: "Security Block",
        message: cyberCheck.message,
        riskScore: cyberCheck.riskScore,
      },
    };
  }

  transaction.status = "COMPLETED";
  transaction.fundsReleased = true;
  transaction.logHashes = appendLogHash(transaction.logHashes, "BUYER_CONFIRMED_RECEIPT", {
    transactionId: transaction.transactionId,
    fundsReleased: true,
    riskScore: cyberCheck.riskScore,
  });

  await transaction.save();

  await Promise.all([
    addTrustScore(transaction.buyerId, 10),
    addTrustScore(transaction.sellerId, 10),
  ]);

  return {
    status: 200,
    body: {
      status: "Success",
      message: "Security checks passed. Funds released.",
      finalStatus: "COMPLETED",
      transactionId: transaction.transactionId,
      riskScore: cyberCheck.riskScore,
    },
  };
}
