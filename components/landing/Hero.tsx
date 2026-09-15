import { ArrowRight, Flame, MessageCircle, Sparkles } from "./icons";

export function Hero() {
  return (
    <section
      id="top"
      className="section-shell grid min-h-[680px] items-center gap-16 py-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:py-24"
    >
      <div className="max-w-[570px]">
        <span className="eyebrow">Real estate sales teammate</span>

        <h1 className="mt-6 text-[clamp(2.75rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.06em]">
          Your sales teammate for real estate.
        </h1>

        <p className="mt-6 max-w-[500px] text-[17px] leading-8 text-[var(--secondary)]">
          Avnez handles customer enquiries, figures out who&apos;s serious,
          and helps your team focus on the leads that actually matter.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a className="button-primary" href="/sign-up">
            Get Started <ArrowRight className="h-4 w-4" />
          </a>

          <a className="button-secondary" href="#how-it-works">
            See How It Works
          </a>
        </div>

        <p className="mt-10 text-sm italic leading-6 text-[var(--secondary)]">
          Because replying to &apos;Hello&apos; 47 times a day isn&apos;t
          exactly a growth strategy. 
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[570px]">
        <div className="absolute -inset-5 rounded-[30px] border border-[var(--primary)]/10" />

        <div className="surface-card relative overflow-hidden p-4 shadow-2xl shadow-black/20 sm:p-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/15 text-[var(--primary)]">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold">Avnez teammate</p>
                <p className="text-[11px] text-[var(--secondary)]">
                  Working on your enquiries
                </p>
              </div>
            </div>

            <span className="flex items-center gap-2 text-[11px] text-[#22c55e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
              Online
            </span>
          </div>

          <div className="space-y-4 py-5">
            <div className="flex gap-3">
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25313b] text-[var(--secondary)]">
                <MessageCircle className="h-3.5 w-3.5" />
              </div>

              <div className="max-w-[300px] rounded-2xl rounded-tl-sm bg-[#1c222c] px-4 py-3 text-[13px] leading-5 text-[var(--foreground)]">
                Hi, I&apos;m looking for a 3 bedroom apartment in Lekki. My
                budget is around ₦80m.
              </div>
            </div>

            <div className="ml-auto flex max-w-[330px] flex-row-reverse gap-3">
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/15 text-[var(--primary)]">
                <Sparkles className="h-3.5 w-3.5" />
              </div>

              <div className="rounded-2xl rounded-tr-sm bg-[var(--primary)]/15 px-4 py-3 text-[13px] leading-5 text-[var(--foreground)]">
                Absolutely. Are you looking to buy or rent?
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--primary)]/35 bg-[var(--primary)]/[0.07] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-[#f59e0b]">
                <Flame className="h-4 w-4" />
                SERIOUS LEAD
              </div>

              <span className="rounded-full bg-[#22c55e]/10 px-2 py-1 text-[10px] font-semibold text-[#22c55e]">
                New
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[var(--secondary)]">Property type</p>
                <p className="mt-1 font-semibold">3 Bedroom Apartment</p>
              </div>

              <div>
                <p className="text-[var(--secondary)]">Location</p>
                <p className="mt-1 font-semibold">Lekki</p>
              </div>

              <div>
                <p className="text-[var(--secondary)]">Budget</p>
                <p className="mt-1 font-semibold">₦80M</p>
              </div>

              <div>
                <p className="text-[var(--secondary)]">Intent</p>
                <p className="mt-1 font-semibold">Buying soon</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs">
              <span className="text-[var(--secondary)]">
                Avnez found a serious one.
              </span>

              <ArrowRight className="h-4 w-4 text-[var(--primary)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}