import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  console.log("=== MIDDLEWARE DEBUG ===");
  console.log("All cookies:", req.cookies.getAll());
  console.log("RefreshToken:", req.cookies.get("refreshToken"));

  const token = req.cookies.get("refreshToken")?.value;

  if (!token) {
    console.log("❌ No token found, redirecting...");
    return NextResponse.redirect(
      new URL("/signin?error=LOGIN_REQUIRED", req.url),
    );
  }

  console.log("✅ Token found:", token);

  try {
    const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("✅ Token verified, role:", payload.role);

    if (payload.role !== "ADMIN") {
      console.log("❌ Not admin, redirecting...");
      return NextResponse.redirect(new URL("/signin?error=NOT_ADMIN", req.url));
    }

    console.log("✅ Admin access granted");
    return NextResponse.next();
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    return NextResponse.redirect(
      new URL("/signin?error=SESSION_EXPIRED", req.url),
    );
  }
}
export const config = {
  matcher: ["/admin/:path*"],
};
