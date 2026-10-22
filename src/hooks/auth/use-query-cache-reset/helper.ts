import { useAuth as useClerkAuth } from '@clerk/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

/** Drops every cached query when the signed-in user signs out or changes, so the next
 *  person on this browser never sees the previous user's data. */
export function useQueryCacheReset() {
  const { userId } = useClerkAuth();
  const queryClient = useQueryClient();
  const previous = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (userId === undefined) return;
    if (previous.current && previous.current !== userId) queryClient.clear();
    previous.current = userId;
  }, [queryClient, userId]);
}
