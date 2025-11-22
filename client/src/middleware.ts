import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set([
  "/",                // homepage stays public, no forced redirect
  "/login",
  "/register",
  "/forgot-password",
]);

const PUBLIC_PREFIXES = ["/users/forget-password"]; // expects ?token=...
const MAX_REDIRECTS = 10;
const POST_LOGIN_LANDING = "/jobs"; // change to your dashboard if needed

function isPublicPath(pathname: string) {
  if (PUBLIC_ROUTES.has(pathname)) return true;
  return PUBLIC_PREFIXES.some((p) => pathname.startsWith(p));
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, searchParams } = url;

  // Skip for API/static (config.matcher also helps)
  if (pathname.startsWith("/api")) return NextResponse.next();

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const redirectCount = Number(req.cookies.get("redirectCount")?.value ?? "0");
  if (redirectCount >= MAX_REDIRECTS) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("redirectCount");
    res.cookies.delete("accessToken");
    res.cookies.delete("refreshToken");
    return res;
  }

  // Public routes
  if (isPublicPath(pathname)) {
    // Special case: token page must have token
    if (pathname.startsWith("/users/forget-password")) {
      const token = searchParams.get("token");
      if (!token) {
        return NextResponse.redirect(new URL("/forgot-password", req.url));
      }
    }

    // If authenticated:
    if (accessToken && refreshToken) {
      // If ?next= is present on any public route, honor it
      const nextParam = searchParams.get("next");
      if (nextParam) {
        return NextResponse.redirect(new URL(nextParam, req.url));
      }

      // Redirect away only from *auth* pages to landing,
      // but DO NOT redirect "/" to "/"
      const authPages = new Set(["/login", "/register", "/forgot-password"]);
      if (authPages.has(pathname)) {
        return NextResponse.redirect(new URL(POST_LOGIN_LANDING, req.url));
      }

      // Already on "/" or other public page → allow
      return NextResponse.next();
    }

    // Not authenticated on public → allow
    return NextResponse.next();
  }

  // Protected routes: require both tokens
  if (!accessToken || !refreshToken) {
    const loginURL = new URL("/login", req.url);
    const nextParam = pathname + (url.search || "");
    loginURL.searchParams.set("next", nextParam);

    const res = NextResponse.redirect(loginURL);
    res.cookies.set("redirectCount", String(redirectCount + 1), {
      maxAge: 30,
      path: "/",
    });
    return res;
  }

  // Auth present → allow and reset loop counter
  const res = NextResponse.next();
  res.cookies.delete("redirectCount");
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
