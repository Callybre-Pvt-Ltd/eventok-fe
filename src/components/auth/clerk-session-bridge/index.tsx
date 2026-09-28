/**
 * ClerkSessionBridge
 *
 * Silently syncs the Supabase `users` table whenever Clerk is signed in but no
 * EventOK session has been established yet (e.g. first-ever login, tab closed
 * between /sso-callback and /auth/continue, or a fresh device).
 *
 * Pattern mirrors the aahaar ClerkSessionBridge:
 *   aahaar-fe/src/lib/auth/clerk-session-bridge.tsx
 *
 * Mount this component inside <AuthProvider> so it can access the auth context.
 */

import { useEffect, useRef } from 'react';
import { useAuth as useClerkAuth } from '@clerk/react';
import { peekAuthIntent } from '@/utils/auth/post-auth';
import { authService } from '@/services';
import type { UserRole } from '@/types';

interface Props {
  /** Called with the synced session after a successful upsert. */
  onSynced: (role: UserRole) => void;
  /** Pass true while the parent auth context is loading its own session. */
  sessionReady: boolean;
}

const MAX_RETRIES = 5;
const BASE_DELAY_MS = 800;

export function ClerkSessionBridge({ onSynced, sessionReady }: Props) {
  const { isLoaded, isSignedIn, getToken } = useClerkAuth();
  const syncedRef = useRef(false);

  useEffect(() => {
    // Only run when Clerk is fully loaded, user is signed in,
    // but no EventOK session exists yet.
    if (!isLoaded || !isSignedIn || sessionReady) return;

    // Reset on sign-in state change so a new sign-in always retries.
    syncedRef.current = false;

    let cancelled = false;

    const attemptSync = async () => {
      const role: UserRole =
        peekAuthIntent() === 'vendor' ? 'vendor' : 'customer';

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        if (cancelled || syncedRef.current) return;

        try {
          const token = await getToken({ skipCache: attempt > 0 });
          if (!token) return; // Clerk signed out mid-flight

          await authService.syncClerk(token, role);
          if (!cancelled) {
            syncedRef.current = true;
            onSynced(role);
          }
          return;
        } catch (err) {
          if (attempt < MAX_RETRIES - 1) {
            const delay = BASE_DELAY_MS * (attempt + 1);
            await new Promise(r => setTimeout(r, delay));
          } else {
            // All retries exhausted — log but don't crash the UI.
            console.error(
              '[ClerkSessionBridge] Sync failed after max retries:',
              err,
            );
          }
        }
      }
    };

    void attemptSync();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn, sessionReady, getToken, onSynced]);

  // Renders nothing — purely a side-effect component.
  return null;
}
