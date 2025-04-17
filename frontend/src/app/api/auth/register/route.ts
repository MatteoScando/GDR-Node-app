import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const res = await fetch(`${process.env.API_BACKEND_URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 201) {
    return new NextResponse(JSON.stringify({ success: true, redirect: "/login" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new NextResponse(JSON.stringify({ success: false }), {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
