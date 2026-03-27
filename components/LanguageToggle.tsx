"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/lib/i18n";

export function LanguageToggle({
  value,
}: {
  value: SupportedLanguage;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateLanguage = (nextLanguage: SupportedLanguage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLanguage);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span>Language</span>
      <select
        className="rounded-md border border-foreground/20 bg-transparent px-2 py-1"
        value={value}
        onChange={(event) => updateLanguage(event.target.value as SupportedLanguage)}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
