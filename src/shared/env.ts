import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Validated type-safe environment configuration powered by `@t3-oss/env-nextjs` and `zod`.
 *
 * Validates client and server environment variables at build-time and runtime.
 */
export const env = createEnv({
  server: {
    /** Supabase project URL (server-side, no NEXT_PUBLIC_ prefix) */
    SUPABASE_URL: z.string().url(),
    /** Supabase secret key (bypasses RLS, server-only) */
    SUPABASE_SECRET_KEY: z.string().min(1),
    /** Secret used to sign session JWTs stored in HTTP-only cookies */
    SESSION_SECRET: z.string().min(16),
  },
  client: {
    /** Web application frontend root URL */
    NEXT_PUBLIC_APP_URL: z.string().url(),
    /** Backend REST API endpoint URL */
    NEXT_PUBLIC_API_URL: z.string().url(),

    /** Firebase API Key */
    NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
    /** Firebase Auth Domain */
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
    /** Firebase Project ID */
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
    /** Firebase Storage Bucket */
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
    /** Firebase Messaging Sender ID */
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
    /** Firebase App ID */
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),

    /** Supabase project URL (client-side) */
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    /** Supabase publishable key (safe to expose) */
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  },
});
