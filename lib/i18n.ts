export const SUPPORTED_LANGUAGES = ["en", "pcm", "yo", "ha"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

type Dictionary = Record<string, string>;

const ENGLISH_STRINGS: Dictionary = {
  appTitle: "TrustPay",
  appSubtitle: "Pay Only When You Receive",
  dashboard: "Dashboard",
  createTransaction: "Create Transaction",
  transactionDetails: "Transaction Details",
  totalTransactions: "Total Transactions",
  activeDisputes: "Active Disputes",
  escrowFunds: "Funds in Escrow",
  amount: "Amount",
  buyerName: "Buyer Name",
  buyerEmail: "Buyer Email",
  sellerName: "Seller Name",
  sellerEmail: "Seller Email",
  create: "Create",
  payNow: "Pay",
  markDelivered: "Deliver",
  confirmReceipt: "Confirm",
  raiseDispute: "Raise Dispute",
  evidence: "Evidence",
  sellerProof: "Seller Proof",
  status: "Status",
  riskFlagged: "Risk Flagged",
  hashLogs: "Blockchain Log Hashes",
  noTransactions: "No transactions yet.",
  goToDetails: "Open",
};

const TRANSLATIONS: Record<SupportedLanguage, Dictionary> = {
  en: ENGLISH_STRINGS,
  pcm: {
    appTitle: "TrustPay",
    appSubtitle: "Pay only wen you don receive",
    dashboard: "Dashboard",
    createTransaction: "Create Transaction",
    transactionDetails: "Transaction Details",
    totalTransactions: "Total transactions",
    activeDisputes: "Active disputes",
    escrowFunds: "Money wey dey escrow",
    amount: "Amount",
    buyerName: "Buyer name",
    buyerEmail: "Buyer email",
    sellerName: "Seller name",
    sellerEmail: "Seller email",
    create: "Create",
    payNow: "Pay",
    markDelivered: "Deliver",
    confirmReceipt: "Confirm",
    raiseDispute: "Raise dispute",
    evidence: "Evidence",
    sellerProof: "Seller proof",
    status: "Status",
    riskFlagged: "Risk dey",
    hashLogs: "Blockchain log hashes",
    noTransactions: "No transaction yet.",
    goToDetails: "Open",
  },
  yo: {
    appTitle: "TrustPay",
    appSubtitle: "Sanwo nikan nigbati o ba ti gba",
    dashboard: "Dasibodu",
    createTransaction: "Da Iṣowo Sile",
    transactionDetails: "Alaye Iṣowo",
    totalTransactions: "Lapapọ iṣowo",
    activeDisputes: "Ariyanjiyan to nṣiṣẹ",
    escrowFunds: "Owo inu escrow",
    amount: "Iye",
    buyerName: "Oruko olura",
    buyerEmail: "Imeeli olura",
    sellerName: "Oruko alatuta",
    sellerEmail: "Imeeli alatuta",
    create: "Ṣẹda",
    payNow: "Sanwo",
    markDelivered: "Fi ranṣẹ",
    confirmReceipt: "Jẹrisi",
    raiseDispute: "Gbe ariyanjiyan dide",
    evidence: "Ẹri",
    sellerProof: "Ẹri alatuta",
    status: "Ipo",
    riskFlagged: "Ewu ti samisi",
    hashLogs: "Awọn hash blockchain",
    noTransactions: "Ko si iṣowo sibẹsibẹ.",
    goToDetails: "Ṣii",
  },
  ha: {
    appTitle: "TrustPay",
    appSubtitle: "Biya ne idan ka karɓa",
    dashboard: "Dashboard",
    createTransaction: "Ƙirƙiri Mu'amala",
    transactionDetails: "Bayanin Mu'amala",
    totalTransactions: "Jimlar mu'amaloli",
    activeDisputes: "Takaddama masu aiki",
    escrowFunds: "Kuɗin escrow",
    amount: "Adadi",
    buyerName: "Sunan mai siya",
    buyerEmail: "Imel ɗin mai siya",
    sellerName: "Sunan mai siyarwa",
    sellerEmail: "Imel ɗin mai siyarwa",
    create: "Ƙirƙira",
    payNow: "Biya",
    markDelivered: "Isar",
    confirmReceipt: "Tabbatar",
    raiseDispute: "Buɗe takaddama",
    evidence: "Shaida",
    sellerProof: "Shaidar mai siyarwa",
    status: "Matsayi",
    riskFlagged: "An yi alamar haɗari",
    hashLogs: "Blockchain hash logs",
    noTransactions: "Babu mu'amaloli tukuna.",
    goToDetails: "Buɗe",
  },
};

export async function translateWithYarnGPT(
  language: SupportedLanguage,
  key: keyof typeof ENGLISH_STRINGS,
) {
  return TRANSLATIONS[language][key] ?? ENGLISH_STRINGS[key];
}

export async function getTranslator(language: SupportedLanguage) {
  return {
    t: async (key: keyof typeof ENGLISH_STRINGS) =>
      translateWithYarnGPT(language, key),
  };
}

export function getDictionary(language: SupportedLanguage) {
  return TRANSLATIONS[language] ?? ENGLISH_STRINGS;
}

export function parseLanguage(value: string | undefined): SupportedLanguage {
  if (value && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)) {
    return value as SupportedLanguage;
  }

  return "en";
}

export const uiLabels = ENGLISH_STRINGS;
