import { createPortal } from 'react-dom';
import { ArrowRight, Gem, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProfileMenu } from '@/components/auth/profile-menu';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { getPostAuthPath } from '@/utils/auth/post-auth';
import { usePublicHeader } from './helper';
import {
  Actions,
  Brand,
  BrandMark,
  CenterNav,
  ConsultCta,
  MenuToggle,
  MobileClose,
  MobileCta,
  MobileFoot,
  MobileLink,
  MobileLinks,
  MobileOverlay,
  MobilePanel,
  MobileTop,
  NavInner,
  NavItem,
  NavRoot,
} from './styled';

const navLinks = [
  { to: ROUTES.HOME, label: 'Home', end: true },
  { to: ROUTES.SERVICES, label: 'Services' },
  { to: ROUTES.REGISTER, label: 'Become a Vendor' },
  { to: ROUTES.ABOUT, label: 'About Us' },
] as const;

interface PublicHeaderProps {
  overlay?: boolean;
}

export function PublicHeader({ overlay = false }: PublicHeaderProps) {
  const { t } = useTranslation();
  const nav = usePublicHeader(overlay);
  const { session, isSignedIn } = useAuth();
  const portalPath = session
    ? getPostAuthPath(session.user.role, session.user.vendorStatus)
    : ROUTES.AUTH_CONTINUE;

  const menu = createPortal(
    <>
      <MobileOverlay
        $open={nav.menuOpen}
        onClick={nav.closeMenu}
        aria-hidden={!nav.menuOpen}
      />
      <MobilePanel
        ref={nav.menuRef}
        id={nav.menuId}
        $open={nav.menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.menu')}
        hidden={!nav.menuOpen}
      >
        <MobileTop>
          <Brand to={ROUTES.HOME} onClick={nav.closeMenu}>
            <BrandMark>
              <Gem size={18} strokeWidth={1.5} />
            </BrandMark>
            {t('common.appName')}
          </Brand>
          <MobileClose
            type="button"
            onClick={nav.closeMenu}
            aria-label={t('nav.closeMenu')}
          >
            <X size={20} />
          </MobileClose>
        </MobileTop>

        <MobileLinks>
          {navLinks.map(link => (
            <MobileLink
              key={link.to}
              data-nav-item
              to={link.to}
              onClick={nav.closeMenu}
            >
              {link.label}
            </MobileLink>
          ))}
        </MobileLinks>

        <MobileFoot>
          {isSignedIn ? (
            <MobileCta data-nav-item to={portalPath} onClick={nav.closeMenu}>
              Open portal
              <ArrowRight size={18} aria-hidden />
            </MobileCta>
          ) : (
            <MobileCta
              data-nav-item
              to={ROUTES.CONTACT}
              onClick={nav.closeMenu}
            >
              Request Consultation
              <ArrowRight size={18} aria-hidden />
            </MobileCta>
          )}
        </MobileFoot>
      </MobilePanel>
    </>,
    document.body,
  );

  return (
    <>
      <NavRoot ref={nav.shellRef} $scrolled={nav.scrolled} $overlay={overlay}>
        <NavInner $scrolled={nav.scrolled}>
          <Brand to={ROUTES.HOME}>
            <BrandMark $scrolled={nav.scrolled}>
              <Gem size={nav.scrolled ? 16 : 18} strokeWidth={1.5} />
            </BrandMark>
            {t('common.appName')}
          </Brand>

          <CenterNav aria-label={t('nav.primary')}>
            {navLinks.map(link => (
              <NavItem
                key={link.to}
                data-nav-link
                to={link.to}
                end={'end' in link ? link.end : false}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                {link.label}
              </NavItem>
            ))}
          </CenterNav>

          <Actions>
            {isSignedIn ? (
              <ProfileMenu tone="light" />
            ) : (
              <ConsultCta data-nav-cta to={ROUTES.CONTACT}>
                Request Consultation
                <ArrowRight size={16} aria-hidden />
              </ConsultCta>
            )}
            <MenuToggle
              ref={nav.menuBtnRef}
              type="button"
              $open={nav.menuOpen}
              aria-expanded={nav.menuOpen}
              aria-controls={nav.menuId}
              aria-label={nav.menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              onClick={nav.toggleMenu}
            >
              {nav.menuOpen ? <X size={20} /> : <Menu size={20} />}
            </MenuToggle>
          </Actions>
        </NavInner>
      </NavRoot>
      {menu}
    </>
  );
}
