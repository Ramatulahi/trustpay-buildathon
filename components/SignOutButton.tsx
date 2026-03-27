"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  const onSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onSignOut}
      className="rounded-md border border-foreground/20 px-3 py-2 text-sm"
    >
      Sign out
    </button>
  );
}
