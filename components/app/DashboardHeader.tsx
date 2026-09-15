import { Sparkles } from "@/components/landing/icons";

type DashboardHeaderProps = {
  userName: string;
  businessName: string;
  businessLocation?: string | null;
  teammateName: string;
};

export function DashboardHeader({
  userName,
  businessName,
  businessLocation,
  teammateName,
}: DashboardHeaderProps) {
  return (
    <header className="relative mb-8 overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-purple-500/[0.08] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-indigo-500/[0.04] blur-3xl"
      />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Welcome copy */}
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-300/80">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
            Workspace overview
          </p>

          <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-white">
            Good to see you,{" "}
            <span className="text-white/65">
              {userName}.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/45 sm:text-[15px]">
            Here&apos;s what&apos;s happening with{" "}
            <strong className="font-medium text-white/75">
              {businessName}
            </strong>
            {businessLocation && (
              <>
                {" "}
                in{" "}
                <span className="text-white/60">
                  {businessLocation}
                </span>
              </>
            )}
            .
          </p>
        </div>

        {/* Teammate status */}
        <div className="group relative shrink-0">
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-purple-400/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative flex min-w-[245px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0c0b17]/90 px-4 py-3.5 shadow-xl shadow-black/20 backdrop-blur-xl">
            {/* Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/15 bg-purple-400/[0.09] text-purple-300">
              <Sparkles className="h-4 w-4" />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                Sales teammate
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-white/90">
                {teammateName}
              </p>
            </div>

            {/* Online status */}
            <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2.5 py-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                aria-hidden="true"
              />

              <span className="text-[10px] font-medium text-emerald-300/90">
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}