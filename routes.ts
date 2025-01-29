/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/verify-email"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to the /settings page.
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/reset-password",
];

/**
 * An array of routes that are protected.
 * These routes require authentication.
 * @type {string[]}
 */

export const protectedRoutes = ["/settings"];

/**
 * The prefix for API Authentication routes.
 * Routes that start with this prefix are used for API Authentication.
 * @type {string}
 */

export const apiAuthRoutePrefix = "/api/auth";

/**
 * Default login path after a user logs in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
