import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";

type ConnectWhatsAppBody = {
  wabaId?: unknown;
  phoneNumberId?: unknown;
  displayPhoneNumber?: unknown;
  accessToken?: unknown;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const ownerId = session?.user?.id;

  if (!ownerId) {
    return NextResponse.json(
      {
        error: "Please sign in to continue.",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body =
      (await request.json()) as ConnectWhatsAppBody;

    const wabaId =
      typeof body.wabaId === "string"
        ? body.wabaId.trim()
        : "";

    const phoneNumberId =
      typeof body.phoneNumberId === "string"
        ? body.phoneNumberId.trim()
        : "";

    const displayPhoneNumber =
      typeof body.displayPhoneNumber === "string"
        ? body.displayPhoneNumber.trim()
        : "";

    const accessToken =
      typeof body.accessToken === "string"
        ? body.accessToken.trim()
        : "";

    if (!wabaId) {
      return NextResponse.json(
        {
          error: "WhatsApp Business Account ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!phoneNumberId) {
      return NextResponse.json(
        {
          error: "WhatsApp phone number ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "WhatsApp access token is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * FIND THE LOGGED-IN USER'S BUSINESS
     * ---------------------------------------------------------
     */

    const business =
      await prisma.business.findFirst({
        where: {
          ownerId,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

    if (!business) {
      return NextResponse.json(
        {
          error:
            "Please complete your business setup before connecting WhatsApp.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * CHECK WHETHER THIS PHONE NUMBER IS ALREADY CONNECTED
     * ---------------------------------------------------------
     */

    const existingConnection =
      await prisma.whatsAppConnection.findUnique({
        where: {
          phoneNumberId,
        },
      });

    if (
      existingConnection &&
      existingConnection.businessId !== business.id
    ) {
      return NextResponse.json(
        {
          error:
            "This WhatsApp phone number is already connected to another business.",
        },
        {
          status: 409,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * CREATE OR UPDATE WHATSAPP CONNECTION
     * ---------------------------------------------------------
     */

    const connection =
      await prisma.whatsAppConnection.upsert({
        where: {
          businessId: business.id,
        },

        create: {
          businessId: business.id,
          wabaId,
          phoneNumberId,
          displayPhoneNumber:
            displayPhoneNumber || null,
          accessToken,
          status: "connected",
        },

        update: {
          wabaId,
          phoneNumberId,
          displayPhoneNumber:
            displayPhoneNumber || null,
          accessToken,
          status: "connected",
        },
      });

    /*
     * ---------------------------------------------------------
     * RETURN SAFE DATA
     *
     * Never send the access token back to the browser.
     * ---------------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,

        connection: {
          id: connection.id,
          businessId: connection.businessId,
          wabaId: connection.wabaId,
          phoneNumberId:
            connection.phoneNumberId,
          displayPhoneNumber:
            connection.displayPhoneNumber,
          status: connection.status,
          createdAt: connection.createdAt,
          updatedAt: connection.updatedAt,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "WHATSAPP_CONNECT_ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          "We couldn't connect WhatsApp right now.",
      },
      {
        status: 500,
      }
    );
  }
}