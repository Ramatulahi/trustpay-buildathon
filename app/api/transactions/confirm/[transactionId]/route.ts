import { requireApiSession } from "@/lib/api-session";
import { confirmTransactionWithCyberGate } from "@/lib/confirm-transaction";

type Params = {
  params: Promise<{
    transactionId: string;
  }>;
};

export async function POST(request: Request, context: Params) {
  try {
    const unauthorizedResponse = await requireApiSession(request);

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    const { transactionId } = await context.params;
    const result = await confirmTransactionWithCyberGate(transactionId);

    return Response.json(result.body, { status: result.status });
  } catch (error) {
    return Response.json(
      { error: "Failed to confirm transaction.", details: String(error) },
      { status: 500 },
    );
  }
}
