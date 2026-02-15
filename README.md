This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// export async function middleware(req) {
//   const token = req.cookies.get("refreshToken")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/signin?error=LOGIN_REQUIRED", req.url));
//   }

//   try {
//     const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);

//     const { payload } = await jwtVerify(token, secret);

//     if (payload.role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/signin?error=NOT_ADMIN", req.url));
//     }

//     return NextResponse.next();
//   } catch (err) {
//     return NextResponse.redirect(new URL("/signin?error=SESSION_EXPIRED", req.url));
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
