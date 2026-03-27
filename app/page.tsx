import Link from "next/link";
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-12">
      <section className="space-y-3">
        <div>
          <h1 className="text-4xl font-semibold">TrustPay</h1>
          <p className="text-base opacity-80">Pay Only When You Receive.</p>
        </div>
        <p className="max-w-2xl text-sm leading-7 opacity-75">
          TrustPay is an escrow layer for digital commerce in Africa. Buyer funds are held securely
          and only released to the seller when delivery is confirmed.
        </p>
      </section>

      <section className="rounded-lg border border-foreground/20 p-4">
        <h2 className="text-lg font-semibold">How it works</h2>
        <ul className="mt-3 space-y-2 text-sm opacity-80">
          <li>1. Buyer creates a transaction and pays into escrow.</li>
          <li>2. Seller delivers the product or service.</li>
          <li>3. Buyer confirms receipt and TrustPay releases funds.</li>
        </ul>
      </section>

      <section className="flex flex-wrap gap-3">
        <Link href="/sign-up" className="rounded-md border border-foreground/20 px-4 py-2">
          Create account
        </Link>
        <Link href="/sign-in" className="rounded-md border border-foreground/20 px-4 py-2">
          Sign in
        </Link>
        <Link href="/dashboard" className="rounded-md border border-foreground/20 px-4 py-2">
          Go to dashboard
        </Link>
      </section>

      <section className="text-xs opacity-60">
        <p>Prototype: escrow flow, disputes, trust score, and transaction hash logging.</p>
      </section>
    </main>
  );
}
