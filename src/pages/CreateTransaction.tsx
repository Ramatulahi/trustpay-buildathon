import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Info, Loader2, Search, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MockPaymentGateway from "@/components/MockPaymentGateway";

const CreateTransaction = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sellerQuery, setSellerQuery] = useState("");
  const [sellerResults, setSellerResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [showGateway, setShowGateway] = useState(false);
  const [pendingData, setPendingData] = useState<{ amount: number; sellerEmail: string; description: string } | null>(null);

  const searchSellers = async (query: string) => {
    setSellerQuery(query);
    setSelectedSeller(null);
    if (query.trim().length < 2) {
      setSellerResults([]);
      return;
    }
    setSearching(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, business_name")
      .eq("role", "seller")
      .or(`business_name.ilike.%${query}%,full_name.ilike.%${query}%`)
      .limit(5);
    setSellerResults(data || []);
    setSearching(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const amount = Number((form.elements.namedItem("amount") as HTMLInputElement).value);
    const sellerEmail = (form.elements.namedItem("seller_email") as HTMLInputElement).value.trim();
    const description = (form.elements.namedItem("desc") as HTMLTextAreaElement).value.trim();

    if (amount <= 0) {
      toast({ title: "Invalid amount", variant: "destructive" });
      return;
    }
    if (!sellerEmail) {
      toast({ title: "Please enter the seller's email", variant: "destructive" });
      return;
    }

    // Show mock payment gateway
    setPendingData({ amount, sellerEmail, description });
    setShowGateway(true);
  };

  const handlePaymentSuccess = async () => {
    if (!pendingData) return;
    setShowGateway(false);
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Please log in first", variant: "destructive" });
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        buyer_id: user.id,
        amount: pendingData.amount,
        seller_email: pendingData.sellerEmail,
        seller_name: selectedSeller?.business_name || selectedSeller?.full_name || pendingData.sellerEmail.split("@")[0],
        description: pendingData.description,
        status: "ESCROW",
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error creating transaction", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "Transaction created!", description: "Payment verified. Funds are now held in escrow." });
    navigate(`/transaction/${data.id}`);
  };

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
        <h1 className="text-2xl font-bold text-foreground mb-1">Create Transaction</h1>
        <p className="text-sm text-muted-foreground mb-8">Set up a new secure escrow transaction</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="amount">Amount (₦)</Label>
            <Input id="amount" name="amount" type="number" placeholder="e.g. 50000" required className="mt-1" min="1" />
          </div>

          {/* Seller search */}
          <div>
            <Label>Find Seller (by name or business)</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by business name..."
                value={sellerQuery}
                onChange={(e) => searchSellers(e.target.value)}
                className="pl-9"
              />
              {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />}
            </div>
            {sellerResults.length > 0 && !selectedSeller && (
              <div className="mt-1 bg-card border border-border rounded-xl overflow-hidden">
                {sellerResults.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelectedSeller(s);
                      setSellerQuery(s.business_name || s.full_name);
                      setSellerResults([]);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                  >
                    <Store className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.business_name || s.full_name}</p>
                      {s.business_name && <p className="text-xs text-muted-foreground">{s.full_name}</p>}
                    </div>
                  </button>
                ))}
              </div>
            )}
            {selectedSeller && (
              <p className="text-xs text-accent mt-1">✓ Seller selected: {selectedSeller.business_name || selectedSeller.full_name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="seller_email">Seller Email</Label>
            <Input id="seller_email" name="seller_email" type="email" placeholder="seller@email.com" required className="mt-1" />
            <p className="text-xs text-muted-foreground mt-1">Enter the seller's registered email for payment routing</p>
          </div>

          <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" name="desc" placeholder="What are you paying for?" required className="mt-1" />
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
            <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">Payment will be processed through our secure gateway. Funds will only be released after you confirm delivery.</p>
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</> : "Proceed to Payment"}
          </Button>
        </form>
      </main>

      {/* Mock Payment Gateway */}
      {showGateway && pendingData && (
        <MockPaymentGateway
          amount={pendingData.amount}
          sellerName={selectedSeller?.business_name || selectedSeller?.full_name || pendingData.sellerEmail}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setShowGateway(false)}
        />
      )}
    </div>
  );
};

export default CreateTransaction;
