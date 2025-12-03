// A more modern, concise way to protect routes
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/journal(.*)",
  "/collection(.*)",
]);

export default clerkMiddleware((auth, req) => { // clerkMiddleware now takes a function
  if (isProtectedRoute(req)) {
    // If it's a protected route, Clerk automatically redirects 
    // to the sign-in page if not authenticated.
    auth().protect();
  }
}); 

// If you need more complex logic (like your original code), 
// you can still use the afterAuth property:
// export default clerkMiddleware({ afterAuth(auth, req) { ... } }); 

// export const config remains the same
export const config = {
  matcher: [
    "/((?!_next|.*\\..+).*)",
    "/(api|trpc)(.*)",
  ],
};
