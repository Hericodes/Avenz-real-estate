"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export function SignUpForm() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const password = String(formData.get("password") ?? "");
    const confirmation = String(formData.get("confirmation") ?? "");

    if (password !== confirmation) {
      setError("Your passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password,
      }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setError(body?.error ?? "Unable to create your account right now.");
      setIsSubmitting(false);
      return;
    }

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password,
      redirect: false,
      callbackUrl: "/app",
    });

    if (result?.error) {
      setError("Your account was created. Please sign in to continue.");
      setIsSubmitting(false);
      return;
    }

    window.location.href = result?.url ?? "/app";
  }

  return <form className="auth-form" onSubmit={handleSubmit}>
    <label htmlFor="name">Name</label>
    <input id="name" name="name" type="text" autoComplete="name" required />
    <label htmlFor="email">Email</label>
    <input id="email" name="email" type="email" autoComplete="email" required />
    <label htmlFor="password">Password</label>
    <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required />
    <label htmlFor="confirmation">Confirm password</label>
    <input id="confirmation" name="confirmation" type="password" autoComplete="new-password" minLength={8} required />
    {error && <p className="auth-error" role="alert">{error}</p>}
    <button className="button-primary auth-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Create account"}</button>
  </form>;
}