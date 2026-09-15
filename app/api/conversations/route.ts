import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";
import { scoreLead } from "@/lib/engine/leadScorer";
import { generateTeammateResponse } from "@/lib/engine/teammate";

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

    const conversations =
      await prisma.conversation.findMany({
        where: {
          businessId: business.id,
        },
        include: {
          customer: {
            include: {
              leads: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

    return NextResponse.json({
      conversations,
    });
  } catch (error) {
    console.error(
      "GET /api/conversations error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load conversations.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
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

    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const channel =
      typeof body.channel === "string"
        ? body.channel.trim()
        : "web";

    const propertyType =
      typeof body.propertyType === "string"
        ? body.propertyType.trim()
        : "";

    const location =
      typeof body.location === "string"
        ? body.location.trim()
        : "";

    const budget =
      typeof body.budget === "string"
        ? body.budget.trim()
        : "";

    const intent =
      typeof body.intent === "string"
        ? body.intent.trim()
        : "";

    const timeline =
      typeof body.timeline === "string"
        ? body.timeline.trim()
        : "";

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * -------------------------------------------------------
     * FIND BUSINESS
     * -------------------------------------------------------
     */

    const business =
      await prisma.business.findFirst({
        where: {
          ownerId: session.user.id,
        },
        include: {
          teammateSettings: true,
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

    if (!business.teammateSettings) {
      return NextResponse.json(
        {
          error:
            "Your teammate has not been configured yet.",
        },
        {
          status: 400,
        }
      );
    }

    const teammate = business.teammateSettings;

    /*
     * -------------------------------------------------------
     * FIND OR CREATE CUSTOMER
     * -------------------------------------------------------
     */

    let customer = null;

    if (phone) {
      customer = await prisma.customer.findFirst({
        where: {
          businessId: business.id,
          phone,
        },
      });
    }

    if (!customer && email) {
      customer = await prisma.customer.findFirst({
        where: {
          businessId: business.id,
          email,
        },
      });
    }

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          businessId: business.id,
          name: name || null,
          phone: phone || null,
          email: email || null,
          propertyType: propertyType || null,
          location: location || null,
          budget: budget || null,
          intent: intent || null,
          timeline: timeline || null,
        },
      });
    } else {
      customer = await prisma.customer.update({
        where: {
          id: customer.id,
        },
        data: {
          ...(name ? { name } : {}),
          ...(phone ? { phone } : {}),
          ...(email ? { email } : {}),
          ...(propertyType
            ? { propertyType }
            : {}),
          ...(location ? { location } : {}),
          ...(budget ? { budget } : {}),
          ...(intent ? { intent } : {}),
          ...(timeline ? { timeline } : {}),
        },
      });
    }

    /*
     * -------------------------------------------------------
     * FIND OR CREATE CONVERSATION
     * -------------------------------------------------------
     */

    let conversation =
      await prisma.conversation.findFirst({
        where: {
          businessId: business.id,
          customerId: customer.id,
          channel,
          status: "open",
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

    if (!conversation) {
      conversation =
        await prisma.conversation.create({
          data: {
            businessId: business.id,
            customerId: customer.id,
            channel,
            status: "open",
          },
        });
    }

    /*
     * -------------------------------------------------------
     * GET CONVERSATION HISTORY
     * -------------------------------------------------------
     */

    const previousMessages =
      await prisma.message.findMany({
        where: {
          conversationId: conversation.id,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          role: true,
          content: true,
        },
      });

    /*
     * -------------------------------------------------------
     * SAVE CUSTOMER MESSAGE
     * -------------------------------------------------------
     */

    const savedMessage =
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: "user",
          content: message,
          channel,
        },
      });

    /*
     * -------------------------------------------------------
     * SCORE LEAD
     * -------------------------------------------------------
     */

    const leadResult = scoreLead({
      message,
      propertyType:
        propertyType || customer.propertyType,
      location:
        location || customer.location,
      budget:
        budget || customer.budget,
      intent:
        intent || customer.intent,
      timeline:
        timeline || customer.timeline,
    });

    /*
     * -------------------------------------------------------
     * FIND EXISTING LEAD
     * -------------------------------------------------------
     */

    const existingLead =
      await prisma.lead.findFirst({
        where: {
          businessId: business.id,
          customerId: customer.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    /*
     * -------------------------------------------------------
     * CREATE OR UPDATE LEAD
     * -------------------------------------------------------
     */

    if (existingLead) {
      await prisma.lead.update({
        where: {
          id: existingLead.id,
        },
        data: {
          score: Math.max(
            existingLead.score,
            leadResult.score
          ),
          status: leadResult.status,
          propertyType:
            propertyType ||
            customer.propertyType ||
            existingLead.propertyType ||
            null,
          location:
            location ||
            customer.location ||
            existingLead.location ||
            null,
          budget:
            budget ||
            customer.budget ||
            existingLead.budget ||
            null,
          intent:
            intent ||
            customer.intent ||
            existingLead.intent ||
            null,
          timeline:
            timeline ||
            customer.timeline ||
            existingLead.timeline ||
            null,
          notes:
            leadResult.reasons.join(" • "),
        },
      });
    } else {
      await prisma.lead.create({
        data: {
          businessId: business.id,
          customerId: customer.id,
          score: leadResult.score,
          status: leadResult.status,
          propertyType:
            propertyType ||
            customer.propertyType ||
            null,
          location:
            location ||
            customer.location ||
            null,
          budget:
            budget ||
            customer.budget ||
            null,
          intent:
            intent ||
            customer.intent ||
            null,
          timeline:
            timeline ||
            customer.timeline ||
            null,
          notes:
            leadResult.reasons.join(" • "),
        },
      });
    }

    /*
     * -------------------------------------------------------
     * GENERATE TEAMMATE RESPONSE
     * -------------------------------------------------------
     */

    const teammateResult =
      generateTeammateResponse(
        {
          businessName: business.name,
          businessType: business.businessType,
          businessLocation: business.location,
          businessDescription:
            business.description,

          teammateName: teammate.name,
          teammateTone: teammate.tone,
          customInstructions:
            teammate.customInstructions,

          customerName: customer.name,
          customerLocation:
            customer.location,
          propertyType:
            customer.propertyType,
          budget: customer.budget,
          intent: customer.intent,
          timeline: customer.timeline,

          conversationHistory: [
            ...previousMessages
              .filter(
                (
                  previousMessage
                ): previousMessage is {
                  role: "user" | "assistant";
                  content: string;
                } =>
                  previousMessage.role === "user" ||
                  previousMessage.role === "assistant"
              )
              .map((previousMessage) => ({
                role: previousMessage.role,
                content: previousMessage.content,
              })),

            {
              role: "user" as const,
              content: message,
            },
          ],
        },
        message
      );

    /*
     * -------------------------------------------------------
     * SAVE TEAMMATE RESPONSE
     * -------------------------------------------------------
     */

    const savedTeammateMessage =
      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          role: "assistant",
          content: teammateResult.message,
          channel,
        },
      });

    /*
     * -------------------------------------------------------
     * RETURN UPDATED CONVERSATION
     * -------------------------------------------------------
     */

    const updatedConversation =
      await prisma.conversation.findUnique({
        where: {
          id: conversation.id,
        },
        include: {
          customer: {
            include: {
              leads: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

    return NextResponse.json(
      {
        conversation: updatedConversation,

        messages: {
          customer: savedMessage,
          teammate: savedTeammateMessage,
        },

        lead: leadResult,

        teammate: {
          intent: teammateResult.intent,
          nextAction: teammateResult.nextAction,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/conversations error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create conversation.",
      },
      {
        status: 500,
      }
    );
  }
}