export type LeadInput = {
  message: string;
  propertyType?: string | null;
  location?: string | null;
  budget?: string | null;
  intent?: string | null;
  timeline?: string | null;
};

export type LeadScoreResult = {
  score: number;
  status: "new" | "serious" | "follow_up";
  reasons: string[];
};

export function scoreLead(
  input: LeadInput
): LeadScoreResult {
  let score = 0;
  const reasons: string[] = [];

  const text = input.message.toLowerCase();

  /*
   * INTENT
   */

  if (
    text.includes("buy") ||
    text.includes("purchase") ||
    text.includes("i want")
  ) {
    score += 25;
    reasons.push("Strong buying intent");
  } else if (
    text.includes("rent") ||
    text.includes("lease") ||
    text.includes("looking for")
  ) {
    score += 20;
    reasons.push("Customer is actively looking");
  }

  /*
   * BUDGET
   */

  if (
    input.budget ||
    /\b\d+(\.\d+)?\s*(m|million|k|thousand)\b/i.test(
      text
    )
  ) {
    score += 20;
    reasons.push("Budget information provided");
  }

  /*
   * LOCATION
   */

  if (input.location) {
    score += 15;
    reasons.push("Preferred location identified");
  }

  /*
   * PROPERTY TYPE
   */

  if (input.propertyType) {
    score += 15;
    reasons.push("Property requirement identified");
  }

  /*
   * TIMELINE
   */

  if (input.timeline) {
    score += 15;
    reasons.push("Purchase or rental timeline identified");
  }

  /*
   * DIRECT ACTION SIGNALS
   */

  if (
    text.includes("available") ||
    text.includes("inspection") ||
    text.includes("viewing") ||
    text.includes("visit") ||
    text.includes("schedule")
  ) {
    score += 20;
    reasons.push("Customer is showing immediate action");
  }

  /*
   * CAP SCORE
   */

  score = Math.min(score, 100);

  /*
   * LEAD STATUS
   */

  let status: LeadScoreResult["status"];

  if (score >= 60) {
    status = "serious";
  } else if (score >= 30) {
    status = "follow_up";
  } else {
    status = "new";
  }

  return {
    score,
    status,
    reasons,
  };
}