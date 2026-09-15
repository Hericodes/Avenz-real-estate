import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";
const tones = ["Professional", "Friendly", "Professional & Friendly"] as const;
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions); const ownerId = session?.user?.id;
  if (!ownerId) return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  try { const body = await request.json(); const name = typeof body.name === "string" ? body.name.trim() : ""; const tone = typeof body.tone === "string" ? body.tone : ""; const customInstructions = typeof body.customInstructions === "string" ? body.customInstructions.trim() : "";
    if (!name || name.length > 80) return NextResponse.json({ error: "Please give your teammate a name." }, { status: 400 });
    if (!tones.includes(tone as (typeof tones)[number])) return NextResponse.json({ error: "Please choose how your teammate should sound." }, { status: 400 });
    if (customInstructions.length > 2000) return NextResponse.json({ error: "Keep the instructions under 2,000 characters." }, { status: 400 });
    const business = await prisma.business.findFirst({ where: { ownerId }, orderBy: { createdAt: "asc" } }); if (!business) return NextResponse.json({ error: "Save your business details first." }, { status: 400 });
    const teammate = await prisma.teammateSettings.upsert({ where: { businessId: business.id }, create: { businessId: business.id, name, tone, customInstructions: customInstructions || null }, update: { name, tone, customInstructions: customInstructions || null } }); return NextResponse.json({ business, teammate });
  } catch { return NextResponse.json({ error: "We couldn't save your teammate right now." }, { status: 500 }); }
}
