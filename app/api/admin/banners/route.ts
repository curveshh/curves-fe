import { contentDb, createId, type Banner } from "@/lib/data/admin";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(contentDb.banners);
}

export async function POST(request: Request) {
  const values = (await request.json()) as Omit<Banner, "id">;
  const banner: Banner = { ...values, id: createId("banner") };
  contentDb.banners.push(banner);
  return NextResponse.json(banner, { status: 201 });
}
