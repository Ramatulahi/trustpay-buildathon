import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Shield, ArrowLeft, CheckCircle, Clock, CreditCard, Package, AlertTriangle, Loader2, ShieldAlert, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ReviewForm from "@/components/ReviewForm";
import { generateReceipt } from "@/lib/generateReceipt";

const timelineSteps = [
  { key: "PENDING", icon: CreditCard, label: "Payment Made" },
  { key: "ESCROW", icon: Clock, label: "In Escrow" },
  { key: "DELIVERY", icon: Package, label: "Delivery Pending" },
  { key: "COMPLETED", icon: CheckCircle, label: "Completed" },
];

const statusOrder = ["PENDING", "ESCROW", "DELIVERY", "COMPLETED"];

const TransactionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [securityAlert, setSecurityAlert] = useState<{ message: string; riskScore: number } | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        toast({ title: "Error", description: "Transaction not found", variant: "destructive" });
        navigate("/dashboard");
        return;
      }
      setTransaction(data);
      setLoading(false);

      // Look up seller user ID via database function
      if (data?.seller_email) {
        const { data: result } = await supabase.rpc("get_user_id_by_email", { _email: data.seller_email });
        if (result) setSellerId(result);
      }

      // Check if buyer already reviewed
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser && data) {
        const { data: existingReview } = await supabase
          .from("reviews")
          .select("id")
          .eq("transaction_id", data.id)
          .eq("buyer_id", currentUser.id)
          .maybeSingle();
        if (existingReview) setHasReviewed(true);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleConfirmDelivery = async () => {
    setConfirming(true);
    setSecurityAlert(null);
    try {
      const { data, error } = await supabase.functions.invoke(
        `confirm-transaction/${id}`,
        { method: "POST" }
      );

      if (error) {
        // Try to parse error body
        const errBody = typeof error === "object" && "context" in error
          ? error
          : { message: error.message };
        
        // Check if it's a security block
        if (errBody.message?.includes("Security Block") || errBody.message?.includes("High-risk")) {
          setSecurityAlert({
            message: data?.message || errBody.message || "High-risk transaction detected.",
            riskScore: data?.riskScore || 0,
          });
        } else {
          toast({
            title: "Error",
            description: data?.message || data?.error || errBody.message || "Failed to confirm delivery",
            variant: "destructive",
          });
        }
        setConfirming(false);
        return;
      }

      // Check response for security block (non-200 responses may still come through data)
      if (data?.error === "Security Block") {
        setSecurityAlert({
          message: data.message,
          riskScore: data.riskScore,
        });
        setConfirming(false);
        return;
      }

      // Success!
      toast({
        title: "✅ Funds Released!",
        description: "Security checks passed. Transaction completed successfully.",
      });
      setTransaction((prev: any) => ({ ...prev, status: "COMPLETED", delivery_confirmed: true }));
    } catch (err: any) {
      toast({ title: "Error", description: "Network error. Please try again.", variant: "destructive" });
    }
    setConfirming(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentStatusIndex = transaction.status === "ESCROW" ? 2 : statusOrder.indexOf(transaction.status);

  const statusBadge: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Pending", color: "bg-muted text-muted-foreground" },
    ESCROW: { label: "In Escrow", color: "bg-primary/10 text-primary" },
    COMPLETED: { label: "Completed", color: "bg-accent/10 text-accent" },
    DISPUTED: { label: "Disputed", color: "bg-destructive/10 text-destructive" },
  };

  const badge = statusBadge[transaction.status] || statusBadge.PENDING;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">TrustPay</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-lg">
        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">
              ₦{Number(transaction.amount).toLocaleString()}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
              {badge.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {transaction.description} • Transaction #{transaction.id.slice(0, 8)}
          </p>
          <p className="text-sm text-muted-foreground">With: {transaction.seller_name}</p>
        </div>

        {/* Security Alert */}
        {securityAlert && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 mb-6 animate-in fade-in">
            <div className="flex items-center gap-3 mb-3">
              <ShieldAlert className="w-6 h-6 text-destructive" />
              <h2 className="text-lg font-bold text-destructive">🚨 Security Alert</h2>
            </div>
            <p className="text-sm text-foreground mb-2">{securityAlert.message}</p>
            <p className="text-xs text-muted-foreground">
              Risk Score: <span className="font-bold text-destructive">{securityAlert.riskScore}/100</span>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This transaction has been flagged for manual review. Our team will contact you shortly.
            </p>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">Transaction Timeline</h2>
          <div className="space-y-4">
            {timelineSteps.map((step, i) => {
              const done = i <= currentStatusIndex;
              return (
                <div key={step.key} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${done ? "gradient-primary" : "bg-muted"}`}>
                      <step.icon className={`w-4 h-4 ${done ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-1 ${done ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-sm font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        {transaction.status === "ESCROW" && !transaction.delivery_confirmed && (
          <div className="flex gap-3">
            <Button
              className="flex-1 gradient-primary text-primary-foreground border-0"
              onClick={handleConfirmDelivery}
              disabled={confirming}
            >
              {confirming ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying Security...</>
              ) : (
                <><CheckCircle className="w-4 h-4 mr-2" /> Confirm Delivery</>
              )}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate(`/dispute/${id}`)}>
              <AlertTriangle className="w-4 h-4 mr-2" /> Report Issue
            </Button>
          </div>
        )}

        {transaction.status === "COMPLETED" && (
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 text-center">
              <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-sm font-semibold text-accent">Transaction Complete</p>
              <p className="text-xs text-muted-foreground mt-1">Funds have been released to the seller</p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => generateReceipt(transaction, user?.email || "N/A")}
            >
              <Download className="w-4 h-4 mr-2" /> Download Receipt (PDF)
            </Button>
            {!hasReviewed && sellerId && (
              <ReviewForm
                transactionId={transaction.id}
                sellerId={sellerId}
                onReviewSubmitted={() => setHasReviewed(true)}
              />
            )}
            {hasReviewed && (
              <p className="text-center text-sm text-muted-foreground">✅ You've reviewed this seller</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TransactionDetails;
