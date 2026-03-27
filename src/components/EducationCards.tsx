import { useState } from "react";
import { Shield, AlertTriangle, Star, Scale, Lock, BookOpen, ChevronDown, ChevronUp, Users, TrendingUp, Banknote, MessageSquare } from "lucide-react";

const buyerTopics = [
  {
    icon: Shield,
    title: "Escrow Protection",
    color: "bg-primary/10 text-primary",
    summary: "Your money is held securely until you confirm delivery.",
    details: "When you pay through TrustPay, funds go into a secure escrow. The seller only receives payment after you confirm the product/service was delivered as promised. If there's a problem, funds stay locked until resolved.",
  },
  {
    icon: AlertTriangle,
    title: "Spot Scams Before You Pay",
    color: "bg-destructive/10 text-destructive",
    summary: "Learn the red flags of online fraud before sending money.",
    details: "Never send money directly to strangers. Always use escrow. Watch for: sellers who pressure you to pay outside the platform, deals that seem too good to be true, requests for personal banking info, and brand-new accounts with no reviews.",
  },
  {
    icon: Star,
    title: "Check Trust Scores",
    color: "bg-accent/10 text-accent",
    summary: "Always verify a seller's trust score before transacting.",
    details: "Trust scores are calculated from successful transactions (40%), reviews (30%), identity verification (20%), and account age (10%). Look for sellers with scores above 70. Low scores or no history means higher risk.",
  },
  {
    icon: Scale,
    title: "How to File a Dispute",
    color: "bg-secondary/10 text-secondary",
    summary: "Know your rights — raise a dispute if something goes wrong.",
    details: "If you don't receive what was promised, raise a dispute within 7 days. Submit evidence like screenshots and chat logs. Both parties respond, and our team reviews impartially. Your money stays safe in escrow during the process.",
  },
  {
    icon: Lock,
    title: "Protect Your Account",
    color: "bg-primary/10 text-primary",
    summary: "Keep your account safe with strong passwords and verification.",
    details: "Use a unique, strong password. Never share your OTP or login details with anyone. Always verify the seller's profile before transacting. If someone claims to be TrustPay support and asks for your password — it's a scam.",
  },
];

const sellerTopics = [
  {
    icon: Banknote,
    title: "How You Get Paid",
    color: "bg-accent/10 text-accent",
    summary: "Understand the escrow release process and when funds hit your account.",
    details: "When a buyer pays, funds are held in escrow. Once they confirm delivery, the payment is released to you. Completed transactions build your trust score and attract more buyers. Faster confirmations = faster payments.",
  },
  {
    icon: TrendingUp,
    title: "Build Your Trust Score",
    color: "bg-primary/10 text-primary",
    summary: "A high trust score means more customers and bigger deals.",
    details: "Your trust score increases with: completed transactions (+40%), positive reviews (+30%), verified identity (+20%), and account age (+10%). Disputes and complaints reduce your score. Aim for 80+ to stand out.",
  },
  {
    icon: MessageSquare,
    title: "Handling Reviews & Complaints",
    color: "bg-secondary/10 text-secondary",
    summary: "Learn how to respond to buyer feedback professionally.",
    details: "Reviews are visible to all future buyers. Respond professionally to negative reviews — it shows maturity. Deliver as promised to avoid disputes. If a buyer raises a concern, communicate clearly and provide evidence of delivery.",
  },
  {
    icon: AlertTriangle,
    title: "Avoid Fraudulent Buyers",
    color: "bg-destructive/10 text-destructive",
    summary: "Not all buyers are genuine — know the warning signs.",
    details: "Watch for: buyers who try to rush you into delivering before escrow confirms, fake payment screenshots, requests to transact outside TrustPay, and unusually large orders from brand-new accounts. Always wait for escrow confirmation.",
  },
  {
    icon: Users,
    title: "Grow Your Business on TrustPay",
    color: "bg-accent/10 text-accent",
    summary: "Tips to attract more buyers and increase your sales.",
    details: "Complete your business profile with socials and website. Maintain a high trust score by delivering on time. Ask satisfied buyers to leave reviews. Use a clear business name and description so buyers can find you easily.",
  },
];

interface EducationCardsProps {
  role?: "buyer" | "seller";
}

const EducationCards = ({ role = "buyer" }: EducationCardsProps) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const topics = role === "seller" ? sellerTopics : buyerTopics;
  const subtitle = role === "seller"
    ? "Tips to grow your business and handle transactions safely."
    : "Learn how to stay safe while transacting online.";

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">Safety Education</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
      <div className="space-y-2">
        {topics.map((topic, i) => {
          const Icon = topic.icon;
          const isOpen = expanded === i;
          return (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
              >
                <div className={`w-8 h-8 rounded-lg ${topic.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{topic.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{topic.summary}</p>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-3 pb-3 pt-0">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm text-foreground leading-relaxed">{topic.details}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EducationCards;
