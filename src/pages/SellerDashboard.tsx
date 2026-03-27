import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield, Star, LogOut, Loader2, Clock, CheckCircle, AlertTriangle,
  ArrowRight, Store, Globe, Instagram, Twitter, TrendingUp, Wallet, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageDropdown from "@/components/LanguageDropdown";
import ListenButton from "@/components/ListenButton";
import EditProfileModal from "@/components/seller/EditProfileModal";
import ReviewsList from "@/components/seller/ReviewsList";
import EducationCards from "@/components/EducationCards";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Transaction = Tables<"transactions">;
type TxStatus = "ESCROW" | "COMPLETED" | "DISPUTED" | "PENDING";

const statusConfig: Record<TxStatus, { label: string; color: string; icon: typeof Clock }> = {
  PENDING: { label: "Pending", color: "bg-muted text-muted-foreground", icon: Clock },
  ESCROW: { label: "In Escrow", color: "bg-primary/10 text-primary", icon: Clock },
  COMPLETED: { label: "Completed", color: "bg-accent/10 text-accent", icon: CheckCircle },
  DISPUTED: { label: "Disputed", color: "bg-destructive/10 text-destructive", icon: AlertTriangle },
};

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }
      setUser(user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(profileData);

      // Seller sees transactions where they are the seller (matched by email)
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("seller_email", user.email || "")
        .order("created_at", { ascending: false });

      setTransactions(data || []);
      setLoading(false);
    };
    init();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const completedCount = transactions.filter((t) => t.status === "COMPLETED").length;
  const escrowCount = transactions.filter((t) => t.status === "ESCROW").length;
  const disputedCount = transactions.filter((t) => t.status === "DISPUTED").length;
  const totalEarnings = transactions
    .filter((t) => t.status === "COMPLETED")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const escrowHeld = transactions
    .filter((t) => t.status === "ESCROW")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const trustScore = profile?.trust_score ?? 50;

  const stats = [
    { label: t("seller.earnings"), value: `₦${totalEarnings.toLocaleString()}`, icon: Wallet, color: "gradient-primary text-primary-foreground" },
    { label: t("seller.inEscrow"), value: `₦${escrowHeld.toLocaleString()}`, icon: Clock, color: "bg-primary/10 text-primary" },
    { label: t("dash.completed"), value: String(completedCount), icon: CheckCircle, color: "bg-accent/10 text-accent" },
    { label: t("seller.disputes"), value: String(disputedCount), icon: AlertCircle, color: "bg-destructive/10 text-destructive" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">TrustPay</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">Seller</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageDropdown />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10">
              <Star className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">Trust: {trustScore}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Business Profile Card */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
              <Store className="w-7 h-7 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-foreground truncate">
                {profile?.business_name || profile?.full_name || "Your Business"}
              </h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-3 mt-3">
                {profile?.instagram && (
                  <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {profile?.twitter && (
                  <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {profile?.website && (
                  <a href={profile.website} target="_blank" rel="noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {!profile?.instagram && !profile?.twitter && !profile?.website && (
                  <span className="text-xs text-muted-foreground">No socials added yet</span>
                )}
              </div>
            </div>
            <div className="text-right shrink-0 flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Trust Score</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{trustScore}</p>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full gradient-primary transition-all"
                  style={{ width: `${trustScore}%` }}
                />
              </div>
              <EditProfileModal profile={profile} onSaved={setProfile} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={`rounded-2xl p-5 ${s.color}`}>
                <Icon className="w-5 h-5 mb-2 opacity-80" />
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs opacity-80 mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">{t("seller.incoming")}</h2>
            <ListenButton
              text={`${t("seller.incoming")}: ${transactions.length}. ${t("dash.completed")}: ${completedCount}. ${t("seller.inEscrow")}: ${escrowCount}. ${t("seller.disputes")}: ${disputedCount}. ${t("seller.earnings")}: ${totalEarnings} naira.`}
              size="icon"
              variant="ghost"
            />
          </div>
          <span className="text-sm text-muted-foreground">{transactions.length} total</span>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Store className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">{t("seller.noTx")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("seller.noTxSub")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => {
              const config = statusConfig[tx.status as TxStatus] || statusConfig.PENDING;
              const Icon = config.icon;
              const isNew = tx.status === "ESCROW";
              return (
                <Link
                  to={`/transaction/${tx.id}`}
                  key={tx.id}
                  className={`flex items-center justify-between bg-card rounded-xl p-4 border transition-all group ${
                    isNew ? "border-primary/30 shadow-sm" : "border-border hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center relative`}>
                      <Icon className="w-5 h-5" />
                      {isNew && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.created_at).toLocaleDateString("en-NG", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">₦{Number(tx.amount).toLocaleString()}</p>
                      <span className={`text-xs font-medium ${config.color} px-2 py-0.5 rounded-full`}>
                        {isNew ? t("seller.newPayment") : config.label}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {user && <ReviewsList sellerId={user.id} />}

        {/* Education Section */}
        <div className="mt-8">
          <EducationCards role="seller" />
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
