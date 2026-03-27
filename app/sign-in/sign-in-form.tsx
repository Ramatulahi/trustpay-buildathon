"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message ?? "Sign in failed.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-foreground/20 p-4">
      <div className="grid gap-2">
        <label>Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
        />
      </div>
      <div className="grid gap-2">
        <label>Password</label>
        <input
          required
          type="password"
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded-md border border-foreground/20 bg-transparent px-3 py-2"
        />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <button
        disabled={loading}
        className="rounded-md border border-foreground/20 px-4 py-2 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
