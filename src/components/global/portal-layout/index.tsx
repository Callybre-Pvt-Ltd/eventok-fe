import { Menu, X } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import type { UserRole } from '@/types';
import { PortalSidebar } from '@/components/global/portal-sidebar';
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
          <RolePill>{role === 'admin' ? 'Super admin' : role}</RolePill>
        </TopBar>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Layout>
  );
}
