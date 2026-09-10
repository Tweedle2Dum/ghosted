import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { env } from "@/shared/env";

/**
 * Firebase application configuration object utilizing type-safe environment variables.
 */
export const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Initialized Firebase Application instance.
 * Safe for Next.js Fast Refresh and Server-Side Rendering (SSR), guarding against duplicate initialization.
 */
export const app =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

/**
 * The Firebase Authentication service instance associated with the default app.
 */
export const auth = getAuth(app);
