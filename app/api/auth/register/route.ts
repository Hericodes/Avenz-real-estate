import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSafeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = getSafeString(body.name);
    const email = getSafeString(body.email).toLowerCase();

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    // VALIDATION

    if (!name || name.length > 100) {
      return NextResponse.json(
        { error: "Enter a valid name." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email) || email.length > 254) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (password.length < 8 || password.length > 128) {
      return NextResponse.json(
        {
          error:
            "Your password must be between 8 and 128 characters.",
        },
        { status: 400 }
      );
    }

    // CHECK EXISTING ACCOUNT

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "An account with that email already exists.",
        },
        { status: 409 }
      );
    }

    // CREATE USER

    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // RESPONSE

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP_ERROR:", error);

    return NextResponse.json(
      {
        error:
          "Unable to create your account right now.",
      },
      { status: 500 }
    );
  }
}