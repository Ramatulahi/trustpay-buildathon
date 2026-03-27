import { useState } from "react";
import { Shield, CreditCard, CheckCircle, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MockPaymentGatewayProps {
  amount: number;
  sellerName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const MockPaymentGateway = ({ amount, sellerName, onSuccess, onCancel }: MockPaymentGatewayProps) => {
  const [step, setStep] = useState<"card" | "otp" | "processing" | "success">("card");
  const [otp, setOtp] = useState("");

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    // Simulate processing
    setTimeout(() => {
      setStep("success");
      setTimeout(onSuccess, 1500);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Header - Interswitch-style */}
        <div className="bg-gradient-to-r from-[#003366] to-[#005599] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm">Interswitch Payment Gateway</span>
          </div>
          <div className="flex items-center gap-1 text-white/80">
            <Lock className="w-3 h-3" />
            <span className="text-xs">Secured</span>
          </div>
        </div>

        <div className="p-6">
          {/* Amount banner */}
          <div className="bg-muted rounded-xl p-3 mb-6 text-center">
            <p className="text-xs text-muted-foreground">Payment to <span className="font-medium text-foreground">{sellerName}</span></p>
            <p className="text-2xl font-bold text-foreground">₦{amount.toLocaleString()}</p>
          </div>

          {step === "card" && (
            <form onSubmit={handleCardSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cardNum">Card Number</Label>
                <div className="relative mt-1">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="cardNum" placeholder="5399 •••• •••• ••••" className="pl-10" required maxLength={19}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
                      e.target.value = v;
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" className="mt-1" required maxLength={5}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "");
                      if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                      e.target.value = v;
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="•••" type="password" className="mt-1" required maxLength={3} />
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#003366] hover:bg-[#004488] text-white">
                Pay ₦{amount.toLocaleString()}
              </Button>
              <button type="button" onClick={onCancel} className="w-full text-sm text-muted-foreground hover:text-foreground text-center">
                Cancel Payment
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-sm text-foreground font-medium">Enter OTP</p>
                <p className="text-xs text-muted-foreground">A 6-digit code was sent to your registered phone number</p>
              </div>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-lg tracking-widest"
                required
                minLength={4}
              />
              <Button type="submit" className="w-full bg-[#003366] hover:bg-[#004488] text-white" disabled={otp.length < 4}>
                Verify & Pay
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                <span className="text-primary cursor-pointer hover:underline">Resend OTP</span>
              </p>
            </form>
          )}

          {step === "processing" && (
            <div className="text-center py-8">
              <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
              <p className="text-sm font-medium text-foreground">Verifying payment...</p>
              <p className="text-xs text-muted-foreground mt-1">Running security checks</p>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <p className="text-lg font-bold text-foreground">Payment Successful!</p>
              <p className="text-xs text-muted-foreground mt-1">Transaction verified • Funds held in escrow</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-3 flex items-center justify-between bg-muted/30">
          <span className="text-[10px] text-muted-foreground">Powered by Interswitch (Demo Mode)</span>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">256-bit SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockPaymentGateway;
