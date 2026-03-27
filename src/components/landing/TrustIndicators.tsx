import { ShieldCheck, Lock, HandshakeIcon } from "lucide-react";

const indicators = [
  { icon: ShieldCheck, label: "Secure Payments", desc: "Bank-grade encryption" },
  { icon: Lock, label: "Fraud Protection", desc: "Real-time monitoring" },
  { icon: HandshakeIcon, label: "Trusted Transactions", desc: "Escrow-backed safety" },
];

const TrustIndicators = () => (
  <section className="py-12 border-y border-border bg-card/50">
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
        {indicators.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustIndicators;
