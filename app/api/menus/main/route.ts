import { getMainMenu } from "@/lib/content/site-pages";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET() {
  return NextResponse.json(await getMainMenu(), {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=86400" },
  });
}
