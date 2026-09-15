import {
  ArrowUpRight,
  Clock,
  Flame,
  MessageCircle,
} from "@/components/landing/icons";

type OverviewCardsProps = {
  conversations?: number;
  newLeads?: number;
  seriousLeads?: number;
  responseRate?: number | null;
};

type OverviewCard = {
  label: string;
  value: string;
  description: string;
  icon: typeof MessageCircle;
  highlighted?: boolean;
};

export function OverviewCards({
  conversations = 0,
  newLeads = 0,
  seriousLeads = 0,
  responseRate = null,
}: OverviewCardsProps) {
  const cards: OverviewCard[] = [
    {
      label: "Conversations",
      value: conversations.toString(),
      description:
        conversations === 0
          ? "No conversations yet."
          : "Customer conversations today.",
      icon: MessageCircle,
    },
    {
      label: "New leads",
      value: newLeads.toString(),
      description:
        newLeads === 0
          ? "The inbox is suspiciously quiet."
          : "New potential customers.",
      icon: ArrowUpRight,
    },
    {
      label: "Serious leads",
      value: seriousLeads.toString(),
      description:
        seriousLeads === 0
          ? "We'll flag the ones worth your time."
          : "Customers showing strong intent.",
      icon: Flame,
      highlighted: true,
    },
    {
      label: "Response rate",
      value:
        responseRate === null
          ? "—"
          : `${Math.round(responseRate)}%`,
      description:
        responseRate === null
          ? "Waiting for your first conversation."
          : "Customer response performance.",
      icon: Clock,
    },
  ];

  return (
    <section
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Workspace overview"
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.label}
            className={`group relative overflow-hidden rounded-[22px] border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
              card.highlighted
                ? "border-orange-400/20 bg-gradient-to-br from-orange-400/[0.07] via-white/[0.025] to-transparent hover:border-orange-400/30"
                : "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.13] hover:bg-white/[0.04]"
            }`}
          >
            {/* Background glow */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full blur-3xl transition-opacity duration-300 ${
                card.highlighted
                  ? "bg-orange-400/[0.10]"
                  : "bg-purple-500/[0.06] opacity-0 group-hover:opacity-100"
              }`}
            />

            <div className="relative">
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                    {card.label}
                  </p>
                </div>

                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                    card.highlighted
                      ? "border-orange-400/15 bg-orange-400/[0.08] text-orange-300"
                      : "border-white/[0.08] bg-white/[0.04] text-white/45"
                  }`}
                >
                  <Icon className="h-[17px] w-[17px]" />
                </div>
              </div>

              {/* Value */}
              <div className="mt-7 flex items-end gap-2">
                <span className="text-[2.35rem] font-semibold leading-none tracking-[-0.05em] text-white">
                  {card.value}
                </span>

                {card.highlighted && seriousLeads > 0 && (
                  <span className="mb-0.5 rounded-full border border-orange-400/15 bg-orange-400/[0.08] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-orange-300">
                    Hot
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 min-h-[40px] max-w-[220px] text-xs leading-5 text-white/35">
                {card.description}
              </p>

              {/* Bottom indicator */}
              <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    card.highlighted && seriousLeads > 0
                      ? "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.7)]"
                      : "bg-white/20"
                  }`}
                />

                <span className="text-[10px] text-white/25">
                  {card.highlighted && seriousLeads > 0
                    ? "Needs your attention"
                    : "Tracking activity"}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}