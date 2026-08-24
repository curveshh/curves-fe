import { NextResponse } from "next/server";
import { contentDb, createId, type Post } from "@/lib/data/admin";
export async function GET() {
  return NextResponse.json(contentDb.posts);
}
export async function POST(request: Request) {
  const values = (await request.json()) as Omit<Post, "id" | "updatedAt">;
  const post: Post = {
    ...values,
    id: createId("post"),
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  contentDb.posts.unshift(post);
  return NextResponse.json(post, { status: 201 });
}
