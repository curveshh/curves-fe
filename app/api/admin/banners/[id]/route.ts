import { contentDb, type Banner } from "@/lib/data/admin";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = contentDb.banners.findIndex((item) => item.id === id);
  if (index < 0)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  contentDb.banners[index] = {
    ...contentDb.banners[index],
    ...((await request.json()) as Partial<Banner>),
  };
  return NextResponse.json(contentDb.banners[index]);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  contentDb.banners = contentDb.banners.filter((item) => item.id !== id);
  return new NextResponse(null, { status: 204 });
}
