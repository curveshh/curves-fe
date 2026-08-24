import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  if (!(await cookies()).get("refresh_token"))
    return NextResponse.json(
      { message: "Phiên đăng nhập đã hết hạn" },
      { status: 401 },
    );
  return NextResponse.json({ accessToken: `access-${crypto.randomUUID()}` });
}
