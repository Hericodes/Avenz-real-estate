"use client";

type WhatsAppConnectionCardProps = {
  connected?: boolean;
  phoneNumber?: string | null;
};

export function WhatsAppConnectionCard({
  connected = false,
  phoneNumber = null,
}: WhatsAppConnectionCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-6 sm:p-7">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/[0.06] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/3 h-48 w-48 rounded-full bg-purple-500/[0.04] blur-3xl"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Connection information */}
        <div className="flex items-start gap-4">
          {/* WhatsApp icon */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${
              connected
                ? "border-emerald-400/15 bg-emerald-400/[0.08]"
                : "border-emerald-400/10 bg-emerald-400/[0.06]"
            }`}
          >
            <span
              className={`text-xl font-semibold ${
                connected
                  ? "text-emerald-300"
                  : "text-emerald-300/90"
              }`}
              aria-hidden="true"
            >
              W
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                WhatsApp
              </p>

              <span
                className={`rounded-full border px-2 py-0.5 text-[9px] font-medium ${
                  connected
                    ? "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-300/90"
                    : "border-amber-400/15 bg-amber-400/[0.05] text-amber-300/90"
                }`}
              >
                {connected ? "Connected" : "Not connected"}
              </span>
            </div>

            <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.025em] text-white">
              {connected
                ? "WhatsApp is connected"
                : "Connect your WhatsApp"}
            </h2>

            <p className="mt-1.5 max-w-xl text-sm leading-6 text-white/40">
              {connected && phoneNumber
                ? `Avenz is connected to ${phoneNumber} and ready to handle customer conversations.`
                : "Let Avenz handle customer conversations on WhatsApp while you focus on your business."}
            </p>
          </div>
        </div>

        {/* Action */}
        <button
          type="button"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.06] px-4 py-3 text-sm font-medium text-white transition hover:border-white/[0.14] hover:bg-white/[0.09]"
        >
          {connected ? "Manage WhatsApp" : "Connect WhatsApp"}

          <span
            aria-hidden="true"
            className="text-white/45 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </button>
      </div>
    </section>
  );
}