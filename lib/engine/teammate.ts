type TeammateContext = {
  businessName: string;
  businessType?: string | null;
  businessLocation?: string | null;
  businessDescription?: string | null;

  teammateName: string;
  teammateTone?: string | null;
  customInstructions?: string | null;

  customerName?: string | null;
  customerLocation?: string | null;
  propertyType?: string | null;
  budget?: string | null;
  intent?: string | null;
  timeline?: string | null;

  conversationHistory?: {
    role: "user" | "assistant";
    content: string;
  }[];
};

type TeammateResponse = {
  message: string;
  intent: string;
  nextAction: string;
};

/**
 * Builds the instruction used by the teammate engine.
 *
 * This is intentionally separated from the API route so that
 * web, WhatsApp, and future channels can all use the same brain.
 */
export function buildTeammatePrompt(
  context: TeammateContext
): string {
  const history =
    context.conversationHistory?.length
      ? context.conversationHistory
          .map(
            (item) =>
              `${item.role === "user" ? "Customer" : "Teammate"}: ${item.content}`
          )
          .join("\n")
      : "No previous conversation.";

  return `
You are ${context.teammateName}, the sales teammate for ${context.businessName}.

BUSINESS
Name: ${context.businessName}
Type: ${context.businessType || "Not specified"}
Location: ${context.businessLocation || "Not specified"}
Description: ${context.businessDescription || "Not provided"}

YOUR PERSONALITY
Tone: ${context.teammateTone || "professional"}
Custom instructions: ${
    context.customInstructions || "None"
  }

CUSTOMER
Name: ${context.customerName || "Unknown"}
Location: ${context.customerLocation || "Unknown"}
Property type: ${context.propertyType || "Unknown"}
Budget: ${context.budget || "Unknown"}
Intent: ${context.intent || "Unknown"}
Timeline: ${context.timeline || "Unknown"}

CONVERSATION
${history}

YOUR JOB
1. Understand what the customer wants.
2. Answer naturally and helpfully.
3. Never invent business information, prices, properties,
   availability, or policies.
4. If important information is missing, ask a useful question.
5. Keep responses concise and conversational.
6. Do not sound robotic.
7. Move the customer toward a useful next step.
8. If the customer shows buying intent, treat the conversation
   as a potential sales lead.
`.trim();
}

/**
 * Creates a basic teammate response.
 *
 * This first version deliberately does not call an external
 * model yet. It gives us a stable engine that we can connect
 * to the actual response provider afterward.
 */
export function generateTeammateResponse(
  context: TeammateContext,
  customerMessage: string
): TeammateResponse {
  const message = customerMessage.trim().toLowerCase();

  let intent = "general_enquiry";
  let nextAction = "continue_conversation";
  let response =
    "Thanks for reaching out. Could you tell me a little more about what you're looking for?";

  if (
    message.includes("price") ||
    message.includes("cost") ||
    message.includes("how much") ||
    message.includes("budget")
  ) {
    intent = "pricing_enquiry";
    nextAction = "collect_budget";

    response =
      "Absolutely. What budget range are you working with so I can point you in the right direction?";
  }

  if (
    message.includes("buy") ||
    message.includes("purchase") ||
    message.includes("interested") ||
    message.includes("i want")
  ) {
    intent = "purchase_intent";
    nextAction = "qualify_customer";

    response =
      "Got you. I'd be happy to help. What exactly are you looking for, and what budget range are you working with?";
  }

  if (
    message.includes("location") ||
    message.includes("where") ||
    message.includes("located")
  ) {
    intent = "location_enquiry";
    nextAction = "provide_location";

    response = context.businessLocation
      ? `We're located in ${context.businessLocation}. What are you looking for?`
      : "Sure. Which location are you interested in?";
  }

  if (
    message.includes("available") ||
    message.includes("availability") ||
    message.includes("in stock")
  ) {
    intent = "availability_enquiry";
    nextAction = "check_availability";

    response =
      "Sure. What exactly are you interested in so I can help you check availability?";
  }

  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    intent = "greeting";
    nextAction = "start_conversation";

    response = `Hi${
      context.customerName
        ? ` ${context.customerName}`
        : ""
    }! How can I help you today?`;
  }

  return {
    message: response,
    intent,
    nextAction,
  };
}