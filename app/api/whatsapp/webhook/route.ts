import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { scoreLead } from "@/lib/engine/leadScorer";
import { generateTeammateResponse } from "@/lib/engine/teammate";

const WHATSAPP_API_VERSION =
  process.env.WHATSAPP_API_VERSION || "v23.0";

const ACCESS_TOKEN =
  process.env.WHATSAPP_ACCESS_TOKEN;

const PHONE_NUMBER_ID =
  process.env.WHATSAPP_PHONE_NUMBER_ID;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken =
    process.env.WHATSAPP_VERIFY_TOKEN;

  if (
    mode === "subscribe" &&
    token === verifyToken &&
    challenge
  ) {
    return new Response(challenge, {
      status: 200,
    });
  }

  return NextResponse.json(
    {
      error: "Webhook verification failed.",
    },
    {
      status: 403,
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(
      "WHATSAPP_WEBHOOK:",
      JSON.stringify(body, null, 2)
    );

    if (
      body.object !==
      "whatsapp_business_account"
    ) {
      return NextResponse.json(
        {
          received: true,
        },
        {
          status: 200,
        }
      );
    }

    const entries = body.entry ?? [];

    for (const entry of entries) {
      const changes = entry.changes ?? [];

      for (const change of changes) {
        const value = change.value;

        if (!value?.messages) {
          continue;
        }

        for (const incomingMessage of value.messages) {
          /*
           * ---------------------------------------------------
           * ONLY HANDLE TEXT MESSAGES FOR NOW
           * ---------------------------------------------------
           */

          if (incomingMessage.type !== "text") {
            continue;
          }

          const customerPhone =
            incomingMessage.from;

          const message =
            incomingMessage.text?.body?.trim();

          if (!customerPhone || !message) {
            continue;
          }

          console.log(
            "WhatsApp message:",
            message
          );

          /*
           * ---------------------------------------------------
           * FIND BUSINESS
           * ---------------------------------------------------
           */

          const business =
            await prisma.business.findFirst({
              include: {
                teammateSettings: true,
              },
            });

          if (!business) {
            console.error(
              "No business found for WhatsApp message."
            );

            continue;
          }

          if (!business.teammateSettings) {
            console.error(
              "Teammate settings not configured."
            );

            continue;
          }

          const teammate =
            business.teammateSettings;

          /*
           * ---------------------------------------------------
           * FIND OR CREATE CUSTOMER
           * ---------------------------------------------------
           */

          let customer =
            await prisma.customer.findFirst({
              where: {
                businessId: business.id,
                phone: customerPhone,
              },
            });

          if (!customer) {
            customer =
              await prisma.customer.create({
                data: {
                  businessId: business.id,
                  phone: customerPhone,
                  name: null,
                },
              });
          }

          /*
           * ---------------------------------------------------
           * FIND OR CREATE CONVERSATION
           * ---------------------------------------------------
           */

          let conversation =
            await prisma.conversation.findFirst({
              where: {
                businessId: business.id,
                customerId: customer.id,
                channel: "whatsapp",
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
                  channel: "whatsapp",
                  status: "open",
                },
              });
          }

          /*
           * ---------------------------------------------------
           * GET CONVERSATION HISTORY
           * ---------------------------------------------------
           */

          const previousMessages =
            await prisma.message.findMany({
              where: {
                conversationId:
                  conversation.id,
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
           * ---------------------------------------------------
           * SAVE CUSTOMER MESSAGE
           * ---------------------------------------------------
           */

          await prisma.message.create({
            data: {
              conversationId:
                conversation.id,
              role: "user",
              content: message,
              channel: "whatsapp",
            },
          });

          /*
           * ---------------------------------------------------
           * SCORE LEAD
           * ---------------------------------------------------
           */

          const leadResult = scoreLead({
            message,
            propertyType:
              customer.propertyType,
            location:
              customer.location,
            budget:
              customer.budget,
            intent:
              customer.intent,
            timeline:
              customer.timeline,
          });

          /*
           * ---------------------------------------------------
           * FIND EXISTING LEAD
           * ---------------------------------------------------
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
           * ---------------------------------------------------
           * CREATE / UPDATE LEAD
           * ---------------------------------------------------
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
                notes:
                  leadResult.reasons.join(
                    " • "
                  ),
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
                  customer.propertyType ||
                  null,
                location:
                  customer.location ||
                  null,
                budget:
                  customer.budget ||
                  null,
                intent:
                  customer.intent ||
                  null,
                timeline:
                  customer.timeline ||
                  null,
                notes:
                  leadResult.reasons.join(
                    " • "
                  ),
              },
            });
          }

          /*
           * ---------------------------------------------------
           * GENERATE AVENZ TEAMMATE RESPONSE
           * ---------------------------------------------------
           */

          const teammateResult =
            generateTeammateResponse(
              {
                businessName:
                  business.name,

                businessType:
                  business.businessType,

                businessLocation:
                  business.location,

                businessDescription:
                  business.description,

                teammateName:
                  teammate.name,

                teammateTone:
                  teammate.tone,

                customInstructions:
                  teammate.customInstructions,

                customerName:
                  customer.name,

                customerLocation:
                  customer.location,

                propertyType:
                  customer.propertyType,

                budget:
                  customer.budget,

                intent:
                  customer.intent,

                timeline:
                  customer.timeline,

                conversationHistory: [
                  ...previousMessages
                    .filter(
                      (
                        previousMessage
                      ) =>
                        previousMessage.role ===
                          "user" ||
                        previousMessage.role ===
                          "assistant"
                    )
                    .map(
                      (
                        previousMessage
                      ) => ({
                        role:
                          previousMessage.role ===
                          "assistant"
                            ? "assistant"
                            : "user" as "user" | "assistant",
                        content:
                          previousMessage.content,
                      })
                    ),

                  {
                    role: "user",
                    content: message,
                  },
                ],
              },
              message
            );

          /*
           * ---------------------------------------------------
           * SAVE AVENZ RESPONSE
           * ---------------------------------------------------
           */

          await prisma.message.create({
            data: {
              conversationId:
                conversation.id,
              role: "assistant",
              content:
                teammateResult.message,
              channel: "whatsapp",
            },
          });

          /*
           * ---------------------------------------------------
           * SEND RESPONSE TO WHATSAPP
           * ---------------------------------------------------
           */

          await sendWhatsAppMessage(
            customerPhone,
            teammateResult.message
          );

          console.log(
            `Avenz replied to ${customerPhone}`
          );
        }
      }
    }

    return NextResponse.json(
      {
        received: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "WHATSAPP_WEBHOOK_ERROR:",
      error
    );

    return NextResponse.json(
      {
        received: true,
      },
      {
        status: 200,
      }
    );
  }
}

/*
 * =========================================================
 * SEND MESSAGE THROUGH WHATSAPP CLOUD API
 * =========================================================
 */

async function sendWhatsAppMessage(
  recipientPhone: string,
  message: string
) {
  if (!ACCESS_TOKEN) {
    throw new Error(
      "WHATSAPP_ACCESS_TOKEN is missing."
    );
  }

  if (!PHONE_NUMBER_ID) {
    throw new Error(
      "WHATSAPP_PHONE_NUMBER_ID is missing."
    );
  }

  const url =
    `https://graph.facebook.com/` +
    `${WHATSAPP_API_VERSION}/` +
    `${PHONE_NUMBER_ID}/messages`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      Authorization:
        `Bearer ${ACCESS_TOKEN}`,

      "Content-Type":
        "application/json",
    },

    body: JSON.stringify({
      messaging_product: "whatsapp",

      recipient_type: "individual",

      to: recipientPhone,

      type: "text",

      text: {
        preview_url: false,
        body: message,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "WHATSAPP_SEND_ERROR:",
      data
    );

    throw new Error(
      "Failed to send WhatsApp message."
    );
  }

  console.log(
    "WHATSAPP_MESSAGE_SENT:",
    data
  );

  return data;
}