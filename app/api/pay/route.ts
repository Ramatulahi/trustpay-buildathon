import { appendLogHash } from "@/lib/blockchain-log";
import { connectToDatabase } from "@/lib/db";
import { buildInterswitchCheckoutUrl } from "@/lib/interswitch";
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

    if (!isValidTransition(transaction.status, "ESCROW")) {
      return Response.json(
        {
          error: `Invalid transition from ${transaction.status} to ESCROW.`,
        },
        { status: 409 },
      );
    }

    const checkoutUrl = buildInterswitchCheckoutUrl(
      transaction.transactionId,
      transaction.amount,
    );

    transaction.logHashes = appendLogHash(transaction.logHashes, "PAY_INITIATED", {
      transactionId: transaction.transactionId,
      checkoutUrl,
    });

    await transaction.save();

    return Response.json({
      checkoutUrl,
      nextStep: "Redirect buyer to Interswitch Web Checkout.",
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to initialize payment.", details: String(error) },
      { status: 500 },
    );
  }
}
