import { appendLogHash } from "@/lib/blockchain-log";
import { connectToDatabase } from "@/lib/db";
import { isValidTransition } from "@/lib/transaction-state";
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

    if (!body.transactionId) {
      return Response.json(
        { error: "transactionId is required." },
        { status: 400 },
      );
    }

    const transaction = await TransactionModel.findOne({
      transactionId: body.transactionId,
    });

    if (!transaction) {
      return Response.json({ error: "Transaction not found." }, { status: 404 });
    }

    if (!isValidTransition(transaction.status, "DELIVERED")) {
      return Response.json(
        {
          error: `Invalid transition from ${transaction.status} to DELIVERED.`,
        },
        { status: 409 },
      );
    }

    transaction.status = "DELIVERED";
    transaction.sellerProof = body.sellerProof ?? "Seller marked as delivered.";
    transaction.logHashes = appendLogHash(transaction.logHashes, "SELLER_MARKED_DELIVERED", {
      transactionId: transaction.transactionId,
      sellerProof: transaction.sellerProof,
    });

    await transaction.save();

    return Response.json({
      transactionId: transaction.transactionId,
      status: transaction.status,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to mark transaction as delivered.", details: String(error) },
      { status: 500 },
    );
  }
}
