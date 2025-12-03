import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/journal(.*)",
  "/collection(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  // Block only if NOT logged in AND trying to access protected routes
  if (!userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)",
  ],
};
