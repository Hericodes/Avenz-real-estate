import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { authOptions } from "@/lib/auth/options";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/app");
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link className="auth-logo" href="/">
          AVNEZ
        </Link>

        <div className="auth-heading">
          <p className="eyebrow">Start with your teammate</p>

          <h1>Let&apos;s get your teammate ready.</h1>

          <p>
            Create your account and we&apos;ll take it from there.
          </p>
        </div>

        <SignUpForm />

        <p className="auth-switch">
          Already have an account?{" "}
          <Link href="/sign-in">Sign in</Link>
        </p>
      </div>
    </main>
  );
}