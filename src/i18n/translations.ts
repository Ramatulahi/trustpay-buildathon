import type { AppLanguage } from "@/contexts/LanguageContext";

const translations: Record<string, Record<AppLanguage, string>> = {
  // Navbar
  "nav.features": {
    english: "Features",
    pidgin: "Wetin We Get",
    yoruba: "Àwọn Ẹ̀yà",
    hausa: "Fasaloli",
  },
  "nav.howItWorks": {
    english: "How It Works",
    pidgin: "How E Dey Work",
    yoruba: "Bí Ó Ṣe Ń Ṣiṣẹ́",
    hausa: "Yadda Yake Aiki",
  },
  "nav.about": {
    english: "About",
    pidgin: "About Us",
    yoruba: "Nípa Wa",
    hausa: "Game da Mu",
  },
  "nav.login": {
    english: "Log In",
    pidgin: "Enter",
    yoruba: "Wọlé",
    hausa: "Shiga",
  },
  "nav.getStarted": {
    english: "Get Started",
    pidgin: "Start Now",
    yoruba: "Bẹ̀rẹ̀ Níbí",
    hausa: "Fara Yanzu",
  },

  // Hero
  "hero.badge": {
    english: "Escrow-Powered Payments",
    pidgin: "Payment Wey Dey Protected",
    yoruba: "Ìsanwó Tí A Dáàbò Bò",
    hausa: "Biyan Kuɗi Mai Tsaro",
  },
  "hero.title1": {
    english: "Pay Only When",
    pidgin: "Pay Only When",
    yoruba: "San Owó Nìkan Nígbà Tí",
    hausa: "Biya Kawai Idan",
  },
  "hero.title2": {
    english: "You Receive",
    pidgin: "You Receive Am",
    yoruba: "O Bá Gba",
    hausa: "Ka Karɓa",
  },
  "hero.subtitle": {
    english: "TrustPay protects buyers and sellers by holding payments securely until delivery is confirmed.",
    pidgin: "TrustPay dey protect buyer and seller by holding payment safe until dem confirm say delivery don happen.",
    yoruba: "TrustPay ń dáàbò bo àwọn olùrà àti olùtajà nípá dídá owó dúró títí tí wọ́n yóò fi jẹ́rìísí ìfijìṣẹ́.",
    hausa: "TrustPay yana kare masu saya da masu sayarwa ta hanyar riƙe kuɗi har sai an tabbatar da isarwa.",
  },
  "hero.seeHow": {
    english: "See How It Works",
    pidgin: "See How E Dey Work",
    yoruba: "Wo Bí Ó Ṣe Ń Ṣiṣẹ́",
    hausa: "Duba Yadda Yake",
  },
  "hero.buyer": {
    english: "Buyer",
    pidgin: "Buyer",
    yoruba: "Olùrà",
    hausa: "Mai Saya",
  },
  "hero.seller": {
    english: "Seller",
    pidgin: "Seller",
    yoruba: "Olùtajà",
    hausa: "Mai Sayarwa",
  },

  // Features
  "features.label": {
    english: "Platform Features",
    pidgin: "Wetin We Get",
    yoruba: "Àwọn Ẹ̀yà Pẹpẹ",
    hausa: "Fasalolin Dandali",
  },
  "features.title": {
    english: "Everything You Need to Transact Safely",
    pidgin: "Everything Wey You Need to Do Transaction Safe",
    yoruba: "Gbogbo Ohun Tí O Nílò Láti Ṣòwò Láìléwu",
    hausa: "Duk Abin da Kuke Buƙata don Yin Ciniki Lafiya",
  },
  "features.escrow.title": {
    english: "Escrow Protection",
    pidgin: "Escrow Protection",
    yoruba: "Ààbò Escrow",
    hausa: "Kariyar Escrow",
  },
  "features.escrow.desc": {
    english: "Your money is safe until you receive what you paid for.",
    pidgin: "Your money dey safe until you receive wetin you pay for.",
    yoruba: "Owó rẹ wà ní ààbò títí tí o fi gba ohun tí o san owó fún.",
    hausa: "Kuɗin ka na aminci har sai ka sami abin da ka biya.",
  },
  "features.fraud.title": {
    english: "Fraud Detection",
    pidgin: "Fraud Detection",
    yoruba: "Ìṣàwárí Àrékérekè",
    hausa: "Gano Zamba",
  },
  "features.fraud.desc": {
    english: "Smart alerts detect suspicious transactions in real-time.",
    pidgin: "Smart alert go detect any wahala transaction on time.",
    yoruba: "Àwọn ìkìlọ̀ ọlọ́gbọ́n ń ṣàwárí àwọn ìdúnàádúrà tí ó fura sí.",
    hausa: "Faɗakarwar fasaha tana gano ma'amaloli masu zargi nan take.",
  },
  "features.trust.title": {
    english: "Trust Score",
    pidgin: "Trust Score",
    yoruba: "Ìwọ̀n Ìgbẹ́kẹ̀lé",
    hausa: "Makin Amana",
  },
  "features.trust.desc": {
    english: "Know who you're dealing with before you pay.",
    pidgin: "Know who you dey deal with before you pay.",
    yoruba: "Mọ ẹni tí o ń bá ṣòwò kí o tó san owó.",
    hausa: "San wanda kake hulɗa da shi kafin ka biya.",
  },
  "features.dispute.title": {
    english: "Dispute Resolution",
    pidgin: "Settle Wahala",
    yoruba: "Ìyanjú Ìjà",
    hausa: "Warware Rikici",
  },
  "features.dispute.desc": {
    english: "Resolve issues fairly with evidence-based review.",
    pidgin: "Settle any issue with fairness and evidence.",
    yoruba: "Yanjú àwọn ọ̀ràn lọ́nà tó tọ́ pẹ̀lú àyẹ̀wò tó dá lórí ẹ̀rí.",
    hausa: "Warware matsaloli cikin adalci da bita bisa shaida.",
  },
  "features.secure.title": {
    english: "Secure Payments",
    pidgin: "Safe Payment",
    yoruba: "Ìsanwó Aláàbò",
    hausa: "Biyan Kuɗi Mai Tsaro",
  },
  "features.secure.desc": {
    english: "Powered by reliable payment infrastructure.",
    pidgin: "Powered by reliable payment system.",
    yoruba: "Ó ń ṣiṣẹ́ pẹ̀lú ètò ìsanwó tó ṣeé gbẹ́kẹ̀lé.",
    hausa: "Ana aiki da tsarin biyan kuɗi mai dogaro.",
  },

  // How It Works
  "howItWorks.label": {
    english: "Simple Process",
    pidgin: "Simple Process",
    yoruba: "Ìlànà Tí Ó Rọrùn",
    hausa: "Tsari Mai Sauƙi",
  },
  "howItWorks.title": {
    english: "How It Works",
    pidgin: "How E Dey Work",
    yoruba: "Bí Ó Ṣe Ń Ṣiṣẹ́",
    hausa: "Yadda Yake Aiki",
  },
  "howItWorks.step": {
    english: "Step",
    pidgin: "Step",
    yoruba: "Ìgbésẹ̀",
    hausa: "Mataki",
  },
  "howItWorks.s1.title": {
    english: "Create a Transaction",
    pidgin: "Create Transaction",
    yoruba: "Ṣẹ̀dá Ìdúnàádúrà",
    hausa: "Ƙirƙiri Ma'amala",
  },
  "howItWorks.s1.desc": {
    english: "Buyer enters amount and seller details to initiate a secure transaction.",
    pidgin: "Buyer go enter amount and seller details to start safe transaction.",
    yoruba: "Olùrà yóò tẹ iye owó àti àlàyé olùtajà láti bẹ̀rẹ̀ ìdúnàádúrà aláàbò.",
    hausa: "Mai saya zai shigar da adadi da bayanan mai sayarwa don fara ma'amala mai tsaro.",
  },
  "howItWorks.s2.title": {
    english: "Payment is Held Securely",
    pidgin: "Payment Dey Safe",
    yoruba: "A Dáa Owó Dúró Láàbò",
    hausa: "Ana Riƙe Kuɗi Lafiya",
  },
  "howItWorks.s2.desc": {
    english: "Funds are locked in escrow — safe from both parties until conditions are met.",
    pidgin: "Money dey locked inside escrow — safe from everybody until conditions meet.",
    yoruba: "A ti tì owó sínú escrow — ó wà ní ààbò lọ́wọ́ àwọn ẹgbẹ́ méjèèjì títí tí àwọn ipò yóò fi pé.",
    hausa: "An kulle kuɗi a cikin escrow — amintacce daga ɓangarorin biyu har sai an cika sharuɗɗa.",
  },
  "howItWorks.s3.title": {
    english: "Confirm Delivery",
    pidgin: "Confirm Say You Receive Am",
    yoruba: "Jẹ́rìísí Ìfijìṣẹ́",
    hausa: "Tabbatar da Isarwa",
  },
  "howItWorks.s3.desc": {
    english: "Buyer confirms receipt of the product or service as expected.",
    pidgin: "Buyer go confirm say dem don receive the goods or service.",
    yoruba: "Olùrà jẹ́rìísí pé ó ti gba ọjà tàbí iṣẹ́ bí a ṣe retí.",
    hausa: "Mai saya zai tabbatar da karɓar kaya ko hidima kamar yadda ake tsammani.",
  },
  "howItWorks.s4.title": {
    english: "Seller Gets Paid",
    pidgin: "Seller Go Collect Money",
    yoruba: "Olùtajà Gba Owó",
    hausa: "Mai Sayarwa Ya Karɓi Kuɗi",
  },
  "howItWorks.s4.desc": {
    english: "Payment is released instantly to the seller. Everyone's happy.",
    pidgin: "Payment go release sharp sharp to the seller. Everybody happy.",
    yoruba: "A dá owó sílẹ̀ lẹ́sẹ̀kẹsẹ̀ sí olùtajà. Gbogbo ènìyàn ní ayọ̀.",
    hausa: "Ana sakin kuɗi nan take zuwa ga mai sayarwa. Kowa yana farin ciki.",
  },

  // Why TrustPay
  "why.label": {
    english: "Why TrustPay",
    pidgin: "Why TrustPay",
    yoruba: "Kí Nìdí TrustPay",
    hausa: "Me Ya Sa TrustPay",
  },
  "why.title": {
    english: "In Africa, trust is the biggest problem in online transactions.",
    pidgin: "For Africa, trust na the biggest wahala for online transaction.",
    yoruba: "Ní Áfíríkà, ìgbẹ́kẹ̀lé ni ìṣòro tó tóbi jù nínú ìdúnàádúrà orí ayélujára.",
    hausa: "A Afirka, amana ita ce babbar matsala a cikin mu'amaloli ta yanar gizo.",
  },
  "why.desc": {
    english: "TrustPay eliminates the fear of being scammed by holding funds securely until both parties are satisfied.",
    pidgin: "TrustPay remove the fear of scam by keeping money safe until both sides happy.",
    yoruba: "TrustPay ń mú ìbẹ̀rù ìjìbìtì kúrò nípá dídá owó dúró ní ààbò títí tí àwọn ẹgbẹ́ méjèèjì yóò fi ní ìtẹ́lọ́rùn.",
    hausa: "TrustPay yana kawar da tsoron zamba ta hanyar riƙe kuɗi lafiya har sai ɓangarorin biyu sun gamsu.",
  },
  "why.b1": {
    english: "No more scams",
    pidgin: "No more scam",
    yoruba: "Kò sí ìjìbìtì mọ́",
    hausa: "Babu ƙarin zamba",
  },
  "why.b2": {
    english: "No more fake payment alerts",
    pidgin: "No more fake alert",
    yoruba: "Kò sí ìkìlọ̀ owó irọ́ mọ́",
    hausa: "Babu ƙarin saƙon biyan kuɗi na ƙarya",
  },
  "why.b3": {
    english: "Confidence for buyers and sellers",
    pidgin: "Confidence for buyer and seller",
    yoruba: "Ìgbàgbọ́ fún àwọn olùrà àti olùtajà",
    hausa: "Amincewa ga masu saya da masu sayarwa",
  },

  // About
  "about.label": {
    english: "About",
    pidgin: "About Us",
    yoruba: "Nípa Wa",
    hausa: "Game da Mu",
  },
  "about.title": {
    english: "Our Mission",
    pidgin: "Our Mission",
    yoruba: "Iṣẹ́ Àṣàyàn Wa",
    hausa: "Manufarmu",
  },
  "about.desc": {
    english: "TrustPay is a trust infrastructure layer that ensures buyers only pay when they receive, bringing security and transparency to digital commerce in Africa.",
    pidgin: "TrustPay na trust infrastructure wey make sure say buyer only pay when dem receive, bringing security and transparency to online buying and selling for Africa.",
    yoruba: "TrustPay jẹ́ ìpele àmúgbòfinró ìgbẹ́kẹ̀lé tí ó ń ríi dájú pé àwọn olùrà san owó nìkan nígbà tí wọ́n bá gba, tí ó ń mú ààbò àti àkóyawọ́ wá sí ìṣòwò oni-nọ́mbà ní Áfíríkà.",
    hausa: "TrustPay wani tsari ne na amana wanda ke tabbatar da cewa masu saya suna biyan kuɗi ne kawai idan sun karɓa, yana kawo tsaro da gaskiya ga kasuwancin dijital a Afirka.",
  },

  // CTA
  "cta.title": {
    english: "Start Your First Secure Transaction Today",
    pidgin: "Start Your First Safe Transaction Today",
    yoruba: "Bẹ̀rẹ̀ Ìdúnàádúrà Aláàbò Àkọ́kọ́ Rẹ Lónìí",
    hausa: "Fara Ma'amalar Ka Ta Farko Mai Tsaro Yau",
  },
  "cta.desc": {
    english: "Join thousands of buyers and sellers who trust TrustPay for safe online transactions.",
    pidgin: "Join thousands of buyers and sellers wey trust TrustPay for safe online transaction.",
    yoruba: "Darapọ̀ mọ́ ẹgbẹẹgbẹ̀rún àwọn olùrà àti olùtajà tí wọ́n gbẹ́kẹ̀lé TrustPay fún ìdúnàádúrà aláàbò lórí ayélujára.",
    hausa: "Ku haɗu da dubban masu saya da masu sayarwa waɗanda suka dogara da TrustPay don mu'amaloli masu tsaro ta yanar gizo.",
  },

  // Dashboard
  "dash.transactions": {
    english: "Transactions",
    pidgin: "Transactions",
    yoruba: "Àwọn Ìdúnàádúrà",
    hausa: "Ma'amaloli",
  },
  "dash.createTx": {
    english: "Create Transaction",
    pidgin: "Create Transaction",
    yoruba: "Ṣẹ̀dá Ìdúnàádúrà",
    hausa: "Ƙirƙiri Ma'amala",
  },
  "dash.noTx": {
    english: "No transactions yet",
    pidgin: "No transaction yet",
    yoruba: "Kò sí ìdúnàádúrà kankan",
    hausa: "Babu ma'amala tukuna",
  },
  "dash.noTxSub": {
    english: "Create your first secure transaction",
    pidgin: "Create your first safe transaction",
    yoruba: "Ṣẹ̀dá ìdúnàádúrà aláàbò àkọ́kọ́ rẹ",
    hausa: "Ƙirƙiri ma'amalar ka ta farko mai tsaro",
  },
  "dash.total": {
    english: "Total Transactions",
    pidgin: "Total Transactions",
    yoruba: "Àpapọ̀ Ìdúnàádúrà",
    hausa: "Jimlar Ma'amaloli",
  },
  "dash.completed": {
    english: "Completed",
    pidgin: "Completed",
    yoruba: "Ti Parí",
    hausa: "An Kammala",
  },
  "dash.pending": {
    english: "Pending",
    pidgin: "Pending",
    yoruba: "Ń Dúró",
    hausa: "Jiran Aiki",
  },

  // Seller Dashboard
  "seller.incoming": {
    english: "Incoming Transactions",
    pidgin: "Incoming Transactions",
    yoruba: "Àwọn Ìdúnàádúrà Tí Ń Bọ̀",
    hausa: "Ma'amaloli Masu Shigowa",
  },
  "seller.earnings": {
    english: "Total Earnings",
    pidgin: "Total Money Wey Enter",
    yoruba: "Àpapọ̀ Owó Tí A Jẹ́",
    hausa: "Jimlar Kuɗin Shiga",
  },
  "seller.inEscrow": {
    english: "In Escrow",
    pidgin: "Inside Escrow",
    yoruba: "Nínú Escrow",
    hausa: "A Cikin Escrow",
  },
  "seller.disputes": {
    english: "Disputes",
    pidgin: "Wahala",
    yoruba: "Àwọn Ìjà",
    hausa: "Rikice-rikice",
  },
  "seller.noTx": {
    english: "No transactions yet",
    pidgin: "No transaction yet",
    yoruba: "Kò sí ìdúnàádúrà kankan",
    hausa: "Babu ma'amala tukuna",
  },
  "seller.noTxSub": {
    english: "Transactions from buyers will appear here",
    pidgin: "Transaction from buyers go show here",
    yoruba: "Àwọn ìdúnàádúrà láti ọ̀dọ̀ àwọn olùrà yóò hàn níbí",
    hausa: "Ma'amaloli daga masu saya za su bayyana a nan",
  },
  "seller.newPayment": {
    english: "💰 New Payment",
    pidgin: "💰 New Payment",
    yoruba: "💰 Owó Tuntun",
    hausa: "💰 Sabon Kuɗi",
  },

  // Status labels
  "status.pending": {
    english: "Pending",
    pidgin: "Pending",
    yoruba: "Ń Dúró",
    hausa: "Jiran Aiki",
  },
  "status.escrow": {
    english: "In Escrow",
    pidgin: "Inside Escrow",
    yoruba: "Nínú Escrow",
    hausa: "A Cikin Escrow",
  },
  "status.completed": {
    english: "Completed",
    pidgin: "Done",
    yoruba: "Ti Parí",
    hausa: "An Kammala",
  },
  "status.disputed": {
    english: "Disputed",
    pidgin: "Wahala",
    yoruba: "Àríyànjiyàn",
    hausa: "Rikici",
  },
};

export default translations;
