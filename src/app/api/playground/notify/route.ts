import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  channel: z.enum(["email", "sms", "push"]),
  templateId: z.string().min(1),
  idempotencyKey: z.string().min(1),
});

export async function POST(request: Request) {
  await delay(150 + Math.random() * 200);

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      jobId: `job_${crypto.randomUUID().slice(0, 8)}`,
      status: "queued",
      channel: parsed.data.channel,
      templateId: parsed.data.templateId,
      idempotencyKey: parsed.data.idempotencyKey,
      estimatedDeliveryMs: 450,
    },
    {
      status: 202,
      headers: {
        "X-Request-Id": crypto.randomUUID(),
        "X-Idempotency-Key": parsed.data.idempotencyKey,
      },
    }
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
