import { ShieldCheck } from "lucide-react";

export function BrandMark() {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300">
      <ShieldCheck className="h-3.5 w-3.5" />
      <span>TrustPay Secure Escrow</span>
    </div>
  );
}