import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SignInForm } from "@/components/auth/SignInForm";
import { authOptions } from "@/lib/auth/options";

export default async function SignInPage() {
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
          <p className="eyebrow">Welcome back</p>

          <h1>Good to see you again.</h1>

          <p>
            Your conversations, leads, and teammate are waiting for you.
          </p>
        </div>

        <SignInForm />

        <p className="auth-switch">
          New to Avnez?{" "}
          <Link href="/sign-up">Create an account</Link>
        </p>
      </div>
    </main>
  );
}