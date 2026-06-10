/**
 * Auth.js v5 API Route Handler.
 *
 * Handles all authentication API routes (sign-in, sign-out, session, etc.)
 * via the [...nextauth] catch-all route pattern.
 */

import { handlers } from "@/lib/auth-config";

export const { GET, POST } = handlers;
