import { Inbox } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function useEmptyState(icon: LucideIcon = Inbox) {
  return { Icon: icon };
}
