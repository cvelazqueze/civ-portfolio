import { NextResponse } from "next/server";

export async function GET() {
  await delay(80 + Math.random() * 120);

  return NextResponse.json(
    {
      status: "healthy",
      service: "portfolio-api",
      version: "1.0.0",
      dependencies: {
        database: process.env.DATABASE_URL ? "connected" : "not_configured",
        cache: "ok",
      },
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "X-Request-Id": crypto.randomUUID(),
        "Cache-Control": "no-store",
      },
    }
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
