import { appendLogHash } from "@/lib/blockchain-log";
import { connectToDatabase } from "@/lib/db";
import { isValidTransition } from "@/lib/transaction-state";
import { addTrustScore, incrementActiveDisputes } from "@/lib/trust";
import { requireApiSession } from "@/lib/api-session";
import { TransactionModel } from "@/models/Transaction";

export async function POST(request: Request) {
  try {
    const unauthorizedResponse = await requireApiSession(request);

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    await connectToDatabase();
    const body = await request.json();

    if (!body.transactionId || !body.buyerEvidence) {
      return Response.json(
        { error: "transactionId and buyerEvidence are required." },
        { status: 400 },
      );
    }

    const transaction = await TransactionModel.findOne({
      transactionId: body.transactionId,
    });

    if (!transaction) {
      return Response.json({ error: "Transaction not found." }, { status: 404 });
    }

    if (!isValidTransition(transaction.status, "DISPUTED")) {
      return Response.json(
        {
          error: `Invalid transition from ${transaction.status} to DISPUTED.`,
        },
        { status: 409 },
      );
    }

    transaction.status = "DISPUTED";
    transaction.buyerEvidence = body.buyerEvidence;
    transaction.sellerProof = body.sellerProof;

    if (transaction.sellerProof && transaction.sellerProof.trim().length > 5) {
      transaction.disputeOutcome = "SELLER_WON";
      await addTrustScore(transaction.buyerId, -20);
    } else {
      transaction.disputeOutcome = "BUYER_WON";
      await addTrustScore(transaction.sellerId, -20);
    }

    await Promise.all([
      incrementActiveDisputes(transaction.buyerId),
      incrementActiveDisputes(transaction.sellerId),
    ]);

    transaction.logHashes = appendLogHash(transaction.logHashes, "DISPUTE_RAISED", {
      transactionId: transaction.transactionId,
      buyerEvidence: transaction.buyerEvidence,
      sellerProof: transaction.sellerProof,
      disputeOutcome: transaction.disputeOutcome,
    });

    await transaction.save();

    return Response.json({
      transactionId: transaction.transactionId,
      status: transaction.status,
      disputeOutcome: transaction.disputeOutcome,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to raise dispute.", details: String(error) },
      { status: 500 },
    );
  }
}
