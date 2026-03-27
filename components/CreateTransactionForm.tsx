"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getDictionary, parseLanguage } from "@/lib/i18n";

export function CreateTransactionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = parseLanguage(searchParams.get("lang") ?? undefined);
  const uiLabels = getDictionary(language);
  const [amount, setAmount] = useState("50000");
  const [buyerName, setBuyerName] = useState("Ada");
  const [buyerEmail, setBuyerEmail] = useState("ada@buyer.local");
  const [sellerName, setSellerName] = useState("Bello");
  const [sellerEmail, setSellerEmail] = useState("bello@seller.local");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/create-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          buyerName,
          buyerEmail,
          sellerName,
          sellerEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create transaction");
      }

      const lang = searchParams.get("lang") ?? "en";
      router.push(`/transactions/${data.transactionId}?lang=${lang}`);
    } catch (submitError) {
      setError(String(submitError));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-foreground/20 p-4">
      <div className="grid gap-2">
        <label>{uiLabels.amount}</label>
        <input
          className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          type="number"
          min={1}
          required
        />
      </div>
      <div className="grid gap-2">
        <label>{uiLabels.buyerName}</label>
        <input
          className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
          value={buyerName}
          onChange={(event) => setBuyerName(event.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <label>{uiLabels.buyerEmail}</label>
        <input
          className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
          value={buyerEmail}
          onChange={(event) => setBuyerEmail(event.target.value)}
          required
          type="email"
        />
      </div>
      <div className="grid gap-2">
        <label>{uiLabels.sellerName}</label>
        <input
          className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
          value={sellerName}
          onChange={(event) => setSellerName(event.target.value)}
          required
        />
      </div>
      <div className="grid gap-2">
        <label>{uiLabels.sellerEmail}</label>
        <input
          className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
          value={sellerEmail}
          onChange={(event) => setSellerEmail(event.target.value)}
          required
          type="email"
        />
      </div>
      {error ? <p className="text-sm">{error}</p> : null}
      <button
        disabled={submitting}
        className="rounded-md border border-foreground/20 px-4 py-2 disabled:opacity-60"
      >
        {submitting ? "..." : uiLabels.create}
      </button>
    </form>
  );
}
