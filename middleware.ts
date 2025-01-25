import { auth } from "./auth";

export default auth((req) => {
  console.log("Middleware invoked");
  console.log("Request: ", req);
  console.log("Route: ", req.nextUrl.pathname);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
