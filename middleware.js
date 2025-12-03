import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/", 
    "/sign-in(.*)",
    "/sign-up(.*)"
  ],
});

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/journal(.*)",
    "/collection(.*)",
    "/(api|trpc)(.*)",
    "/((?!_next|.*\\..+).*)",
  ],
};
