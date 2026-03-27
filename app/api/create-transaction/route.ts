import { randomUUID } from "crypto";

import { connectToDatabase } from "@/lib/db";
import { appendLogHash } from "@/lib/blockchain-log";
import { evaluateRisk } from "@/lib/risk";
import { requireApiSession } from "@/lib/api-session";
import { TransactionModel } from "@/models/Transaction";
import { UserModel } from "@/models/User";

export async function POST(request: Request) {
  try {
    const unauthorizedResponse = await requireApiSession(request);

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    await connectToDatabase();

    const body = await request.json();
    const amount = Number(body.amount);

    if (!amount || amount <= 0 || !body.sellerName || !body.buyerName) {
      return Response.json(
        { error: "amount, buyerName and sellerName are required." },
        { status: 400 },
      );
    }

    const buyerEmail = body.buyerEmail ?? `${body.buyerName.toLowerCase()}@buyer.local`;
    const sellerEmail = body.sellerEmail ?? `${body.sellerName.toLowerCase()}@seller.local`;

    const buyer = await UserModel.findOneAndUpdate(
      { email: buyerEmail },
      {
        name: body.buyerName,
        email: buyerEmail,
        role: "buyer",
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    const seller = await UserModel.findOneAndUpdate(
      { email: sellerEmail },
      {
        name: body.sellerName,
        email: sellerEmail,
        role: "seller",
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    const transactionId = `TP-${Date.now()}-${randomUUID().slice(0, 6).toUpperCase()}`;

    const risk = await evaluateRisk(String(buyer._id), amount);

    const transaction = await TransactionModel.create({
      transactionId,
      amount,
      buyerId: String(buyer._id),
      buyerName: buyer.name,
      sellerId: String(seller._id),
      sellerName: seller.name,
      riskFlagged: risk.flagged,
      riskReasons: risk.reasons,
      status: "PENDING",
      logHashes: appendLogHash([], "CREATE_TRANSACTION", {
        transactionId,
        amount,
        buyer: buyer.name,
        seller: seller.name,
      }),
    });

    return Response.json({
      transactionId: transaction.transactionId,
      status: transaction.status,
      riskFlagged: transaction.riskFlagged,
      riskReasons: transaction.riskReasons,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to create transaction.", details: String(error) },
      { status: 500 },
    );
  }
}
