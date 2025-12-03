// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/journal(.*)",
  "/collection(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If user not logged in & route is protected → redirect to sign-in
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // Otherwise continue normally
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)", 
    "/(api|trpc)(.*)",
  ],
};
