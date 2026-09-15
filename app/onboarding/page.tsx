import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  const ownerId = session?.user?.id;

  if (!ownerId) {
    redirect("/sign-in");
  }

  const business = await prisma.business.findFirst({
    where: {
      ownerId,
    },
    include: {
      teammateSettings: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <OnboardingFlow
      initialBusiness={business}
      initialTeammate={business?.teammateSettings ?? null}
    />
  );
}