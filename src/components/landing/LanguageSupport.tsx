const languages = [
  { flag: "🇬🇧", name: "English" },
  { flag: "🇳🇬", name: "Pidgin" },
  { flag: "🇳🇬", name: "Yorùbá" },
  { flag: "🇳🇬", name: "Hausa" },
];

const LanguageSupport = () => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4 text-center">
      <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Accessibility</p>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Built for Everyone</h2>
      <p className="text-muted-foreground mb-10 max-w-md mx-auto">
        Understand and use TrustPay in your preferred language
      </p>
      <div className="flex justify-center gap-4 flex-wrap">
        {languages.map((l) => (
          <div key={l.name} className="bg-card rounded-2xl px-6 py-4 border border-border hover:shadow-md transition-all flex items-center gap-3">
            <span className="text-2xl">{l.flag}</span>
            <span className="font-medium text-foreground">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LanguageSupport;
