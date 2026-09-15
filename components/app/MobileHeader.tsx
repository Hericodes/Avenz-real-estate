"use client";

import { Menu, Sparkles } from "@/components/landing/icons";

type MobileHeaderProps = {
  onMenuClick: () => void;
  businessName?: string;
};

export function MobileHeader({
  onMenuClick,
  businessName = "Your business",
}: MobileHeaderProps) {
  const initial =
    businessName.trim().charAt(0).toUpperCase() || "A";

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-white/[0.07] bg-[#080714]/90 px-5 backdrop-blur-xl lg:hidden">
      {/* Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/70 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-white active:scale-95"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Brand */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-3 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-purple-400/15 bg-purple-400/[0.08] text-purple-300">
          <Sparkles className="h-3.5 w-3.5" />
        </div>

        <div className="min-w-0 text-left">
          <p className="text-[12px] font-bold tracking-[0.2em] text-white">
            AVNEZ
          </p>

          <p className="max-w-[150px] truncate text-[10px] text-white/35">
            {businessName}
          </p>
        </div>
      </div>

      {/* Business avatar */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-xs font-semibold text-white/70"
        aria-label={`Business avatar for ${businessName}`}
      >
        {initial}
      </div>
    </header>
  );
}