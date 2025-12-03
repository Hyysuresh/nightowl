import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
  "/dashboard(.*)",
  "/journal(.*)",
  "/collection(.*)"
]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtected(req)) {
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)"
  ],
};
