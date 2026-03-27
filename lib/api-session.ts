import { auth } from "@/lib/auth";

export async function requireApiSession(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
