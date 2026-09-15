"use client";

import { ReactNode, useState } from "react";

import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
  businessName?: string;
};

export function AppShell({
  children,
  businessName = "Your business",
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080714] text-white">
      <Sidebar
        businessName={businessName}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="min-h-screen lg:pl-[250px]">
        <MobileHeader
          businessName={businessName}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="min-h-screen">
          <div className="mx-auto w-full max-w-[1500px] px-5 py-6 sm:px-7 lg:px-10 lg:py-9">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}