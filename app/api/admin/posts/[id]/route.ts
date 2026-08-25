import { NextResponse } from "next/server";
import { contentDb, type Post } from "@/lib/data/admin";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const index = contentDb.posts.findIndex((item) => item.id === id);
  if (index < 0)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  contentDb.posts[index] = {
    ...contentDb.posts[index],
    ...((await request.json()) as Partial<Post>),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  return NextResponse.json(contentDb.posts[index]);
}
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  contentDb.posts = contentDb.posts.filter((item) => item.id !== id);
  return new NextResponse(null, { status: 204 });
}
