import "server-only";

import { createRemoteJWKSet, type JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import type { User } from "@/entities/user";
import { env } from "@/shared/env";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FIREBASE_PROJECT_ID = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const SESSION_SECRET = env.SESSION_SECRET;
const SESSION_COOKIE_NAME = "ghosted_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const SESSION_KEY = new TextEncoder().encode(SESSION_SECRET);

/**
 * Google's public JWKS endpoint for verifying Firebase ID tokens.
 * The jose library handles fetching + caching the keys automatically
 * and respects the Cache-Control header from Google.
 */
const GOOGLE_JWKS = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  ),
);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SessionUser = User;

type FirebaseTokenPayload = JWTPayload & {
  user_id?: string;
  email?: string;
  name?: string;
  picture?: string;
  phone_number?: string;
  firebase?: {
    sign_in_provider?: string;
    identities?: Record<string, unknown>;
  };
};

// ---------------------------------------------------------------------------
// Firebase ID Token Verification
// ---------------------------------------------------------------------------

/**
 * Verifies a Firebase ID token against Google's public keys.
 *
 * Validates:
 * - JWT signature against Google's JWKS
 * - `iss` === `https://securetoken.google.com/<projectId>`
 * - `aud` === `<projectId>`
 * - Token is not expired
 *
 * @returns Decoded user claims if valid
 * @throws Error if token is invalid, expired, or malformed
 */
export async function verifyFirebaseToken(
  idToken: string,
): Promise<SessionUser> {
  const { payload } = await jwtVerify<FirebaseTokenPayload>(
    idToken,
    GOOGLE_JWKS,
    {
      issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
      audience: FIREBASE_PROJECT_ID,
    },
  );

  const uid = payload.sub || payload.user_id;
  if (!uid) {
    throw new Error("Firebase token missing user ID");
  }

  return {
    id: uid,
    email: payload.email || "",
    name: payload.name || payload.email?.split("@")[0] || "User",
    avatar: payload.picture,
    phone: payload.phone_number,
    createdAt: payload.auth_time ? Number(payload.auth_time) * 1000 : undefined,
  };
}

// ---------------------------------------------------------------------------
// Session Cookie Management
// ---------------------------------------------------------------------------

/**
 * Creates a signed session JWT and sets it as an HTTP-only cookie.
 *
 * @param user - The verified user from Firebase token
 * @returns The session user for immediate use
 */
export async function createSessionCookie(
  user: SessionUser,
): Promise<SessionUser> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    phone: user.phone,
    createdAt: user.createdAt,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .setIssuer("ghosted")
    .sign(SESSION_KEY);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return user;
}

/**
 * Reads and verifies the session cookie.
 *
 * @returns The session user if valid, or null if no cookie / invalid / expired
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    const { payload } = await jwtVerify(sessionCookie.value, SESSION_KEY, {
      issuer: "ghosted",
    });

    return {
      id: ((payload.id || payload.uid) as string) || "",
      email: (payload.email as string) || "",
      name: (payload.name as string) || "",
      avatar: (payload.avatar || payload.picture) as string | undefined,
      phone: payload.phone as string | undefined,
      createdAt: payload.createdAt as number | undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Destroys the session by clearing the session cookie.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
