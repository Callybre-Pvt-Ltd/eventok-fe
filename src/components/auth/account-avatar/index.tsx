import { ProfileMenu } from '@/components/auth/profile-menu';

interface AccountAvatarProps {
  afterSignOutUrl?: string;
}

/** Simple profile circle (email on click) — used in portals. */
export function AccountAvatar(_props: AccountAvatarProps) {
  return <ProfileMenu tone="light" />;
}
