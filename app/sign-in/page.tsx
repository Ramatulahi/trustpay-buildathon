import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { SignInForm } from "./sign-in-form";

export default async function SignInPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm opacity-75">Access your TrustPay dashboard.</p>
      </div>
      <SignInForm />
      <p className="text-sm">
        No account?{" "}
        <Link href="/sign-up" className="underline underline-offset-4">
          Create one
        </Link>
      </p>
    </main>
  );
}
