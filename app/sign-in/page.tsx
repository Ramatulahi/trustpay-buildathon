import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { BrandMark } from "@/components/BrandMark";
import { SignInForm } from "./sign-in-form";

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="tp-shell flex flex-1 flex-col justify-center">
      <BrandMark />

      <section className="tp-card">
        <div>
          <h1 className="tp-title">Welcome back</h1>
          <p className="tp-subtitle">Sign in to your TrustPay account.</p>
        </div>

        <div className="tp-divider" />

        <SignInForm />

        <p className="mt-5 text-center text-sm text-neutral-400">
          No account?{" "}
          <Link href="/sign-up" className="tp-link">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}
