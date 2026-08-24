import { API } from "@/contants/api";
import { baseURL } from "@/lib/api/axios";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${baseURL}${API.BANNER}`, {
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}
