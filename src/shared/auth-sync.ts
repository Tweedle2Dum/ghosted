/**
 * State shape for the external authentication synchronization store.
 */
export interface AuthSyncState {
  /** Whether the user is currently authenticated with valid credentials */
  isAuthenticated: boolean;
  /** Whether the initial session verification check has completed */
  isInitialized: boolean;
}

/**
 * Internal state for the authentication synchronization store.
 */
let _state: AuthSyncState = {
  isAuthenticated: false,
  isInitialized: false,
};

/**
 * Set of subscriber callbacks to be notified when authentication state changes.
 */
const _listeners = new Set<() => void>();

/**
 * Observable authentication store implementing the `useSyncExternalStore` contract.
 *
 * Facilitates synchronized auth state propagation across disparate React component trees
 * and non-React modules (such as the Ky HTTP client interceptors and routing guards)
 * without incurring unnecessary re-renders.
 *
 * @example
 * ```ts
 * import { useSyncExternalStore } from "react";
 * import { authSync } from "@/shared/auth-sync";
 *
 * function AuthStatus() {
 *   const auth = useSyncExternalStore(authSync.subscribe, authSync.getSnapshot);
 *   return <span>{auth.isAuthenticated ? "Logged In" : "Logged Out"}</span>;
 * }
 * ```
 */
export const authSync = {
  /**
   * Returns the current synchronous snapshot of the authentication state.
   *
   * @returns Current immutable `AuthSyncState`.
   */
  getSnapshot(): AuthSyncState {
    return _state;
  },

  /**
   * Subscribes a listener to authentication state transitions.
   *
   * @param onStoreChange - Callback function executed whenever login or logout is emitted.
   * @returns Cleanup function that unregisters the listener.
   */
  subscribe(onStoreChange: () => void): () => void {
    _listeners.add(onStoreChange);
    return () => _listeners.delete(onStoreChange);
  },

  /**
   * Dispatches a change notification to all active subscribers.
   */
  _emit(): void {
    for (const listener of _listeners) {
      listener();
    }
  },

  /**
   * Updates state to authenticated and initialized, then notifies all subscribers.
   */
  login(): void {
    _state = { isAuthenticated: true, isInitialized: true };
    this._emit();
  },

  /**
   * Updates state to unauthenticated and initialized, then notifies all subscribers.
   */
  logout(): void {
    _state = { isAuthenticated: false, isInitialized: true };
    this._emit();
  },
};
