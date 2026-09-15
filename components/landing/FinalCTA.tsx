import { ArrowRight } from "./icons";

export function FinalCTA() {
  return (
    <section
      id="get-started"
      className="border-y border-[var(--border)] bg-[#0e1117] py-24 text-center lg:py-28"
    >
      <div className="section-shell">
        <span className="eyebrow">Ready when you are</span>

        <h2 className="mx-auto mt-5 max-w-[650px] text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
          Let your teammate handle the conversations.
        </h2>

        <p className="mx-auto mt-5 max-w-[510px] text-base leading-7 text-[var(--secondary)]">
          Spend less time replying to “Hello, is this still available?” and
          more time talking to people who are actually ready to buy.
        </p>

        <a
          className="button-primary mt-8"
          href="/sign-up"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}