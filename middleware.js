import { NextResponse } from "next/server";

const loadClerk = () => import("@clerk/nextjs/server");
const loadArcjet = () => import("@arcjet/next");

// Protected routes
const protectedRoutes = ["/dashboard", "/journal", "/collection"];

export default async function middleware(req) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // ---------- ARCJET ----------
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

  // Arcjet first
  const arcResult = await createMiddleware(aj)(req);
  if (arcResult) return arcResult;

  // ---------- CLERK ----------
  const { auth, redirectToSignIn } = await loadClerk().then((m) => m);

  const { userId } = await auth();

  const isProtected =
    protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)"
  ],
};
