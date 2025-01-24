import { auth } from "./auth";

export default auth((req) => {
  // req.auth
  console.log("Middleware Invoked");
  console.log("Request: ", req);
  console.log("Route: ", req.nextUrl.pathname);

  const isLoggedIn = !!req.auth;
  console.log("Is logged in: ", isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
