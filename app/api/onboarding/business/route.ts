import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/db/prisma";
const businessTypes = ["Real Estate", "Property Development", "Property Management", "Real Estate Agency", "Other"] as const;
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions); const ownerId = session?.user?.id;
  if (!ownerId) return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  try { const body = await request.json(); const name = typeof body.name === "string" ? body.name.trim() : ""; const location = typeof body.location === "string" ? body.location.trim() : ""; const businessType = typeof body.businessType === "string" ? body.businessType : ""; const description = typeof body.description === "string" ? body.description.trim() : "";
    if (!name || name.length > 120) return NextResponse.json({ error: "Please enter a business name." }, { status: 400 });
    if (!location || location.length > 120) return NextResponse.json({ error: "Please enter a business location." }, { status: 400 });
    if (!businessTypes.includes(businessType as (typeof businessTypes)[number])) return NextResponse.json({ error: "Please choose a business type." }, { status: 400 });
    if (description.length > 600) return NextResponse.json({ error: "Keep the description under 600 characters." }, { status: 400 });
    const current = await prisma.business.findFirst({ where: { ownerId }, orderBy: { createdAt: "asc" } }); const data = { name, location, businessType, description: description || null };
    const business = current ? await prisma.business.update({ where: { id: current.id }, data }) : await prisma.business.create({ data: { ownerId, ...data } }); return NextResponse.json({ business });
  } catch { return NextResponse.json({ error: "We couldn't save your business right now." }, { status: 500 }); }
}
