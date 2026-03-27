import Link from "next/link";

import { LanguageToggle } from "@/components/LanguageToggle";
import { SignOutButton } from "@/components/SignOutButton";
import { getTranslator, parseLanguage } from "@/lib/i18n";
import { getDashboardData } from "@/lib/queries";
import { requireSession } from "@/lib/session";

type SearchParams = Promise<{ lang?: string }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireSession();

  const { lang } = await searchParams;
  const language = parseLanguage(lang);
  const { t } = await getTranslator(language);
  const dashboardData = await getDashboardData();
  const [
    appTitle,
    appSubtitle,
    totalTransactionsLabel,
    activeDisputesLabel,
    escrowFundsLabel,
    dashboardLabel,
    createTransactionLabel,
    noTransactionsLabel,
    goToDetailsLabel,
  ] = await Promise.all([
    t("appTitle"),
    t("appSubtitle"),
    t("totalTransactions"),
    t("activeDisputes"),
    t("escrowFunds"),
    t("dashboard"),
    t("createTransaction"),
    t("noTransactions"),
    t("goToDetails"),
  ]);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{appTitle}</h1>
          <p className="text-sm opacity-75">{appSubtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle value={language} />
          <SignOutButton />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-foreground/20 p-4">
          <h2 className="text-sm opacity-70">{totalTransactionsLabel}</h2>
          <p className="text-2xl font-semibold">{dashboardData.totals.totalTransactions}</p>
        </article>
        <article className="rounded-lg border border-foreground/20 p-4">
          <h2 className="text-sm opacity-70">{activeDisputesLabel}</h2>
          <p className="text-2xl font-semibold">{dashboardData.totals.activeDisputes}</p>
        </article>
        <article className="rounded-lg border border-foreground/20 p-4">
          <h2 className="text-sm opacity-70">{escrowFundsLabel}</h2>
          <p className="text-2xl font-semibold">₦{dashboardData.totals.escrowFunds}</p>
        </article>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{dashboardLabel}</h2>
        <Link
          href={`/create-transaction?lang=${language}`}
          className="rounded-md border border-foreground/20 px-3 py-2"
        >
          {createTransactionLabel}
        </Link>
      </div>

      <div className="space-y-3">
        {dashboardData.transactions.length === 0 ? (
          <p>{noTransactionsLabel}</p>
        ) : (
          dashboardData.transactions.map((transaction) => (
            <article
              key={transaction.transactionId}
              className="flex flex-col gap-3 rounded-lg border border-foreground/20 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium">{transaction.transactionId}</p>
                <p className="text-sm opacity-75">
                  {transaction.buyerName} → {transaction.sellerName}
                </p>
                <p className="text-sm">₦{transaction.amount}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-foreground/20 px-2 py-1 text-xs">
                  {transaction.status}
                </span>
                <Link
                  href={`/transactions/${transaction.transactionId}?lang=${language}`}
                  className="rounded-md border border-foreground/20 px-3 py-2 text-sm"
                >
                  {goToDetailsLabel}
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
