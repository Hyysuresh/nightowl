import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/journal(.*)",
  "/collection(.*)",
]);

export default clerkMiddleware({
  beforeAuth: (req) => {
    // Nothing here — optional
  },
  afterAuth: (auth, req, evt) => {
    const { userId } = auth;

    // Block protected routes if not logged in
    if (!userId && isProtectedRoute(req)) {
      return auth.redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)",
  ],
};
