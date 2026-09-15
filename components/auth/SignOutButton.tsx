"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return <button className="button-secondary auth-signout" type="button" onClick={() => signOut({ callbackUrl: "/sign-in" })}>Sign out</button>;
}