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
    const { userId, redirectToSignIn } = auth;

    // NOT logged in AND trying to access protected route
    if (!userId && isProtectedRoute(req)) {
      return redirectToSignIn({
        returnBackUrl: req.url,
      });
    }

    // Logged in user or public route → allow
    return;
  },
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)",
  ],
};
