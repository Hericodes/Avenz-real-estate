"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export function SignInForm() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: "/app",
    });

    if (result?.error) {
      setError("The email or password is incorrect.");
      setIsSubmitting(false);
      return;
    }

    window.location.href = result?.url ?? "/app";
  }

  return <form className="auth-form" onSubmit={handleSubmit}>
    <label htmlFor="email">Email</label>
    <input id="email" name="email" type="email" autoComplete="email" required />
    <label htmlFor="password">Password</label>
    <input id="password" name="password" type="password" autoComplete="current-password" required />
    {error && <p className="auth-error" role="alert">{error}</p>}
    <button className="button-primary auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign in"}</button>
  </form>;
}