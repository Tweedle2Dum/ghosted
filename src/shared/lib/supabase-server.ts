import "server-only";

import { createClient } from "@supabase/supabase-js";
import { env } from "@/shared/env";
import type { Database } from "./database.types";

/**
 * Server-only Supabase client using the secret key and strictly typed Database schema.
 *
 * Bypasses Row Level Security — all authorization is handled in our API layer
 * via session cookie verification before any Supabase call is made.
 *
 * NEVER import this module from client code.
 */
export const supabaseAdmin = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_SECRET_KEY,
);
