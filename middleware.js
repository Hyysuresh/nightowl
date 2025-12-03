import { NextResponse } from "next/server";

// Lazy load heavy modules only when needed (reduces edge bundle size)
const loadClerk = () => import("@clerk/nextjs/server");
const loadArcjet = () => import("@arcjet/next");

// Protected routes matcher
const protectedRoutes = ["/dashboard", "/journal", "/collection"];

function isProtectedRoute(pathname) {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

export default async function middleware(req) {
  const url = new URL(req.url);

  // ----- ARCJET -----
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

  // Run Arcjet first
  const ajResult = await createMiddleware(aj)(req);
  if (ajResult) return ajResult;

  // ----- CLERK -----
  const { clerkMiddleware, createRouteMatcher } = await loadClerk();

  const matcher = createRouteMatcher([
    "/dashboard(.*)",
    "/journal(.*)",
    "/collection(.*)",
  ]);

  const clerk = clerkMiddleware(async (authFn, reqObj) => {
    const { userId, redirectToSignIn } = await authFn();

    if (!userId && matcher(reqObj)) {
      return redirectToSignIn();
    }

    return NextResponse.next();
  });

  return clerk(req);
}

// Vercel matcher (unchanged)
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
