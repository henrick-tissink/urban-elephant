import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - Static files (images, etc.)
  // - Sanity Studio
  matcher: [
    "/((?!api|_next|_vercel|studio|.*\\..*).*)",
    // Enable locale detection for root
    "/",
  ],
};
