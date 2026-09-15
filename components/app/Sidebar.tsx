"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChartIcon,
  BuildingIcon,
  DashboardIcon,
  MessageCircle,
  SettingsIcon,
  UsersIcon,
  CloseIcon,
} from "@/components/landing/icons";

const navigation = [
  {
    label: "Overview",
    href: "/app",
    icon: DashboardIcon,
  },
  {
    label: "Conversations",
    href: "/app/conversations",
    icon: MessageCircle,
  },
  {
    label: "Leads",
    href: "/app/leads",
    icon: UsersIcon,
  },
  {
    label: "Teammate",
    href: "/app/teammate",
    icon: BarChartIcon,
  },
];

type SidebarProps = {
  businessName?: string;
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({
  businessName = "Your business",
  mobileOpen = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const businessInitial =
    businessName.trim().charAt(0).toUpperCase() || "A";

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-white/[0.07] bg-[#090817] transition-transform duration-300 ease-out lg:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-purple-600/[0.06] blur-3xl"
        />

        {/* Brand */}
        <div className="relative px-5 pt-6">
          <div className="flex items-center justify-between">
            <Link
              href="/app"
              onClick={onClose}
              className="text-[16px] font-bold tracking-[0.24em] text-white transition-opacity hover:opacity-75"
            >
              AVNEZ
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-white/40 transition hover:bg-white/[0.06] hover:text-white lg:hidden"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Business switcher */}
          <div className="mt-7 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-purple-400/10 bg-purple-400/[0.07] text-purple-300">
                <BuildingIcon className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/30">
                  Workspace
                </p>

                <p className="mt-1 truncate text-xs font-medium text-white/75">
                  {businessName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="relative flex-1 overflow-y-auto px-4 pt-8"
          aria-label="Workspace navigation"
        >
          <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/app"
                  ? pathname === "/app"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] transition-all duration-200 ${
                    isActive
                      ? "border border-purple-400/10 bg-purple-400/[0.08] text-white"
                      : "border border-transparent text-white/40 hover:bg-white/[0.035] hover:text-white/75"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-r-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.7)]"
                    />
                  )}

                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-purple-400/[0.10] text-purple-300"
                        : "bg-transparent text-white/30 group-hover:text-white/60"
                    }`}
                  >
                    <Icon className="h-[17px] w-[17px]" />
                  </span>

                  <span className="font-medium">
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_7px_rgba(168,85,247,0.8)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="relative border-t border-white/[0.07] px-4 pb-5 pt-4">
          <Link
            href="/app/settings"
            onClick={onClose}
            className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] transition-all ${
              pathname.startsWith("/app/settings")
                ? "border border-purple-400/10 bg-purple-400/[0.08] text-white"
                : "border border-transparent text-white/40 hover:bg-white/[0.035] hover:text-white/75"
            }`}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-colors group-hover:text-white/60">
              <SettingsIcon className="h-[17px] w-[17px]" />
            </span>

            <span className="font-medium">
              Settings
            </span>
          </Link>

          {/* Owner */}
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xs font-semibold text-white/60">
              {businessInitial}
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium text-white/45">
                Workspace owner
              </p>

              <p className="mt-1 truncate text-[10px] text-white/20">
                Account settings
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}