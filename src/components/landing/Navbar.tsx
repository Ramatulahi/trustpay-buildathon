import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Menu, X, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, type AppLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

const languages: { value: AppLanguage; label: string; flag: string }[] = [
  { value: "english", label: "English", flag: "🇬🇧" },
  { value: "pidgin", label: "Pidgin", flag: "🇳🇬" },
  { value: "yoruba", label: "Yorùbá", flag: "🇳🇬" },
  { value: "hausa", label: "Hausa", flag: "🇳🇬" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, label } = useLanguage();
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">TrustPay</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.features")}</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.howItWorks")}</a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav.about")}</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">{label}</span>
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
          <Link to="/login">
            <Button variant="ghost" size="sm">{t("nav.login")}</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="gradient-primary text-primary-foreground border-0">{t("nav.getStarted")}</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          <a href="#features" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>{t("nav.features")}</a>
          <a href="#how-it-works" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>{t("nav.howItWorks")}</a>
          <a href="#about" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>{t("nav.about")}</a>
          <div className="flex items-center gap-2 pt-1">
            <Globe className="w-4 h-4 text-muted-foreground" />
            {languages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => setLanguage(lang.value)}
                className={`text-xs px-2 py-1 rounded-full transition-colors ${
                  language === lang.value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 pt-2">
            <Link to="/login" className="flex-1"><Button variant="outline" className="w-full" size="sm">{t("nav.login")}</Button></Link>
            <Link to="/signup" className="flex-1"><Button className="w-full gradient-primary text-primary-foreground border-0" size="sm">{t("nav.getStarted")}</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
