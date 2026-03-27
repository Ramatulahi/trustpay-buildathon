import { connectToDatabase } from "@/lib/db";
import { requireApiSession } from "@/lib/api-session";
import { TransactionModel } from "@/models/Transaction";

export async function GET(request: Request) {
  try {
    const unauthorizedResponse = await requireApiSession(request);

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    await connectToDatabase();
    const transactions = await TransactionModel.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return Response.json({
      transactions: transactions.map((transaction) => ({
        transactionId: transaction.transactionId,
        amount: transaction.amount,
        buyerName: transaction.buyerName,
        sellerName: transaction.sellerName,
        status: transaction.status,
        riskFlagged: transaction.riskFlagged,
        createdAt: transaction.createdAt,
      })),
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch transactions.", details: String(error) },
      { status: 500 },
    );
  }
}
