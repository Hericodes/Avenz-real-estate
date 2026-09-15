import Link from "next/link";

import {
  ArrowRight,
  Clock,
  MessageCircle,
  Sparkles,
} from "@/components/landing/icons";

type TeammateStatusProps = {
  name: string;
  tone: string;
  businessName: string;
  businessType?: string | null;
  location?: string | null;
  active?: boolean;
};

export function TeammateStatus({
  name,
  tone,
  businessName,
  businessType,
  location,
  active = true,
}: TeammateStatusProps) {
  return (
    <section className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-white/[0.02]">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-white/[0.07] px-5 py-6 sm:px-7 sm:py-7 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300/70">
            Your teammate
          </p>

          <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white sm:text-[22px]">
            Meet {name}
          </h2>

          <p className="mt-2 max-w-lg text-sm leading-6 text-white/35">
            A quick look at what your teammate knows and
            how they&apos;re set up.
          </p>
        </div>

        {/* Status */}
        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 ${
            active
              ? "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-300"
              : "border-white/[0.07] bg-white/[0.025] text-white/35"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              active
                ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                : "bg-white/25"
            }`}
          />

          <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
            {active ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Main card */}
      <div className="relative p-5 sm:p-7">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-500/[0.05] blur-3xl"
        />

        {/* Profile */}
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-purple-400/15 bg-purple-400/[0.08] text-purple-300">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-semibold text-white/90">
              {name}
            </h3>

            <p className="mt-1 truncate text-xs text-white/30">
              Sales Teammate · {businessName}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-white/[0.06]" />

        {/* Details */}
        <div className="grid gap-3 sm:grid-cols-3">
          {/* Conversation style */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.035]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-white/40">
              <MessageCircle className="h-4 w-4" />
            </div>

            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-white/25">
              Conversation style
            </p>

            <p className="mt-1.5 truncate text-sm font-medium text-white/70">
              {tone}
            </p>
          </div>

          {/* Business */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.035]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-white/40">
              <Sparkles className="h-4 w-4" />
            </div>

            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-white/25">
              Business
            </p>

            <p className="mt-1.5 truncate text-sm font-medium text-white/70">
              {businessType || "Not specified"}
            </p>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.035]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-white/40">
              <Clock className="h-4 w-4" />
            </div>

            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-white/25">
              Location
            </p>

            <p className="mt-1.5 truncate text-sm font-medium text-white/70">
              {location || "Not specified"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.7)]" />

              <span className="text-xs font-medium text-white/65">
                Everything looks good.
              </span>
            </div>

            <p className="mt-1.5 text-[11px] leading-5 text-white/30">
              Your teammate is configured and ready to work.
            </p>
          </div>

          <Link
            href="/app/teammate"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5 text-xs font-medium text-white/45 transition-all duration-200 hover:border-purple-400/20 hover:bg-purple-400/[0.06] hover:text-white"
          >
            Manage

            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}