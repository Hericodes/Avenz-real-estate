import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { AppShell } from "@/components/app/AppShell";
import { DashboardHeader } from "@/components/app/DashboardHeader";
import { OverviewCards } from "@/components/app/OverviewCards";
import { RecentEnquiries } from "@/components/app/RecentEnquiries";
import { TeammateStatus } from "@/components/app/TeammateStatus";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";

export default async function AppPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const business = await prisma.business.findFirst({
    where: {
      ownerId: session.user.id,
    },
    include: {
      teammateSettings: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Users without a completed business setup
  // should finish onboarding first.
  if (!business || !business.teammateSettings) {
    redirect("/onboarding");
  }

  const userName =
    session.user.name ||
    session.user.email?.split("@")[0] ||
    "there";

  const teammate = business.teammateSettings;

  return (
    <AppShell businessName={business.name}>
      <div className="space-y-8">
        {/* =====================================================
            DASHBOARD HEADER
        ===================================================== */}
        <DashboardHeader
          userName={userName}
          businessName={business.name}
          businessLocation={business.location}
          teammateName={teammate.name}
        />

        {/* =====================================================
            OVERVIEW
        ===================================================== */}
        <OverviewCards
          conversations={0}
          newLeads={0}
          seriousLeads={0}
          responseRate={null}
        />

        {/* =====================================================
            MAIN DASHBOARD
        ===================================================== */}
        <div className="dashboard-main-grid">
          {/* Recent customer enquiries */}
          <RecentEnquiries enquiries={[]} />

          {/* Teammate information */}
          <TeammateStatus
            name={teammate.name}
            tone={teammate.tone}
            businessName={business.name}
            businessType={business.businessType}
            location={business.location}
            active={teammate.active}
          />
        </div>
      </div>
    </AppShell>
  );
}