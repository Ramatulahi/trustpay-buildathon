import { CheckCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const WhyTrustPay = () => {
  const { t } = useTranslation();

  const bullets = [t("why.b1"), t("why.b2"), t("why.b3")];

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">{t("why.label")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("why.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("why.desc")}
            </p>
          </div>
          <div className="space-y-4">
            {bullets.map((b) => (
              <div key={b} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-foreground font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustPay;
