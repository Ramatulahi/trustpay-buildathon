import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Plus, Star, ArrowRight, Clock, CheckCircle, AlertTriangle, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListenButton from "@/components/ListenButton";
import LanguageDropdown from "@/components/LanguageDropdown";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      setTransactions(data || []);
      setLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const completedCount = transactions.filter((t) => t.status === "COMPLETED").length;
  const pendingCount = transactions.filter((t) => t.status !== "COMPLETED").length;

  const stats = [
    { label: t("dash.total"), value: String(transactions.length), color: "gradient-primary text-primary-foreground" },
    { label: t("dash.completed"), value: String(completedCount), color: "bg-accent/10 text-accent" },
    { label: t("dash.pending"), value: String(pendingCount), color: "bg-primary/10 text-primary" },
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
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">TrustPay</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageDropdown />
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10">
              <Star className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">Trust: 78</span>
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:block">
              {user?.email?.split("@")[0] || "User"}
            </span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-2xl p-5 ${s.color}`}>
              <p className="text-2xl md:text-3xl font-bold">{s.value}</p>
              <p className="text-xs md:text-sm opacity-80 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">{t("dash.transactions")}</h2>
            <ListenButton
              text={`${t("dash.total")}: ${transactions.length}. ${t("dash.completed")}: ${completedCount}. ${t("dash.pending")}: ${pendingCount}.`}
              size="icon"
              variant="ghost"
            />
          </div>
          <Link to="/create-transaction">
            <Button className="gradient-primary text-primary-foreground border-0">
              <Plus className="w-4 h-4 mr-2" /> {t("dash.createTx")}
            </Button>
          </Link>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">{t("dash.noTx")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("dash.noTxSub")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => {
              const config = statusConfig[tx.status as TxStatus] || statusConfig.PENDING;
              const Icon = config.icon;
              return (
                <Link
                  to={`/transaction/${tx.id}`}
                  key={tx.id}
                  className="flex items-center justify-between bg-card rounded-xl p-4 border border-border hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.seller_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">₦{Number(tx.amount).toLocaleString()}</p>
                      <span className={`text-xs font-medium ${config.color} px-2 py-0.5 rounded-full`}>
                        {config.label}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Education Section */}
        <div className="mt-8">
          <EducationCards role="buyer" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
