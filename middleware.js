import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("refreshToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin?error=LOGIN_REQUIRED", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);

    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/signin?error=NOT_ADMIN", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/signin?error=SESSION_EXPIRED", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
