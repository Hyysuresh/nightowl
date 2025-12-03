import { NextResponse } from "next/server";

const loadClerk = () => import("@clerk/nextjs/server");
const loadArcjet = () => import("@arcjet/next");

const protectedRoutes = ["/dashboard", "/journal", "/collection"];

// -----------------------------------------------------
// MAIN MIDDLEWARE
// -----------------------------------------------------
export default async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // ---------------- ARCJET ----------------
  const { default: arcjet, createMiddleware, detectBot, shield } = await loadArcjet();

  const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
      shield({ mode: "LIVE" }),
      detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE"],
      }),
    ],
  });

  const ajResult = await createMiddleware(aj)(req);
  if (ajResult) return ajResult;

  // ---------------- CLERK ----------------
  const Clerk = await loadClerk();
  const { userId, redirectToSignIn } = await Clerk.auth();

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
}

// -----------------------------------------------------
// MATCHER CONFIG
// -----------------------------------------------------
export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)"
  ],
};
