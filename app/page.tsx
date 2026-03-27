import Link from "next/link";
import { ShieldCheck, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1000px 500px at 10% -10%, #1a1a1a 0%, transparent 60%), radial-gradient(900px 500px at 100% 0%, #141414 0%, transparent 55%), #000",
          }}
        />

        <div className="mx-auto w-full max-w-3xl px-4 py-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Secure Escrow for Africa</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Pay Only When You <span className="text-neutral-400">Receive</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-neutral-400">
            TrustPay is a secure escrow layer for digital commerce. Buyer funds are locked safely
            and only released to sellers when delivery is confirmed.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-200"
            >
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center rounded-xl border border-neutral-800 px-4 py-2.5 text-sm font-medium text-neutral-200 hover:border-neutral-600 hover:bg-neutral-950/50"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            Demo: Escrow • Disputes • Trust Score • Blockchain Logging
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-800 bg-neutral-950/50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold text-white">How it works</h2>
          <p className="mt-2 text-neutral-400">Three simple steps to secure your transactions.</p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                num: "1",
                title: "Create & Pay",
                desc: "Buyer initiates a transaction and deposits funds into escrow.",
                icon: ShieldCheck,
              },
              {
                num: "2",
                title: "Deliver",
                desc: "Seller delivers the product or service to the buyer.",
                icon: CheckCircle2,
              },
              {
                num: "3",
                title: "Confirm & Release",
                desc: "Buyer confirms and funds are instantly released to seller.",
                icon: TrendingUp,
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                    {step.num}
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-neutral-800 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-white">Ready to start?</h2>
          <p className="mt-2 text-neutral-400">Create an account or explore the dashboard.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/sign-up"
              className="rounded-xl border border-white bg-white px-6 py-2.5 text-sm font-medium text-black hover:bg-neutral-200"
            >
              Create account
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-neutral-800 px-6 py-2.5 text-sm font-medium text-neutral-200 hover:border-neutral-600 hover:bg-neutral-950/50"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
