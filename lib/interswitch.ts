export function buildInterswitchCheckoutUrl(transactionId: string, amount: number) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const callbackUrl = `${baseUrl}/api/interswitch/callback?transactionId=${transactionId}&paymentStatus=success`;

  return `${baseUrl}/checkout-simulated?transactionId=${transactionId}&amount=${amount}&callback=${encodeURIComponent(callbackUrl)}`;
}
