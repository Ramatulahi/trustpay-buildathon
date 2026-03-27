import { useState } from "react";
import { FileText, Lock, CheckCircle, Banknote } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();

  const steps = [
    { icon: FileText, title: t("howItWorks.s1.title"), desc: t("howItWorks.s1.desc"), color: "bg-primary/10 text-primary" },
    { icon: Lock, title: t("howItWorks.s2.title"), desc: t("howItWorks.s2.desc"), color: "bg-secondary/10 text-secondary" },
    { icon: CheckCircle, title: t("howItWorks.s3.title"), desc: t("howItWorks.s3.desc"), color: "bg-accent/10 text-accent" },
    { icon: Banknote, title: t("howItWorks.s4.title"), desc: t("howItWorks.s4.desc"), color: "bg-primary/10 text-primary" },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">{t("howItWorks.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("howItWorks.title")}</h2>
        </div>

        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active === i
                  ? "gradient-primary text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {t("howItWorks.step")} {i + 1}
            </button>
          ))}
        </div>

        <div className="max-w-lg mx-auto text-center" key={active}>
          <div
            className={`w-20 h-20 rounded-2xl ${steps[active].color} flex items-center justify-center mx-auto mb-6`}
            style={{ animation: "fade-up 0.4s ease-out forwards" }}
          >
            {(() => { const Icon = steps[active].icon; return <Icon className="w-9 h-9" />; })()}
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3" style={{ animation: "fade-up 0.5s ease-out forwards" }}>
            {steps[active].title}
          </h3>
          <p className="text-muted-foreground" style={{ animation: "fade-up 0.6s ease-out forwards" }}>
            {steps[active].desc}
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-8 gradient-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
