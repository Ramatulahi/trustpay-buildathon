import { useLanguage } from "@/contexts/LanguageContext";
import translations from "@/i18n/translations";

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] || entry.english || key;
  };

  return { t, language };
};
