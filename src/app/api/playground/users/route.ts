import { NextResponse } from "next/server";

export async function GET() {
  await delay(100 + Math.random() * 150);

  return NextResponse.json(
    {
      data: [
        {
          id: "usr_01",
          email: "engineer@example.com",
          role: "admin",
          createdAt: "2024-06-01T00:00:00Z",
        },
        {
          id: "usr_02",
          email: "recruiter@startup.io",
          role: "viewer",
          createdAt: "2025-01-10T00:00:00Z",
        },
      ],
      pagination: { page: 1, perPage: 20, total: 2 },
    },
    {
      headers: {
        "X-Request-Id": crypto.randomUUID(),
        "Cache-Control": "public, max-age=60",
        ETag: '"users-v1"',
      },
    }
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
