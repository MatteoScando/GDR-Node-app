import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const res = await fetch(`${process.env.API_BACKEND_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 200) {
    const cookiesStore = await cookies();
    const setCookie = res.headers.get("set-cookie");

    const cookieParts = setCookie?.split(";")[0].split("=");
    if (cookieParts) {
      cookiesStore.set(cookieParts[0], cookieParts[1], {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });
    }

    return new NextResponse(JSON.stringify({ success: true, redirect: "/" }), {
      status: 200,
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
