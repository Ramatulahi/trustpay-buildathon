"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { TransactionState } from "@/lib/transaction-state";
import { getDictionary, parseLanguage } from "@/lib/i18n";

const STATE_ORDER: TransactionState[] = [
  "PENDING",
  "ESCROW",
  "DELIVERED",
  "COMPLETED",
  "DISPUTED",
];

type Action = "pay" | "deliver" | "confirm" | "dispute";

export function TransactionActions({
  transactionId,
  status,
}: {
  transactionId: string;
  status: TransactionState;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = parseLanguage(searchParams.get("lang") ?? undefined);
  const uiLabels = getDictionary(language);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [buyerEvidence, setBuyerEvidence] = useState("Package not received");
  const [sellerProof, setSellerProof] = useState("Proof of delivery: tracking #123");
  const [message, setMessage] = useState<string | null>(null);

  const availableActions = useMemo<Action[]>(() => {
    if (status === "PENDING") {
      return ["pay"];
    }

    if (status === "ESCROW") {
      return ["deliver", "dispute"];
    }

    if (status === "DELIVERED") {
      return ["confirm", "dispute"];
    }

    return [];
  }, [status]);

  const callAction = async (endpoint: string, payload: object, action: string) => {
    setLoadingAction(action);
    setMessage(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const details = [data.error, data.message, data.riskScore ? `Risk score: ${data.riskScore}` : null]
          .filter(Boolean)
          .join(" - ");

        throw new Error(details || "Action failed.");
      }

      if (action === "pay") {
        window.location.href = data.checkoutUrl;
        return;
      }

      setMessage(data.message ?? JSON.stringify(data));
      router.refresh();
    } catch (error) {
      setMessage(String(error));
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-foreground/20 p-4">
      <div className="text-sm">Status Flow: {STATE_ORDER.join(" → ")}</div>

      <div className="flex flex-wrap gap-2">
        {availableActions.includes("pay") ? (
          <button
            onClick={() => callAction("/api/pay", { transactionId }, "pay")}
            disabled={loadingAction === "pay"}
            className="rounded-md border border-foreground/20 px-3 py-2 disabled:opacity-60"
          >
            {uiLabels.payNow}
          </button>
        ) : null}

        {availableActions.includes("deliver") ? (
          <button
            onClick={() =>
              callAction(
                "/api/mark-delivered",
                { transactionId, sellerProof },
                "deliver",
              )
            }
            disabled={loadingAction === "deliver"}
            className="rounded-md border border-foreground/20 px-3 py-2 disabled:opacity-60"
          >
            {uiLabels.markDelivered}
          </button>
        ) : null}

        {availableActions.includes("confirm") ? (
          <button
            onClick={() =>
              callAction(
                `/api/transactions/confirm/${transactionId}`,
                {},
                "confirm",
              )
            }
            disabled={loadingAction === "confirm"}
            className="rounded-md border border-foreground/20 px-3 py-2 disabled:opacity-60"
          >
            {uiLabels.confirmReceipt}
          </button>
        ) : null}

        {availableActions.includes("dispute") ? (
          <button
            onClick={() =>
              callAction(
                "/api/raise-dispute",
                { transactionId, buyerEvidence, sellerProof },
                "dispute",
              )
            }
            disabled={loadingAction === "dispute"}
            className="rounded-md border border-foreground/20 px-3 py-2 disabled:opacity-60"
          >
            {uiLabels.raiseDispute}
          </button>
        ) : null}
      </div>

      {availableActions.includes("dispute") || availableActions.includes("deliver") ? (
        <div className="grid gap-2">
          <label>{uiLabels.sellerProof}</label>
          <textarea
            className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
            value={sellerProof}
            onChange={(event) => setSellerProof(event.target.value)}
          />
          <label>{uiLabels.evidence}</label>
          <textarea
            className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
            value={buyerEvidence}
            onChange={(event) => setBuyerEvidence(event.target.value)}
          />
        </div>
      ) : null}

      {message ? <p className="text-sm">{message}</p> : null}
    </div>
  );
}
