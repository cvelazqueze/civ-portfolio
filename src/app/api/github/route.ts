import { NextResponse } from "next/server";
import { getGitHubStats, getMockGitHubStats } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const stats = await getGitHubStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(getMockGitHubStats());
  }
}
