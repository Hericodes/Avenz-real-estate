import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const business = await prisma.business.findFirst({
      where: {
        ownerId: session.user.id,
      },
    });

    if (!business) {
      return NextResponse.json(
        {
          error: "Business not found.",
        },
        {
          status: 404,
        }
      );
    }

    const leads = await prisma.lead.findMany({
      where: {
        businessId: business.id,
      },
      include: {
        customer: true,
      },
      orderBy: [
        {
          score: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });

    return NextResponse.json({
      leads,
    });
  } catch (error) {
    console.error("GET /api/leads error:", error);

    return NextResponse.json(
      {
        error: "Failed to load leads.",
      },
      {
        status: 500,
      }
    );
  }
}