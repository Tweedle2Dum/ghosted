"use server";

import { upsertUser } from "@/entities/user/db";
import {
  createSessionCookie,
  destroySession,
  type SessionUser,
  verifyFirebaseToken,
} from "@/shared/lib/session";

/**
 * Server action: verifies a Firebase ID token, syncs user to database, and establishes a session.
 *
 * Called from the client after Firebase `signInWithEmailAndPassword`,
 * `signInWithPopup`, or `createUserWithEmailAndPassword` succeeds.
 *
 * Flow:
 * 1. Verify the Firebase ID token against Google's public keys
 * 2. Extract user profile (id, email, name, avatar, phone)
 * 3. Upsert user in Supabase `users` table via entity DB layer
 * 4. Sign a session JWT with SESSION_SECRET
 * 5. Set an HTTP-only cookie containing the session JWT
 *
 * @param idToken - Firebase ID token from `getIdToken()`
 * @returns The session user payload
 */
export async function loginAction(idToken: string): Promise<SessionUser> {
  const user = await verifyFirebaseToken(idToken);

  await upsertUser({
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar || null,
    phone: user.phone || null,
  });

  return createSessionCookie(user);
}

/**
 * Server action: destroys the current session by clearing the cookie.
 *
 * Called from the client alongside Firebase `signOut()`.
 */
export async function logoutAction(): Promise<void> {
  await destroySession();
}
