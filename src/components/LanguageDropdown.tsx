import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, type AppLanguage } from "@/contexts/LanguageContext";

const languages: { value: AppLanguage; label: string; flag: string }[] = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "pidgin", label: "Pidgin", flag: "🇳🇬" },
  { value: "yoruba", label: "Yorùbá", flag: "🇳🇬" },
  { value: "hausa", label: "Hausa", flag: "🇳🇬" },
];

const LanguageDropdown = () => {
  const { language, setLanguage, label } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Globe className="w-4 h-4" />
          <span className="text-xs font-medium hidden sm:inline">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className="gap-2"
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
            {language === lang.value && <Check className="w-3.5 h-3.5 ml-auto text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
