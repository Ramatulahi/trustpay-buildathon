import { useState } from "react";
import { ShoppingBag, Store, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const UserTypes = () => {
  const { language } = useTranslation();
  const [expandedCard, setExpandedCard] = useState<"buyer" | "seller" | null>(null);

  const buyerBullets = {
    english: ["Protected payments via escrow", "Dispute support if things go wrong", "Trust scores to vet sellers", "Only pay when you receive"],
    pidgin: ["Protected payment through escrow", "Dispute support if wahala happen", "Trust score to check seller", "You only pay when you receive am"],
    yoruba: ["Ìsanwó aláàbò nípasẹ̀ escrow", "Àtìlẹ́yìn àríyànjiyàn tí nǹkan bá burú", "Ìwọ̀n ìgbẹ́kẹ̀lé láti ṣàyẹ̀wò olùtajà", "San owó nìkan nígbà tí o bá gba"],
    hausa: ["Biyan kuɗi mai tsaro ta escrow", "Tallafin rikici idan abubuwa sun lalace", "Makin amana don binciken mai sayarwa", "Biya kawai idan ka karɓa"],
  };

  const sellerBullets = {
    english: ["Verified transactions build credibility", "Get paid securely and on time", "Showcase your trust score", "Business profile with social links"],
    pidgin: ["Verified transaction go build your credibility", "Get paid securely and on time", "Show your trust score", "Business profile with social links"],
    yoruba: ["Àwọn ìdúnàádúrà tí a fìdí múlẹ̀ ń kọ́ ìgbẹ́kẹ̀lé", "Gba owó ní ààbò àti ní àkókò", "Ṣàfihàn ìwọ̀n ìgbẹ́kẹ̀lé rẹ", "Ìpèsè iṣẹ́ pẹ̀lú àwọn ìjápọ̀ àwùjọ"],
    hausa: ["Ma'amaloli tabbatattu suna gina amincewa", "Karɓi kuɗi cikin aminci kuma a kan lokaci", "Nuna makin amanar ka", "Bayanan kasuwanci tare da hanyoyin sadarwa"],
  };

  const buyerDesc = {
    english: "Shop online without fear. TrustPay ensures your money stays safe until you confirm delivery.",
    pidgin: "Buy online without fear. TrustPay make sure your money safe until you confirm say you don receive.",
    yoruba: "Ra ọjà lórí ayélujára láìbẹ̀rù. TrustPay ń ríi dájú pé owó rẹ wà ní ààbò títí tí o fi jẹ́rìísí ìfijìṣẹ́.",
    hausa: "Saya ta yanar gizo ba tare da tsoro ba. TrustPay yana tabbatar da kuɗin ka na aminci har sai ka tabbatar da isarwa.",
  };

  const sellerDesc = {
    english: "Build trust and get paid securely. Your verified profile and trust score attract more buyers.",
    pidgin: "Build trust and get paid securely. Your verified profile and trust score go attract more buyers.",
    yoruba: "Kọ́ ìgbẹ́kẹ̀lé kí o sì gba owó ní ààbò. Ìpèsè rẹ tí a fìdí múlẹ̀ àti ìwọ̀n ìgbẹ́kẹ̀lé rẹ ń fa àwọn olùrà síwájú.",
    hausa: "Gina amana kuma ka karɓi kuɗi cikin aminci. Bayananka tabbatacce da makin amanar ka suna jawo ƙarin masu saya.",
  };

  return (
    <section className="py-20 md:py-28 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
            {language === "pidgin" ? "For Everybody" : language === "yoruba" ? "Fún Gbogbo Ènìyàn" : language === "hausa" ? "Ga Kowa" : "For Everyone"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {language === "pidgin" ? "Whether You Dey Buy or Sell" : language === "yoruba" ? "Bóyá O Ń Rà Tàbí O Ń Tà" : language === "hausa" ? "Ko Kana Saya Ko Sayarwa" : "Whether You Buy or Sell"}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Buyer */}
          <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
              <ShoppingBag className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {language === "pidgin" ? "For Buyers" : language === "yoruba" ? "Fún Àwọn Olùrà" : language === "hausa" ? "Ga Masu Saya" : "For Buyers"}
            </h3>
            <p className="text-muted-foreground mb-4">{buyerDesc[language] || buyerDesc.english}</p>
            <div className="space-y-2">
              {(buyerBullets[language] || buyerBullets.english).slice(0, expandedCard === "buyer" ? 4 : 2).map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /> {b}
                </div>
              ))}
            </div>
            <button
              onClick={() => setExpandedCard(expandedCard === "buyer" ? null : "buyer")}
              className="mt-4 text-xs text-primary font-medium flex items-center gap-1 hover:underline"
            >
              {expandedCard === "buyer" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expandedCard === "buyer"
                ? (language === "pidgin" ? "Show Less" : "Show Less")
                : (language === "pidgin" ? "See More" : "See More")}
            </button>
          </div>

          {/* Seller */}
          <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-purple-400" />
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
              <Store className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {language === "pidgin" ? "For Sellers" : language === "yoruba" ? "Fún Àwọn Olùtajà" : language === "hausa" ? "Ga Masu Sayarwa" : "For Sellers"}
            </h3>
            <p className="text-muted-foreground mb-4">{sellerDesc[language] || sellerDesc.english}</p>
            <div className="space-y-2">
              {(sellerBullets[language] || sellerBullets.english).slice(0, expandedCard === "seller" ? 4 : 2).map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /> {b}
                </div>
              ))}
            </div>
            <button
              onClick={() => setExpandedCard(expandedCard === "seller" ? null : "seller")}
              className="mt-4 text-xs text-primary font-medium flex items-center gap-1 hover:underline"
            >
              {expandedCard === "seller" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {expandedCard === "seller"
                ? (language === "pidgin" ? "Show Less" : "Show Less")
                : (language === "pidgin" ? "See More" : "See More")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
