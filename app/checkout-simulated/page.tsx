import Link from "next/link";

export default async function SimulatedCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{
    transactionId?: string;
    amount?: string;
    callback?: string;
  }>;
}) {
  const { transactionId, amount, callback } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-4 px-4 py-10">
      <h1 className="text-2xl font-semibold">Interswitch Web Checkout (Simulated)</h1>
      <p className="text-sm opacity-75">Transaction: {transactionId}</p>
      <p className="text-sm opacity-75">Amount: ₦{amount}</p>
      <a
        href={callback}
        className="rounded-md border border-foreground/20 px-4 py-2 text-center"
      >
        Complete Payment
      </a>
      <Link href="/" className="text-sm underline underline-offset-4">
        Back to Dashboard
      </Link>
    </main>
  );
}
