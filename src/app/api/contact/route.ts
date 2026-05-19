import { NextResponse } from "next/server";
import { z } from "zod";
import { getPrisma } from "@/lib/prisma";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const prisma = getPrisma();
    if (prisma) {
      await prisma.contactMessage.create({
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject ?? null,
          message: data.message,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Message received",
      persisted: Boolean(process.env.DATABASE_URL),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "validation_failed", details: error.flatten() },
        { status: 400 }
      );
    }
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
