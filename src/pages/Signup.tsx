import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ShoppingBag, Store, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [role, setRole] = useState<"buyer" | "seller" | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();

    if (password !== confirm) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password must be at least 6 characters", variant: "destructive" });
      setLoading(false);
      return;
    }

    // Check unique business name for sellers
    if (role === "seller") {
      const businessName = (form.elements.namedItem("business") as HTMLInputElement)?.value?.trim();
      if (businessName) {
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .eq("business_name", businessName)
          .maybeSingle();
        if (existing) {
          toast({ title: "Business name taken", description: "Please choose a different business name.", variant: "destructive" });
          setLoading(false);
          return;
        }
      }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role, business_name: role === "seller" ? (form.elements.namedItem("business") as HTMLInputElement)?.value?.trim() : undefined } },
    });

    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "Account created!", description: "Welcome to TrustPay." });
    navigate(role === "seller" ? "/seller-dashboard" : "/dashboard");
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 justify-center mb-10">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TrustPay</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground text-center mb-2">How will you use TrustPay?</h1>
          <p className="text-muted-foreground text-center mb-8">Select your role to get started</p>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => setRole("buyer")} className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-primary hover:shadow-md transition-all">
              <ShoppingBag className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-semibold text-foreground">Buyer</p>
              <p className="text-xs text-muted-foreground mt-1">I want to buy safely</p>
            </button>
            <button onClick={() => setRole("seller")} className="bg-card border-2 border-border rounded-2xl p-6 text-center hover:border-secondary hover:shadow-md transition-all">
              <Store className="w-8 h-8 text-secondary mx-auto mb-3" />
              <p className="font-semibold text-foreground">Seller</p>
              <p className="text-xs text-muted-foreground mt-1">I want to sell securely</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">TrustPay</span>
        </Link>
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setRole(null)} className="text-sm text-primary hover:underline">← Back</button>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">{role}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-6">Join TrustPay as a {role}</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@email.com" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+234..." className="mt-1" />
            </div>
            {role === "seller" && (
              <div>
                <Label htmlFor="business">Business Name</Label>
                <Input id="business" name="business" placeholder="Your business name" required className="mt-1" />
              </div>
            )}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" name="confirm" type="password" placeholder="••••••••" required className="mt-1" />
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating...</> : <>Create Account <ArrowRight className="ml-2 w-4 h-4" /></>}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
