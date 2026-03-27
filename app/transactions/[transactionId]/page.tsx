import Link from "next/link";
import { notFound } from "next/navigation";

import { LanguageToggle } from "@/components/LanguageToggle";
import { TransactionActions } from "@/components/TransactionActions";
import { getTranslator, parseLanguage } from "@/lib/i18n";
import { getTransactionById } from "@/lib/queries";
import { requireSession } from "@/lib/session";

export default async function TransactionDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ transactionId: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  await requireSession();

  const { transactionId } = await params;
  const { lang } = await searchParams;
  const language = parseLanguage(lang);
  const { t } = await getTranslator(language);

  const transaction = await getTransactionById(transactionId);

  if (!transaction) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{await t("transactionDetails")}</h1>
          <p className="text-sm opacity-75">{transaction.transactionId}</p>
        </div>
        <LanguageToggle value={language} />
      </div>

      <section className="rounded-lg border border-foreground/20 p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <p>
            <span className="opacity-70">{await t("status")}: </span>
            <strong>{transaction.status}</strong>
          </p>
          <p>
            <span className="opacity-70">{await t("amount")}: </span>
            <strong>₦{transaction.amount}</strong>
          </p>
          <p>
            <span className="opacity-70">Buyer: </span>
            <strong>{transaction.buyerName}</strong>
          </p>
          <p>
            <span className="opacity-70">Seller: </span>
            <strong>{transaction.sellerName}</strong>
          </p>
          <p>
            <span className="opacity-70">{await t("riskFlagged")}: </span>
            <strong>{transaction.riskFlagged ? "Yes" : "No"}</strong>
          </p>
        </div>

        {transaction.riskReasons?.length ? (
          <ul className="mt-3 list-disc pl-5 text-sm">
            {transaction.riskReasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <TransactionActions transactionId={transaction.transactionId} status={transaction.status} />

      <section className="rounded-lg border border-foreground/20 p-4">
        <h2 className="font-semibold">{await t("hashLogs")}</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {transaction.logHashes.map((log) => (
            <li key={log.hash} className="rounded-md border border-foreground/20 p-2">
              <p className="font-medium">{log.event}</p>
              <p className="truncate opacity-70">{log.hash}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex gap-3 text-sm">
        <Link href={`/dashboard?lang=${language}`} className="underline underline-offset-4">
          ← {await t("dashboard")}
        </Link>
        <Link
          href={`/create-transaction?lang=${language}`}
          className="underline underline-offset-4"
        >
          {await t("createTransaction")}
        </Link>
      </div>
    </main>
  );
}
