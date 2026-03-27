import { BookOpen, ShieldAlert, Compass, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const EducationSection = () => {
  const { language } = useTranslation();

  const items = [
    {
      icon: BookOpen,
      title: { english: "Learn How Escrow Protects You", pidgin: "Learn How Escrow Dey Protect You", yoruba: "Kọ́ Bí Escrow Ṣe Ń Dáàbò Bo Ọ́", hausa: "Koyi Yadda Escrow Ke Kare Ka" },
      desc: { english: "Understand how your money stays safe until delivery is confirmed.", pidgin: "Understand how your money dey safe until delivery confirm.", yoruba: "Mọ bí owó rẹ ṣe wà ní ààbò títí tí ìfijìṣẹ́ fi jẹ́rìísí.", hausa: "Fahimci yadda kuɗin ka ke tsare har sai an tabbatar da isarwa." },
      color: "from-primary to-secondary",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: ShieldAlert,
      title: { english: "Avoid Common Online Scams", pidgin: "Avoid Common Online Scam", yoruba: "Yẹra Fún Ìjìbìtí Orí Ayélujára", hausa: "Guje Wa Zambar Yanar Gizo" },
      desc: { english: "Learn to spot fake alerts, phishing, and other fraud tactics.", pidgin: "Learn how to spot fake alert, phishing, and other fraud.", yoruba: "Kọ́ láti ṣàwárí ìkìlọ̀ irọ́, àti àwọn ìlànà àrékérekè mìíràn.", hausa: "Koyi ganin saƙon ƙarya, kamun bayanai, da sauran dabarun zamba." },
      color: "from-destructive to-orange-500",
      bgColor: "bg-destructive/10",
      iconColor: "text-destructive",
    },
    {
      icon: Compass,
      title: { english: "Step-by-Step Onboarding", pidgin: "How to Start Step by Step", yoruba: "Ìtọ́sọ́nà Ìgbésẹ̀-Ìgbésẹ̀", hausa: "Jagora Mataki-Mataki" },
      desc: { english: "Get started quickly with our simple, guided onboarding process.", pidgin: "Start quickly with our simple step-by-step guide.", yoruba: "Bẹ̀rẹ̀ ní kíákíá pẹ̀lú ìlànà ìtọ́sọ́nà wa tí ó rọrùn.", hausa: "Fara da sauri tare da tsarin mu mai sauƙi na jagora." },
      color: "from-accent to-emerald-400",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: TrendingUp,
      title: { english: "Understanding Trust Scores", pidgin: "How Trust Score Work", yoruba: "Ìmọ̀ Ìwọ̀n Ìgbẹ́kẹ̀lé", hausa: "Fahimtar Makin Amana" },
      desc: { english: "Your trust score reflects your reliability. Learn how to build it.", pidgin: "Your trust score show how reliable you be. Learn how to build am.", yoruba: "Ìwọ̀n ìgbẹ́kẹ̀lé rẹ ṣàfihàn bí o ṣe ṣeé gbẹ́kẹ̀lé. Kọ́ bí o ṣe lè kọ́ ọ.", hausa: "Makin amanar ka yana nuna amincin ka. Koyi yadda za ka gina shi." },
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: AlertTriangle,
      title: { english: "What to Do in a Dispute", pidgin: "Wetin to Do When Wahala Happen", yoruba: "Kí Ni Láti Ṣe Nínú Àríyànjiyàn", hausa: "Abin da Za Ka Yi Idan Rikici Ya Faru" },
      desc: { english: "Know your rights and how the dispute process works.", pidgin: "Know your rights and how dispute process dey work.", yoruba: "Mọ àwọn ẹ̀tọ́ rẹ àti bí ìlànà àríyànjiyàn ṣe ń ṣiṣẹ́.", hausa: "San haƙƙoƙinka da yadda tsarin warware rikici ke aiki." },
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: Users,
      title: { english: "Community Safety Tips", pidgin: "Safety Tips From Community", yoruba: "Àwọn Ìmọ̀ràn Ààbò Àwùjọ", hausa: "Shawarwarin Tsaro na Al'umma" },
      desc: { english: "Real tips from real users on staying safe in digital transactions.", pidgin: "Real tips from real users on how to stay safe for online transaction.", yoruba: "Àwọn ìmọ̀ràn gidi láti ọ̀dọ̀ àwọn olùlò gidi lórí bí a ṣe lè wà ní ààbò.", hausa: "Shawarwarin gaske daga masu amfani na gaske game da tsaro a cikin mu'amaloli na dijital." },
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
    },
  ];

  return (
    <section className="py-20 md:py-28 gradient-subtle">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">
          {language === "pidgin" ? "Resources" : language === "yoruba" ? "Àwọn Ohun Èlò" : language === "hausa" ? "Albarkatun" : "Resources"}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {language === "pidgin" ? "Stay Safe While You Transact" : language === "yoruba" ? "Wà Ní Ààbò Nígbà Tí O Ń Ṣòwò" : language === "hausa" ? "Ka Zauna Lafiya Yayin Ma'amala" : "Stay Safe While You Transact"}
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          {language === "pidgin" ? "Knowledge na your best defense against fraud." : language === "yoruba" ? "Ìmọ̀ ni ààbò rẹ tó dára jù lòdì sí àrékérekè." : language === "hausa" ? "Ilimi shine mafi kyawun kariyarku daga zamba." : "Knowledge is your best defense against fraud."}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all group cursor-pointer relative overflow-hidden text-left"
              style={{ animation: `fade-up ${0.3 + i * 0.1}s ease-out forwards`, opacity: 0 }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{item.title[language] || item.title.english}</h3>
              <p className="text-xs text-muted-foreground">{item.desc[language] || item.desc.english}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
