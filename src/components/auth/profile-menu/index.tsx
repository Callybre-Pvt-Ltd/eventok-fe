import { useEffect, useId, useRef, useState } from 'react';
import { useUser } from '@clerk/react';
import { LogOut, Package, Shield, Store, User } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { getPostAuthPath } from '@/utils/auth/post-auth';
import { getRoleLabel } from '@/utils/auth/roles';
import {
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemButton,
  MenuPanel,
  MenuRoot,
  AvatarCircle,
  AvatarImage,
  MenuEmail,
  MenuRole,
} from './styled';

function resolveEmail(
  sessionEmail: string | undefined,
  clerkUser: ReturnType<typeof useUser>['user'],
): string {
  return (
    sessionEmail ||
    clerkUser?.primaryEmailAddress?.emailAddress ||
    clerkUser?.emailAddresses?.[0]?.emailAddress ||
    ''
  );
}

/** Compact circle — click to see email / portals / logout. */
export function ProfileMenu({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const { session, isSignedIn, logout } = useAuth();
  const { user: clerkUser, isLoaded: clerkUserLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!isSignedIn) return null;

  const user = session?.user;
  const role = user?.role;
  const email = resolveEmail(user?.email, clerkUser);
  const letter = (email.trim()[0] || 'U').toUpperCase();
  const avatarUrl =
    clerkUserLoaded && clerkUser?.hasImage ? clerkUser.imageUrl : null;
  const isVendor =
    role === 'vendor' ||
    (role === 'admin' && Boolean(user?.vendorId || user?.vendorStatus));
  const vendorPath = isVendor
    ? getPostAuthPath('vendor', user?.vendorStatus)
    : ROUTES.VENDOR_PENDING;

  return (
    <MenuRoot ref={rootRef}>
      <MenuButton
        type="button"
        $tone={tone}
        $compact
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={email ? `Account ${email}` : 'Account menu'}
        onClick={() => setOpen(value => !value)}
      >
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="" aria-hidden />
        ) : (
          <AvatarCircle aria-hidden>{letter}</AvatarCircle>
        )}
      </MenuButton>

      {open ? (
        <MenuPanel id={menuId} role="menu">
          <MenuEmail>
            {email || (clerkUserLoaded ? 'No email on account' : 'Loading…')}
          </MenuEmail>
          {role ? (
            <MenuRole>{getRoleLabel(role, user?.vendorStatus)}</MenuRole>
          ) : null}

          {role === 'admin' ? (
            <MenuItem
              role="menuitem"
              to={ROUTES.ADMIN_DASHBOARD}
              onClick={() => setOpen(false)}
            >
              <Shield size={16} aria-hidden />
              Super admin
            </MenuItem>
          ) : null}

          {isVendor ? (
            <MenuItem
              role="menuitem"
              to={vendorPath}
              onClick={() => setOpen(false)}
            >
              <Store size={16} aria-hidden />
              Vendor
            </MenuItem>
          ) : null}

          {role === 'customer' ? (
            <>
              <MenuItem
                role="menuitem"
                to={ROUTES.CUSTOMER_BOOKINGS}
                onClick={() => setOpen(false)}
              >
                <Package size={16} aria-hidden />
                My bookings
              </MenuItem>
              <MenuItem
                role="menuitem"
                to={ROUTES.CUSTOMER_PROFILE}
                onClick={() => setOpen(false)}
              >
                <User size={16} aria-hidden />
                My account
              </MenuItem>
            </>
          ) : null}

          <MenuDivider />
          <MenuItemButton
            role="menuitem"
            type="button"
            onClick={() => {
              setOpen(false);
              void logout();
            }}
          >
            <LogOut size={16} aria-hidden />
            Logout
          </MenuItemButton>
        </MenuPanel>
      ) : null}
    </MenuRoot>
  );
}
