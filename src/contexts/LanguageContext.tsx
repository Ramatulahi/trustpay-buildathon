import React, { createContext, useContext, useState } from "react";

export type AppLanguage = "english" | "pidgin" | "yoruba" | "hausa";

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  label: string;
}

const labels: Record<AppLanguage, string> = {
  english: "English",
  pidgin: "Pidgin",
  yoruba: "Yorùbá",
  hausa: "Hausa",
};

const LanguageContext = createContext<LanguageContextType>({
  language: "english",
  setLanguage: () => {},
  label: "English",
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<AppLanguage>("english");
  return (
    <LanguageContext.Provider value={{ language, setLanguage, label: labels[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
