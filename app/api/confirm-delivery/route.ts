import { requireApiSession } from "@/lib/api-session";
import { confirmTransactionWithCyberGate } from "@/lib/confirm-transaction";

export async function POST(request: Request) {
  try {
    const unauthorizedResponse = await requireApiSession(request);

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }

    const body = await request.json();

    if (!body.transactionId) {
      return Response.json(
        { error: "transactionId is required." },
        { status: 400 },
      );
    }

    const result = await confirmTransactionWithCyberGate(body.transactionId);

    return Response.json(result.body, { status: result.status });
  } catch (error) {
    return Response.json(
      { error: "Failed to confirm delivery.", details: String(error) },
      { status: 500 },
    );
  }
}
