import { NextResponse } from "next/server";

const baseURL = process.env.API_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${baseURL}/news/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Không thể lấy danh sách tin tức",
        },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("NEWS API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra",
      },
      { status: 500 },
    );
  }
}
