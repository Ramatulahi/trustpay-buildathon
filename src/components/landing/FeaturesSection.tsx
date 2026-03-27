import { useState } from "react";
import { Shield, AlertTriangle, Star, Scale, Lock, ChevronRight, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const featureDetails = [
  {
    icon: Shield,
    color: "from-primary to-secondary",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
    learnMore: {
      english: "💡 What It Is\nEscrow is a secure holding system where money is kept by TrustPay until both buyer and seller fulfill their obligations.\n\n⚙️ How It Works\n1. Buyer initiates payment\n2. Funds are held securely (escrow)\n3. Seller delivers product/service\n4. Buyer confirms satisfaction\n5. Funds are released to seller\n👉 If there's a problem → funds remain locked until resolved\n\n🔐 Key Features\n• Time-based auto-release (3–5 days)\n• Milestone-based payments for services\n• Automatic refund triggers if conditions aren't met",
      pidgin: "💡 Wetin E Be\nEscrow na like safe wey dey keep your money until everything settle. TrustPay hold the money until buyer and seller don do their part.\n\n⚙️ How E Dey Work\n1. Buyer pay money\n2. Money enter escrow (safe keeping)\n3. Seller deliver the goods\n4. Buyer confirm say e don receive\n5. Money release to seller\n👉 If wahala happen → money stay locked until dem resolve am\n\n🔐 Key Features\n• Auto-release after 3–5 days\n• Payment fit dey split for stages\n• Refund go happen if conditions no meet",
      yoruba: "💡 Kí Ni\nEscrow jẹ́ ètò ààbò tí ó ń fi owó pamọ́ títí tí olùrà àti olùtajà bá parí iṣẹ́ wọn.\n\n⚙️ Bí Ó Ṣe Ń Ṣiṣẹ́\n1. Olùrà san owó\n2. A fi owó pamọ́ sínú escrow\n3. Olùtajà fi ọjà ránṣẹ́\n4. Olùrà jẹ́rìísí\n5. A dá owó sílẹ̀\n\n🔐 Àwọn Ẹ̀yà Pàtàkì\n• Ìdásílẹ̀ aládàáṣe lẹ́yìn ọjọ́ 3–5\n• Ìsanwó ìpele fún iṣẹ́",
      hausa: "💡 Menene\nEscrow tsari ne mai tsaro wanda ke riƙe kuɗi har sai mai saya da mai sayarwa sun cika alƙawuransu.\n\n⚙️ Yadda Yake Aiki\n1. Mai saya ya biya\n2. Ana riƙe kuɗi a escrow\n3. Mai sayarwa ya isar da kaya\n4. Mai saya ya tabbatar\n5. Ana sakin kuɗi\n\n🔐 Manyan Fasaloli\n• Sakin kuɗi ta atomatik bayan kwanaki 3–5\n• Biyan kuɗi na matakai",
    },
  },
  {
    icon: AlertTriangle,
    color: "from-destructive to-orange-500",
    bgColor: "bg-destructive/10",
    iconColor: "text-destructive",
    learnMore: {
      english: "💡 What It Is\nA system that automatically identifies suspicious behavior before fraud happens.\n\n⚙️ How It Works\nThe system monitors transaction patterns, device/IP behavior, and user activity anomalies. Each transaction gets a risk score:\n• Low risk → Allowed\n• Medium risk → Flagged for review\n• High risk → Blocked or held\n\n🔍 Detection Signals\n• Multiple failed transactions\n• Sudden large payments\n• New account + high-value transaction\n• IP mismatch / unusual location\n• Repeated disputes\n\n🎯 Outcome\nReduces financial losses, protects platform reputation, and increases trust for all users.",
      pidgin: "💡 Wetin E Be\nSmart system wey dey catch fraud before e happen.\n\n⚙️ How E Dey Work\nThe system dey monitor how you dey transact, your device, your location. Each transaction get risk score:\n• Low risk → E go pass\n• Medium risk → Dem go check am\n• High risk → Dem go block am\n\n🔍 Wetin Go Trigger Alert\n• Too many failed payments\n• Sudden big money movement\n• New account wey wan pay big\n• Location no match\n• Too many disputes",
      yoruba: "💡 Kí Ni\nÈtò tí ó ń ṣàwárí ìwà àfojúdi ṣáájú kí jìbìtì tó ṣẹlẹ̀.\n\n⚙️ Bí Ó Ṣe Ń Ṣiṣẹ́\nÈtò náà ń ṣàyẹ̀wò àwọn àpẹẹrẹ ìdúnàádúrà. Ìdúnàádúrà kọ̀ọ̀kan ní ìwọ̀n ewu:\n• Ewu kékeré → A gbà láàyè\n• Ewu àárín → A fi àmì sí\n• Ewu gíga → A dínà",
      hausa: "💡 Menene\nTsari da ke gano halayen da ke da shakku kafin zamba ta faru.\n\n⚙️ Yadda Yake Aiki\nTsarin yana sa ido kan tsarin ma'amala. Kowane ma'amala yana samun maki haɗari:\n• Ƙaramin haɗari → An yarda\n• Matsakaicin haɗari → An yi wa alama\n• Babban haɗari → An toshe",
    },
  },
  {
    icon: Star,
    color: "from-accent to-emerald-400",
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
    learnMore: {
      english: "💡 What It Is\nA dynamic rating system (0–100) that measures how trustworthy a user is.\n\n📊 What Makes Up the Score\n• Transaction success rate — 40%\n• Reviews & ratings — 30%\n• Verification level (ID/email/phone) — 20%\n• Account age — 10%\n• Minus dispute penalties\n\n⚙️ Example Formula\nTrust Score = (0.4 × Success Rate) + (0.3 × Reviews) + (0.2 × Verification) + (0.1 × Account Age) – Dispute Penalty\n\n🎯 Why It Matters\n• Helps users choose reliable partners\n• Encourages good behavior\n• Unlocks badges like 'Trusted Seller'\n• Reduces fraud over time",
      pidgin: "💡 Wetin E Be\nRating system (0–100) wey show how trustworthy person be.\n\n📊 How Dem Calculate Am\n• Transaction success rate — 40%\n• Reviews wey people give you — 30%\n• If you don verify (ID/email/phone) — 20%\n• How long you don dey — 10%\n• Minus dispute wahala\n\n🎯 Why E Important\n• Help people choose who to deal with\n• Make people behave well\n• You fit get badge like 'Trusted Seller'\n• Reduce fraud with time",
      yoruba: "💡 Kí Ni\nÈtò ìwọ̀n (0–100) tí ó ń wọ̀n bí olùlò ṣe jẹ́ ẹni tí a lè gbẹ́kẹ̀lé.\n\n📊 Ohun Tí Ó Ń Ṣe Ìwọ̀n\n• Oṣuwọn àṣeyọrí — 40%\n• Àwọn àyẹ̀wò — 30%\n• Ìpele ìfìdímúlẹ̀ — 20%\n• Ọjọ́ orí àkọọ́lẹ̀ — 10%",
      hausa: "💡 Menene\nTsarin ƙima (0-100) wanda ke auna yadda mai amfani yake da aminci.\n\n📊 Abin Da Ke Ƙirƙira Makin\n• Adadin nasarar ma'amala — 40%\n• Nazarce-nazarce — 30%\n• Matakin tabbatarwa — 20%\n• Shekarun asusun — 10%",
    },
  },
  {
    icon: Scale,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-secondary/10",
    iconColor: "text-secondary",
    learnMore: {
      english: "💡 What It Is\nA structured system to resolve conflicts between buyers and sellers fairly.\n\n⚙️ Process Flow\n1. Buyer raises dispute (within 3–7 days)\n2. Funds remain locked in escrow\n3. Both parties submit evidence (chat logs, delivery proof, screenshots)\n4. Platform reviews case impartially\n5. Decision: Full refund, release to seller, or partial split\n\n💰 Dispute Fee\nA small fee (₦500–₦2000) applies to prevent frivolous claims and cover review costs.\n\n📜 Rules\n• Must be raised within the dispute window\n• Evidence is required from both sides\n• False claims → account penalty or downgrade",
      pidgin: "💡 Wetin E Be\nSystem wey dey settle wahala between buyer and seller fairly.\n\n⚙️ How E Dey Work\n1. Buyer raise dispute (within 3–7 days)\n2. Money stay locked for escrow\n3. Both sides submit evidence\n4. Platform review everything without bias\n5. Decision: Refund buyer, pay seller, or split am\n\n💰 Dispute Fee\nSmall fee (₦500–₦2000) to stop fake complaints.\n\n📜 Rules\n• Must raise am within the time\n• Evidence must dey\n• If you lie → your account go suffer",
      yoruba: "💡 Kí Ni\nÈtò tí a tò lẹ́sẹẹsẹ láti yanjú àríyànjiyàn láàárín olùrà àti olùtajà.\n\n⚙️ Ìlànà\n1. Olùrà gbé àríyànjiyàn dìde\n2. Owó wà nínú escrow\n3. Àwọn ẹgbẹ́ méjèèjì fi ẹ̀rí sílẹ̀\n4. A ṣàyẹ̀wò ẹjọ́\n5. Ìpinnu: Ìdápadà, ìdásílẹ̀, tàbí pípín",
      hausa: "💡 Menene\nTsari mai tsari don warware rikice-rikice tsakanin masu saya da masu sayarwa.\n\n⚙️ Tsarin Aiki\n1. Mai saya ya buɗe rikici\n2. Kuɗi suna cikin escrow\n3. Bangarorin biyu sun gabatar da shaida\n4. An bita shari'ar\n5. Hukunci: Mayar da kuɗi, saki, ko rabawa",
    },
  },
  {
    icon: Lock,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
    learnMore: {
      english: "💡 What It Is\nBank-grade security infrastructure that ensures all financial transactions are encrypted, authenticated, and protected.\n\n🔐 Core Security Layers\n• SSL encryption (HTTPS) for all data in transit\n• Tokenization — we never store your card details\n• OTP / 2FA authentication for sensitive actions\n• PCI-DSS compliant payment processing\n\n⚙️ Payment Flow\n1. User enters payment details\n2. Data is encrypted end-to-end\n3. Sent to payment gateway securely\n4. Gateway authorizes transaction\n5. Response returned through secure channel\n\n🎯 Why It Matters\n• Prevents hacking & data theft\n• Builds user confidence\n• Required for regulatory compliance and scaling",
      pidgin: "💡 Wetin E Be\nBank-level security wey make sure say all transactions dey encrypted and protected.\n\n🔐 Security Layers\n• SSL encryption for all data\n• Tokenization — we no dey store your card details\n• OTP / 2FA for important actions\n• PCI-DSS compliant\n\n⚙️ Payment Flow\n1. You enter payment details\n2. Data dey encrypted\n3. E go to payment gateway securely\n4. Gateway authorize am\n5. Response come back through secure channel",
      yoruba: "💡 Kí Ni\nÀmùlò ààbò ìpele banki tí ó ń rí i dájú pé gbogbo ìdúnàádúrà ni a ti pamọ́, fọwọ́sí, àti dáàbò bo.\n\n🔐 Àwọn Ìpele Ààbò\n• Ìpamọ́ SSL fún gbogbo dátà\n• Tokenization — a kò fi àlàyé káàdì pamọ́\n• Ìfọwọ́sí OTP/2FA",
      hausa: "💡 Menene\nKayan aikin tsaro na matakin banki wanda ke tabbatar da cewa duk ma'amalolin kuɗi an ɓoye su kuma an kare su.\n\n🔐 Matakan Tsaro\n• Ɓoyayyen SSL don duk bayanai\n• Tokenization — ba ma adana bayanan katin ku\n• Tabbatarwar OTP/2FA",
    },
  },
];

const FeaturesSection = () => {
  const { t, language } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const features = featureDetails.map((f, i) => ({
    ...f,
    title: t([
      "features.escrow.title",
      "features.fraud.title",
      "features.trust.title",
      "features.dispute.title",
      "features.secure.title",
    ][i]),
    desc: t([
      "features.escrow.desc",
      "features.fraud.desc",
      "features.trust.desc",
      "features.dispute.desc",
      "features.secure.desc",
    ][i]),
  }));

  return (
    <section id="features" className="py-20 md:py-28 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">{t("features.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("features.title")}</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {language === "pidgin" ? "Click any card to learn more about how each feature dey protect you." :
             language === "yoruba" ? "Tẹ kádì kankan láti kẹ́kọ̀ọ́ síi nípa bí ẹ̀yà kọ̀ọ̀kan ṣe ń dáàbò bo ọ́." :
             language === "hausa" ? "Danna kowace katin don ƙarin koyo game da yadda kowane fasali ke kare ku." :
             "Click any card to learn more about how each feature keeps you protected."}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className={`bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden ${
                expandedIndex === i ? "ring-2 ring-primary shadow-lg" : ""
              }`}
              style={{ animation: `fade-up ${0.3 + i * 0.1}s ease-out forwards`, opacity: 0 }}
            >
              {/* Color accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.color}`} />
              
              <div className={`w-12 h-12 rounded-xl ${f.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-6 h-6 ${f.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{f.desc}</p>
              
              {expandedIndex === i ? (
                <div className="mt-3 pt-3 border-t border-border" style={{ animation: "fade-up 0.3s ease-out forwards" }}>
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                    {f.learnMore[language] || f.learnMore.english}
                  </p>
                  <button className="mt-4 text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                    <X className="w-3 h-3" />
                    {language === "pidgin" ? "Close" : language === "yoruba" ? "Pa" : language === "hausa" ? "Rufe" : "Close"}
                  </button>
                </div>
              ) : (
                <button className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
                  <ChevronRight className="w-3 h-3" />
                  {language === "pidgin" ? "Read More" : language === "yoruba" ? "Ka Síwájú" : language === "hausa" ? "Ƙara Karantawa" : "Learn More"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
