import { getSitePage } from "@/lib/content/site-pages";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const page = await getSitePage((await params).slug);
  return page
    ? NextResponse.json(page, {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=86400",
        },
      })
    : NextResponse.json(
        { message: "Không tìm thấy nội dung" },
        { status: 404 },
      );
}
