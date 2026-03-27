import { Target, Eye, AlertCircle, Lightbulb, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const AboutSection = () => {
  const { t, language } = useTranslation();

  const content = {
    mission: {
      english: "To eliminate the fear of online transactions in Africa by providing a secure escrow-powered payment layer that protects both buyers and sellers.",
      pidgin: "To remove the fear wey people dey get when dem dey buy and sell online for Africa, by providing secure escrow payment wey protect both buyer and seller.",
      yoruba: "Láti mú ìbẹ̀rù ìdúnàádúrà orí ayélujára kúrò ní Áfíríkà nípá pípèsè ìpele ìsanwó escrow aláàbò tí ó ń dáàbò bo àwọn olùrà àti olùtajà.",
      hausa: "Don kawar da tsoron mu'amaloli ta yanar gizo a Afirka ta hanyar samar da matakin biyan kuɗi na escrow mai tsaro wanda ke kare masu saya da masu sayarwa.",
    },
    vision: {
      english: "A world where every online transaction in Africa is safe, transparent, and trusted — empowering digital commerce for millions.",
      pidgin: "A world where every online transaction for Africa dey safe, transparent, and trusted — empowering digital buying and selling for millions of people.",
      yoruba: "Ayé kan tí gbogbo ìdúnàádúrà orí ayélujára ní Áfíríkà ti wà ní ààbò, ó sì jẹ́ ohun tí a gbẹ́kẹ̀lé — tí ó ń fún àwọn mílíọ̀nù lágbára nínú ìṣòwò oni-nọ́mbà.",
      hausa: "Duniyar da kowane ma'amala ta yanar gizo a Afirka ke da aminci, gaskiya, da amana — yana ƙarfafa kasuwancin dijital ga miliyoyin mutane.",
    },
    problem: {
      english: "Over 60% of online buyers in Africa have been scammed or fear being scammed. Fake payment alerts, undelivered goods, and zero accountability make digital commerce risky.",
      pidgin: "More than 60% of online buyers for Africa don chop scam or dey fear scam. Fake alert, goods wey no deliver, and nobody to hold responsible dey make online buying risky.",
      yoruba: "Ó lé ní 60% àwọn olùrà orí ayélujára ní Áfíríkà ti jẹ ìjìbìtí tàbí wọ́n bẹ̀rù ìjìbìtí. Ìkìlọ̀ owó irọ́, ọjà tí a kò fi jìṣẹ́, àti àìsí ìdáhùn ń mú kí ìṣòwò oni-nọ́mbà léwu.",
      hausa: "Fiye da kashi 60% na masu saya ta yanar gizo a Afirka sun sha zamba ko suna tsoron zamba. Saƙon kuɗi na ƙarya, kayayyaki marasa isarwa, da rashin alhaki suna sa kasuwancin dijital haɗari.",
    },
    solution: {
      english: "TrustPay acts as a neutral third party, holding payments in escrow until both buyer and seller fulfill their obligations. Combined with fraud detection and trust scoring, we make every transaction safe.",
      pidgin: "TrustPay dey act as neutral third party, holding payment inside escrow until both buyer and seller do their own part. With fraud detection and trust score, we make every transaction safe.",
      yoruba: "TrustPay ń ṣiṣẹ́ gẹ́gẹ́ bí ẹlẹ́ẹ̀kẹta aláìdásí, tí ó ń dáa owó dúró nínú escrow títí tí olùrà àti olùtajà yóò fi mú àwọn ojúṣe wọn ṣẹ.",
      hausa: "TrustPay yana aiki a matsayin ɓangare na uku marar son kai, yana riƙe kuɗi a cikin escrow har sai mai saya da mai sayarwa sun cika alƙawaransu.",
    },
    audience: {
      english: "Online shoppers, small business owners, freelancers, and anyone who buys or sells products and services online across Africa.",
      pidgin: "People wey dey buy things online, small business owners, freelancers, and anybody wey dey buy or sell online for Africa.",
      yoruba: "Àwọn olùrà orí ayélujára, àwọn oníṣòwò kékeré, àwọn alátagbà ọ̀fẹ́, àti ẹnikẹ́ni tí ó ń ra tàbí tà ọjà àti iṣẹ́ lórí ayélujára kárí Áfíríkà.",
      hausa: "Masu siyan kayayyaki ta yanar gizo, ƙananan 'yan kasuwa, masu zaman kansu, da kowa da ke saya ko sayar da kayayyaki da ayyuka ta yanar gizo a duk faɗin Afirka.",
    },
  };

  const sections = [
    {
      icon: Target,
      title: language === "pidgin" ? "Our Mission" : language === "yoruba" ? "Iṣẹ́ Àṣàyàn Wa" : language === "hausa" ? "Manufarmu" : "Our Mission",
      text: content.mission[language] || content.mission.english,
      color: "from-primary to-secondary",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Eye,
      title: language === "pidgin" ? "Our Vision" : language === "yoruba" ? "Ìran Wa" : language === "hausa" ? "Hangen Nesammu" : "Our Vision",
      text: content.vision[language] || content.vision.english,
      color: "from-secondary to-purple-400",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      icon: AlertCircle,
      title: language === "pidgin" ? "The Problem" : language === "yoruba" ? "Ìṣòro Náà" : language === "hausa" ? "Matsalar" : "The Problem",
      text: content.problem[language] || content.problem.english,
      color: "from-destructive to-orange-500",
      bgColor: "bg-destructive/10",
      iconColor: "text-destructive",
    },
    {
      icon: Lightbulb,
      title: language === "pidgin" ? "Our Solution" : language === "yoruba" ? "Ojútùú Wa" : language === "hausa" ? "Mafitarmu" : "Our Solution",
      text: content.solution[language] || content.solution.english,
      color: "from-accent to-emerald-400",
      bgColor: "bg-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: Users,
      title: language === "pidgin" ? "Who We Serve" : language === "yoruba" ? "Àwọn Tí A Ń Sìn" : language === "hausa" ? "Wadanda Muke Hidima" : "Target Audience",
      text: content.audience[language] || content.audience.english,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">{t("about.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("about.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("about.desc")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sections.map((s, i) => (
            <div
              key={i}
              className={`bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300 relative overflow-hidden ${
                i === 4 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
              style={{ animation: `fade-up ${0.3 + i * 0.1}s ease-out forwards`, opacity: 0 }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`} />
              <div className={`w-12 h-12 rounded-xl ${s.bgColor} flex items-center justify-center mb-4`}>
                <s.icon className={`w-6 h-6 ${s.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
