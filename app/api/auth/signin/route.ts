import { NextRequest, NextResponse } from "next/server";
import { signToken, COOKIE_NAME, MAX_AGE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      console.error("[login] ADMIN_USERNAME or ADMIN_PASSWORD not set in env");
      return NextResponse.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const usernameMatch = username === validUsername;
    const passwordMatch = password === validPassword;

    if (!usernameMatch || !passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = await signToken({ username });

    const res = NextResponse.json({ success: true }, { status: 200 });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,           
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("[POST /api/auth/login]", error);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}