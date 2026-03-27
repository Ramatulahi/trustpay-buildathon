import { connectToDatabase } from "@/lib/db";
import { requireApiSession } from "@/lib/api-session";
import { TransactionModel } from "@/models/Transaction";

type Params = {
  params: Promise<{
    transactionId: string;
  }>;
};

export async function GET(_request: Request, context: Params) {
  try {
    const unauthorizedResponse = await requireApiSession(_request);

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    await connectToDatabase();
    const { transactionId } = await context.params;

    const transaction = await TransactionModel.findOne({ transactionId }).lean();

    if (!transaction) {
      return Response.json({ error: "Transaction not found." }, { status: 404 });
    }

    return Response.json({ transaction });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch transaction.", details: String(error) },
      { status: 500 },
    );
  }
}
