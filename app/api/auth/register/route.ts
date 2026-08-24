import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name } = (await request.json()) as {
    email: string;
    name: string;
    password: string;
  };
  const response = NextResponse.json(
    {
      accessToken: `access-${crypto.randomUUID()}`,
      user: { id: "user-1", email, name },
    },
    { status: 201 },
  );
  response.cookies.set("refresh_token", `refresh-${crypto.randomUUID()}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
