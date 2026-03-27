import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { BrandMark } from "@/components/BrandMark";
import { SignUpForm } from "./sign-up-form";

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="tp-shell flex flex-1 flex-col justify-center">
      <BrandMark />

      <section className="tp-card">
        <div>
          <h1 className="tp-title">Create your account</h1>
          <p className="tp-subtitle">Join TrustPay and secure your transactions.</p>
        </div>

        <div className="tp-divider" />

        <SignUpForm />

        <p className="mt-5 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="tp-link">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
