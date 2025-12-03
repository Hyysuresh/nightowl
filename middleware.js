import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/journal(.*)",
  "/collection(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // Public routes (must NOT be protected)
  const isPublicRoute = createRouteMatcher([
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)"
  ]);

  if (isPublicRoute(req)) return;

  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)",
  ],
};
