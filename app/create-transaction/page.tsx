import Link from "next/link";

import { CreateTransactionForm } from "@/components/CreateTransactionForm";
import { LanguageToggle } from "@/components/LanguageToggle";
import { getTranslator, parseLanguage } from "@/lib/i18n";
import { requireSession } from "@/lib/session";

type SearchParams = Promise<{ lang?: string }>;

export default async function CreateTransactionPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  await requireSession();

  const { lang } = await searchParams;
  const language = parseLanguage(lang);
  const { t } = await getTranslator(language);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{await t("createTransaction")}</h1>
          <p className="opacity-75">{await t("appSubtitle")}</p>
        </div>
        <LanguageToggle value={language} />
      </div>

      <CreateTransactionForm />

      <Link href={`/dashboard?lang=${language}`} className="text-sm underline underline-offset-4">
        ← {await t("dashboard")}
      </Link>
    </main>
  );
}
