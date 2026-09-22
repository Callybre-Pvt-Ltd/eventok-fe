import { Menu, X } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import type { UserRole } from '@/types';
import { AccountAvatar } from '@/components/auth/account-avatar';
import { PortalSidebar } from '@/components/global/portal-sidebar';
import { getRoleLabel } from '@/utils/auth/roles';
import { usePortalLayout } from './helper';
import {
  Content,
  Layout,
  Main,
  MenuBtn,
  RolePill,
  TopBar,
  TopBarCopy,
  TopBarEyebrow,
  TopBarTitle,
  TopBarTrailing,
} from './styled';

interface PortalLayoutProps {
  role: UserRole;
}

export function PortalLayout({ role }: PortalLayoutProps) {
  const {
    palette,
    portalLabel,
    portalEyebrow,
    navItems,
    collapsed,
    mobileOpen,
    isActive,
    toggleCollapse,
    toggleMobile,
    closeMobile,
  } = usePortalLayout(role);

  return (
    <Layout $palette={palette}>
      <PortalSidebar
        role={role}
        palette={palette}
        portalEyebrow={portalEyebrow}
        navItems={navItems}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        isActive={isActive}
        toggleCollapse={toggleCollapse}
        closeMobile={closeMobile}
      />
      <Main>
        <TopBar $palette={palette}>
          <MenuBtn
            $palette={palette}
            type="button"
            onClick={toggleMobile}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </MenuBtn>
          <TopBarCopy>
            <TopBarEyebrow>{portalEyebrow}</TopBarEyebrow>
            <TopBarTitle $palette={palette}>{portalLabel}</TopBarTitle>
          </TopBarCopy>
          <TopBarTrailing>
            <RolePill>{getRoleLabel(role)}</RolePill>
            <AccountAvatar />
          </TopBarTrailing>
        </TopBar>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Layout>
  );
}
