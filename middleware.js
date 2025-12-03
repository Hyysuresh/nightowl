import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/journal(.*)",
  "/collection(.*)",
]);

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
  ],

  afterAuth(auth, req) {
    const { userId, redirectToSignUp } = auth;

    // If logged out AND trying to access protected route → go to SIGN-UP
    if (!userId && isProtectedRoute(req)) {
      return redirectToSignUp({
        returnBackUrl: req.url,
      });
    }

    // Allow all other cases
    return;
  },
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)",
  ],
};
