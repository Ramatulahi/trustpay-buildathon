import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ─── RISK ENGINE (ported from your riskEngine.js) ───
function calculateRisk(
  user: { created_at: string; dispute_count: number },
  transaction: { amount: number },
  meta: { txCountLastMinute: number }
): number {
  let risk = 0;
  const accountAgeHours =
    (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60);

  // 🔴 High Value + New Account
  if (accountAgeHours < 24 && transaction.amount > 50000) risk += 50;

  // 🔴 Rapid Transaction Spikes
  if (meta.txCountLastMinute > 3) risk += 30;

  // 🔴 Repeat Offenders
  if (user.dispute_count > 2) risk += 20;

  return risk;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract transaction ID from URL
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/");
    const transactionId = pathParts[pathParts.length - 1];

    if (!transactionId) {
      return new Response(
        JSON.stringify({ error: "Missing transaction ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(transactionId)) {
      return new Response(
        JSON.stringify({ error: "Invalid transaction ID format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get auth token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create authenticated client for user verification
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Service client for DB operations
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // ─── STATE VERIFICATION (from your security.js enforceState) ───
    const { data: transaction, error: txError } = await adminClient
      .from("transactions")
      .select("*")
      .eq("id", transactionId)
      .single();

    if (txError || !transaction) {
      return new Response(
        JSON.stringify({ error: "Transaction not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Only the buyer can confirm (from your security.js onlyBuyer)
    if (transaction.buyer_id !== user.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Only the buyer can perform this action" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Enforce ESCROW state (from your security.js enforceState)
    if (transaction.status !== "ESCROW") {
      return new Response(
        JSON.stringify({
          error: "Invalid State",
          message: `Expected ESCROW, got ${transaction.status}`,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Prevent double action (from your security.js preventDoubleAction)
    if (transaction.delivery_confirmed) {
      return new Response(
        JSON.stringify({ error: "Action already performed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── RISK ENGINE CHECK ───
    // Count recent transactions for velocity check
    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
    const { count: txCountLastMinute } = await adminClient
      .from("transactions")
      .select("*", { count: "exact", head: true })
      .eq("buyer_id", user.id)
      .gte("updated_at", oneMinuteAgo);

    // Count disputes for repeat offender check
    const { count: disputeCount } = await adminClient
      .from("transactions")
      .select("*", { count: "exact", head: true })
      .eq("buyer_id", user.id)
      .eq("status", "DISPUTED");

    const riskScore = calculateRisk(
      { created_at: user.created_at, dispute_count: disputeCount ?? 0 },
      { amount: Number(transaction.amount) },
      { txCountLastMinute: txCountLastMinute ?? 0 }
    );

    // ─── SECURITY BLOCK (risk >= 50) ───
    if (riskScore >= 50) {
      // Update risk score on record
      await adminClient
        .from("transactions")
        .update({ risk_score: riskScore })
        .eq("id", transactionId);

      return new Response(
        JSON.stringify({
          error: "Security Block",
          message: "High-risk transaction detected. Manual review required.",
          riskScore,
        }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── SUCCESS: Release funds ───
    const { error: updateError } = await adminClient
      .from("transactions")
      .update({
        status: "COMPLETED",
        delivery_confirmed: true,
        risk_score: riskScore,
      })
      .eq("id", transactionId);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: "Failed to update transaction" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        status: "Success",
        message: "Security checks passed. Funds released.",
        finalStatus: "COMPLETED",
        riskScore,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("confirm-transaction error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
