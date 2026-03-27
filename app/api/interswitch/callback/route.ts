import { randomUUID } from "crypto";

import { appendLogHash } from "@/lib/blockchain-log";
import { connectToDatabase } from "@/lib/db";
import { isValidTransition } from "@/lib/transaction-state";
import { TransactionModel } from "@/models/Transaction";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);

    const transactionId = url.searchParams.get("transactionId");
    const paymentStatus = url.searchParams.get("paymentStatus");

    if (!transactionId || paymentStatus !== "success") {
      return Response.json(
        { error: "Invalid callback payload." },
        { status: 400 },
      );
    }

    const transaction = await TransactionModel.findOne({ transactionId });

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

    transaction.status = "ESCROW";
    transaction.paymentReference = `ISW-${randomUUID().slice(0, 12).toUpperCase()}`;
    transaction.logHashes = appendLogHash(transaction.logHashes, "PAYMENT_CONFIRMED", {
      transactionId: transaction.transactionId,
      paymentReference: transaction.paymentReference,
    });

    await transaction.save();

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/transactions/${transactionId}`,
      302,
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to process callback.", details: String(error) },
      { status: 500 },
    );
  }
}
