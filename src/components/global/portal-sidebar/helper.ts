import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import {
  LayoutDashboard,
  Calendar,
  User,
  Wrench,
  IndianRupee,
  Users,
  Store,
  PackagePlus,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import type { UserRole } from '@/types';

export interface NavItem {
  path: string;
  labelKey: string;
  icon: LucideIcon;
}

const vendorNav: NavItem[] = [
  {
    path: ROUTES.VENDOR_DASHBOARD,
    labelKey: 'vendor.dashboard',
    icon: LayoutDashboard,
  },
  { path: ROUTES.VENDOR_SERVICES, labelKey: 'vendor.services', icon: Wrench },
  {
    path: ROUTES.VENDOR_PACKAGES,
    labelKey: 'vendor.packages',
    icon: PackagePlus,
  },
  { path: ROUTES.VENDOR_BOOKINGS, labelKey: 'vendor.bookings', icon: Calendar },
  {
    path: ROUTES.VENDOR_EARNINGS,
    labelKey: 'vendor.earnings',
    icon: IndianRupee,
  },
  { path: ROUTES.VENDOR_PROFILE, labelKey: 'vendor.profile', icon: User },
];

const adminNav: NavItem[] = [
  {
    path: ROUTES.ADMIN_DASHBOARD,
    labelKey: 'admin.dashboard',
    icon: LayoutDashboard,
  },
  { path: ROUTES.ADMIN_VENDORS, labelKey: 'admin.vendors', icon: Store },
  { path: ROUTES.ADMIN_SERVICES, labelKey: 'admin.services', icon: Wrench },
  { path: ROUTES.ADMIN_BOOKINGS, labelKey: 'admin.bookings', icon: Calendar },
  { path: ROUTES.ADMIN_CUSTOMERS, labelKey: 'admin.customers', icon: Users },
];

export function getNavItems(role: UserRole): NavItem[] {
  if (role === 'vendor') return vendorNav;
  return adminNav;
}

export function usePortalSidebar(role: UserRole) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useBodyScrollLock(mobileOpen);

  const navItems = useMemo(() => getNavItems(role), [role]);

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  const toggleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobile();
    };

    const onResize = () => {
      if (window.innerWidth >= 992) closeMobile();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  return {
    navItems,
    collapsed,
    mobileOpen,
    isActive,
    toggleCollapse,
    toggleMobile,
    closeMobile,
  };
}
