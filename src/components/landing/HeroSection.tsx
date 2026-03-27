import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, User, Store } from "lucide-react";
import ListenButton from "@/components/ListenButton";
import { useTranslation } from "@/hooks/useTranslation";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6" style={{ animation: "fade-up 0.4s ease-out forwards" }}>
            <Shield className="w-4 h-4" /> {t("hero.badge")}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-foreground" style={{ animation: "fade-up 0.6s ease-out forwards" }}>
            {t("hero.title1")}{" "}
            <span className="text-gradient">{t("hero.title2")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4" style={{ animation: "fade-up 0.8s ease-out forwards" }}>
            {t("hero.subtitle")}
          </p>
          <div className="flex justify-center mb-8" style={{ animation: "fade-up 0.9s ease-out forwards" }}>
            <ListenButton
              text={t("hero.subtitle")}
              variant="outline"
              size="sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ animation: "fade-up 1s ease-out forwards" }}>
            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-primary-foreground border-0 px-8 shadow-glow hover:opacity-90 transition-opacity">
                {t("nav.getStarted")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="px-8">
                {t("hero.seeHow")}
              </Button>
            </a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto" style={{ animation: "fade-up 1.2s ease-out forwards" }}>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-float">
                <User className="w-7 h-7 md:w-9 md:h-9 text-primary" />
              </div>
              <span className="text-xs md:text-sm font-medium text-muted-foreground">{t("hero.buyer")}</span>
            </div>

            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary/40 to-primary rounded-full max-w-[80px] md:max-w-[120px]" />

            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl gradient-primary flex items-center justify-center animate-pulse-glow">
                <Shield className="w-9 h-9 md:w-11 md:h-11 text-primary-foreground" />
              </div>
              <span className="text-xs md:text-sm font-bold text-gradient">TrustPay</span>
            </div>

            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-primary/40 rounded-full max-w-[80px] md:max-w-[120px]" />

            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary/10 flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <Store className="w-7 h-7 md:w-9 md:h-9 text-secondary" />
              </div>
              <span className="text-xs md:text-sm font-medium text-muted-foreground">{t("hero.seller")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
