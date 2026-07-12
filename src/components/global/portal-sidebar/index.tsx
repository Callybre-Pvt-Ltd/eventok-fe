import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import type { UserRole } from '@/types';
import type { ThemePalette } from '@/theme';
import type { NavItem } from './helper';
import {
  CollapseBtn,
  LogoutBtn,
  NavItem as NavItemLink,
  NavLabel,
  NavList,
  Overlay,
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarLogo,
} from './styled';

interface PortalSidebarProps {
  role: UserRole;
  palette: ThemePalette;
  navItems: NavItem[];
  collapsed: boolean;
  mobileOpen: boolean;
  isActive: (path: string) => boolean;
  toggleCollapse: () => void;
  closeMobile: () => void;
}

export function PortalSidebar({
  palette,
  navItems,
  collapsed,
  mobileOpen,
  isActive,
  toggleCollapse,
  closeMobile,
}: PortalSidebarProps) {
  const { t } = useTranslation();
  const { logout } = useAuth();

  return (
    <>
      <Overlay $palette={palette} $visible={mobileOpen} onClick={closeMobile} />
      <Sidebar
        $palette={palette}
        $collapsed={collapsed}
        $mobileOpen={mobileOpen}
      >
        <SidebarHeader $palette={palette}>
          <SidebarLogo $palette={palette} to={ROUTES.HOME}>
            {t('common.appName')}
          </SidebarLogo>
          <CollapseBtn
            $palette={palette}
            onClick={toggleCollapse}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </CollapseBtn>
        </SidebarHeader>
        <NavList>
          {navItems.map(item => (
            <NavItemLink
              key={item.path}
              to={item.path}
              $palette={palette}
              $active={isActive(item.path)}
              onClick={closeMobile}
            >
              <item.icon size={18} />
              <NavLabel $collapsed={collapsed}>{t(item.labelKey)}</NavLabel>
            </NavItemLink>
          ))}
        </NavList>
        <SidebarFooter $palette={palette}>
          <LogoutBtn $palette={palette} onClick={() => logout()}>
            <LogOut size={16} />
            {!collapsed && t('common.logout')}
          </LogoutBtn>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
