import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: {
      english: "What is escrow and how does it protect me?",
      pidgin: "Wetin be escrow and how e dey protect me?",
      yoruba: "Kí ni escrow àti bí ó ṣe ń dáàbò bo mi?",
      hausa: "Menene escrow kuma yaya yake kare ni?",
    },
    a: {
      english:
        "Escrow is a secure holding system where your payment is kept by TrustPay until the transaction is complete. When you pay, the money doesn't go directly to the seller — it's held safely until you confirm you've received what you ordered. If something goes wrong, the funds stay locked until the issue is resolved.",
      pidgin:
        "Escrow na like safe wey dey keep your money until everything settle. When you pay, the money no go direct to seller — e go stay for TrustPay hand until you confirm say you don receive wetin you buy. If wahala happen, the money go stay locked until dem resolve am.",
      yoruba:
        "Escrow jẹ́ ètò ààbò tí ó ń fi owó rẹ pamọ́ títí tí ìdúnàádúrà yóò fi parí. Nígbà tí o bá san owó, owó náà kò ní lọ tàárà sí olùtajà — a óò fi í pamọ́ títí tí o bá jẹ́rìísí pé o ti gba ohun tí o rà.",
      hausa:
        "Escrow tsari ne mai tsaro wanda ke riƙe kuɗin ka har sai an kammala ciniki. Idan ka biya, kuɗin ba za su je kai tsaye zuwa ga mai sayarwa ba — za a riƙe su lafiya har sai ka tabbatar da cewa ka karɓi abin da ka oda.",
    },
  },
  {
    q: {
      english: "How does TrustPay detect fraud?",
      pidgin: "How TrustPay dey catch fraud?",
      yoruba: "Báwo ni TrustPay ṣe ń rí àrékérekè?",
      hausa: "Yaya TrustPay ke gano zamba?",
    },
    a: {
      english:
        "Our Smart Risk Engine monitors every transaction in real-time. It analyzes transaction patterns, device/IP behavior, and user activity anomalies. Each transaction gets a risk score: Low risk → allowed, Medium risk → flagged for review, High risk → blocked. Signals include multiple failed transactions, sudden large payments, new accounts making high-value purchases, and IP mismatches.",
      pidgin:
        "Our smart system dey monitor every transaction as e dey happen. E dey check how you dey transact, your device, your location. Each transaction get risk score: If e low → e go pass, if e medium → dem go check am, if e high → dem go block am. Things wey go trigger alert na like too many failed payments, sudden big money, new account wey wan pay big, or your location no match.",
      yoruba:
        "Ètò Ìṣàwárí Ewu wa ń ṣàyẹ̀wò gbogbo ìdúnàádúrà ní àkókò gidi. Ó ń ṣàyẹ̀wò àwọn àpẹẹrẹ ìdúnàádúrà, ìwà ẹ̀rọ/IP, àti àwọn ohun àjèjì. Ìdúnàádúrà kọ̀ọ̀kan ní ìwọ̀n ewu.",
      hausa:
        "Injin Haɗari Mai Wayo na mu yana sa ido kan kowane ma'amala a lokaci guda. Yana binciken tsarin ma'amala, halayen na'ura/IP, da abubuwan da ba a saba gani ba. Kowane ma'amala yana samun maki haɗari.",
    },
  },
  {
    q: {
      english: "What is a Trust Score and how is it calculated?",
      pidgin: "Wetin be Trust Score and how dem dey calculate am?",
      yoruba: "Kí ni Ìwọ̀n Ìgbẹ́kẹ̀lé àti bí a ṣe ń ṣe ìṣirò rẹ̀?",
      hausa: "Menene Makin Amana kuma yaya ake lissafa shi?",
    },
    a: {
      english:
        "Your Trust Score is a dynamic rating (0–100) based on: Transaction success rate (40%), Reviews & ratings (30%), Verification level — ID, email, phone (20%), and Account age (10%), minus any dispute penalties. Higher scores unlock badges like 'Trusted Seller' and help other users choose reliable partners.",
      pidgin:
        "Your Trust Score na rating wey dey change based on: How your transactions dey successful (40%), Reviews wey people give you (30%), If you don verify your ID, email, phone (20%), and how long you don dey use the platform (10%), minus any dispute wahala. If your score high, you go get badge like 'Trusted Seller'.",
      yoruba:
        "Ìwọ̀n Ìgbẹ́kẹ̀lé rẹ jẹ́ ìwọ̀n tí ó ń yí padà (0–100) tó dá lórí: Oṣuwọn àṣeyọrí ìdúnàádúrà (40%), Àwọn àyẹ̀wò (30%), Ìpele ìfìdímúlẹ̀ (20%), àti Ọjọ́ orí àkọọ́lẹ̀ (10%).",
      hausa:
        "Makin Amana naka ƙima ne mai canzawa (0-100) dangane da: Adadin nasarar ma'amala (40%), Nazarce-nazarce (30%), Matakin tabbatarwa (20%), da Shekarun asusun (10%).",
    },
  },
  {
    q: {
      english: "What happens if I have a dispute with a seller?",
      pidgin: "Wetin go happen if me and seller get wahala?",
      yoruba: "Kí ni yóò ṣẹlẹ̀ tí àríyànjiyàn bá wà pẹ̀lú olùtajà?",
      hausa: "Me zai faru idan na sami rikici da mai sayarwa?",
    },
    a: {
      english:
        "1) You raise a dispute within 3–7 days. 2) Funds remain locked in escrow. 3) Both parties submit evidence (chat logs, delivery proof, screenshots). 4) Our team reviews the case impartially. 5) Decision: full refund to buyer, release to seller, or partial split. A small dispute fee (₦500–₦2000) applies to prevent frivolous claims. False claims result in account penalties.",
      pidgin:
        "1) You raise dispute within 3–7 days. 2) The money go stay locked for escrow. 3) Both of una go submit evidence (chat, delivery proof, screenshots). 4) Our team go review everything without bias. 5) Decision fit be: refund buyer, pay seller, or split am. Small dispute fee (₦500–₦2000) dey to stop fake complaints. If you lie, your account go get penalty.",
      yoruba:
        "1) O gbé àríyànjiyàn dìde láàárín ọjọ́ 3–7. 2) Owó náà yóò wà nínú escrow. 3) Àwọn ẹgbẹ́ méjèèjì yóò fi ẹ̀rí sílẹ̀. 4) Ẹgbẹ́ wa yóò ṣàyẹ̀wò ẹjọ́ náà. 5) Ìpinnu: ìdápadà owó, ìdásílẹ̀ sí olùtajà, tàbí pípín.",
      hausa:
        "1) Ka buɗe rikici cikin kwanaki 3–7. 2) Kuɗin za su kasance a cikin escrow. 3) Bangarorin biyu za su gabatar da shaida. 4) Ƙungiyar mu za ta bita shari'ar. 5) Hukunci: mayar da kuɗi, saki ga mai sayarwa, ko rabawa.",
    },
  },
  {
    q: {
      english: "Is my payment information safe on TrustPay?",
      pidgin: "My payment details safe for TrustPay?",
      yoruba: "Ṣé àlàyé ìsanwó mi wà láàbò lórí TrustPay?",
      hausa: "Shin bayanan biyan kuɗi na suna da aminci a TrustPay?",
    },
    a: {
      english:
        "Absolutely. TrustPay uses bank-grade security: SSL encryption (HTTPS) for all data in transit, tokenization so we never store your card details, OTP/2FA authentication for sensitive actions, and PCI-DSS compliant payment processing. Your data is encrypted end-to-end and processed through verified, secure channels.",
      pidgin:
        "100%! TrustPay dey use bank-level security: SSL encryption for all your data, tokenization so we no dey store your card details, OTP/2FA for important actions, and PCI-DSS compliant payment processing. Your data dey encrypted from start to finish.",
      yoruba:
        "Bẹ́ẹ̀ ni pátápátá. TrustPay ń lo ààbò ìpele banki: ìpamọ́ SSL fún gbogbo dátà, tokenization nítorí náà a kò fi àlàyé káàdì rẹ pamọ́, ìfọwọ́sí OTP/2FA fún àwọn iṣẹ́ pàtàkì.",
      hausa:
        "Tabbas. TrustPay yana amfani da tsaro na matakin banki: ɓoyayyen SSL don duk bayanai, tokenization don haka ba ma adana bayanan katin ku, tabbatarwar OTP/2FA don ayyuka masu mahimmanci.",
    },
  },
  {
    q: {
      english: "How long before funds are released to the seller?",
      pidgin: "How long before seller go see the money?",
      yoruba: "Ìgbà wo ni a óò dá owó sílẹ̀ sí olùtajà?",
      hausa: "Yaushe za a saki kuɗi ga mai sayarwa?",
    },
    a: {
      english:
        "Funds are released as soon as the buyer confirms delivery. If the buyer doesn't respond, there's an automatic time-based release after 3–5 days (configurable). For milestone-based services, payments can be split into stages. This ensures sellers get paid promptly while buyers have adequate time to verify.",
      pidgin:
        "Money go release as soon as buyer confirm say dem don receive. If buyer no respond, the system go auto-release the money after 3–5 days. For services wey get stages, payment fit dey split. This way, seller go get paid on time and buyer get enough time to check.",
      yoruba:
        "A óò dá owó sílẹ̀ ní kíákíá tí olùrà bá jẹ́rìísí ìfijìṣẹ́. Tí olùrà kò bá dáhùn, ìdásílẹ̀ aládàáṣe wà lẹ́yìn ọjọ́ 3–5.",
      hausa:
        "Ana sakin kuɗi da zarar mai saya ya tabbatar da isar da kaya. Idan mai saya bai amsa ba, akwai sakin kuɗi ta atomatik bayan kwanaki 3–5.",
    },
  },
];

const FAQSection = () => {
  const { language } = useTranslation();

  const sectionTitle = {
    english: "Frequently Asked Questions",
    pidgin: "Questions Wey People Dey Ask",
    yoruba: "Àwọn Ìbéèrè Tí A Sábà Máa Ń Béèrè",
    hausa: "Tambayoyin da Ake Yawan Yi",
  };

  const sectionSub = {
    english: "Everything you need to know about TrustPay's security and how transactions work.",
    pidgin: "Everything wey you need to know about how TrustPay dey work and how we dey protect you.",
    yoruba: "Gbogbo ohun tí o nílò láti mọ̀ nípa ààbò TrustPay àti bí àwọn ìdúnàádúrà ṣe ń ṣiṣẹ́.",
    hausa: "Duk abin da kuke buƙatar sani game da tsaron TrustPay da yadda ma'amaloli ke aiki.",
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {sectionTitle[language] || sectionTitle.english}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {sectionSub[language] || sectionSub.english}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:ring-2 data-[state=open]:ring-primary/30 transition-all"
            >
              <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                {faq.q[language] || faq.q.english}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {faq.a[language] || faq.a.english}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
