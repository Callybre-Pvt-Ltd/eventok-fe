import { Link } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button';
import { Text } from '../Text';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { useSiteNav } from './helper';
import {
  Bar,
  Inner,
  Logo,
  Links,
  NavLink,
  Actions,
  MenuBtn,
  Drawer,
  DrawerLink,
} from './styled';

export function SiteNav() {
  const { t } = useTranslation();
  const { session, logout } = useAuth();
  const {
    colors,
    mode,
    toggleTheme,
    links,
    isActive,
    mobileOpen,
    toggleMobile,
    closeMobile,
    shrunk,
  } = useSiteNav();

  return (
    <>
      <Bar $colors={colors} $shrunk={shrunk}>
        <Inner>
          <Logo to={ROUTES.HOME}>
            <Text variant="subtitle">EventOK</Text>
          </Logo>
          <Links>
            {links.map(l => (
              <NavLink
                key={l.path}
                to={l.path}
                $active={isActive(l.path)}
                $colors={colors}
              >
                {t(l.labelKey)}
              </NavLink>
            ))}
          </Links>
          <Actions>
            <MenuBtn
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </MenuBtn>
            {session ? (
              <Button tone="ghost" size="sm" onClick={() => logout()}>
                {t('common.logout')}
              </Button>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <Button tone="ghost" size="sm">
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button tone="celebration" size="sm">
                    {t('nav.register')}
                  </Button>
                </Link>
              </>
            )}
            <MenuBtn type="button" onClick={toggleMobile} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </MenuBtn>
          </Actions>
        </Inner>
      </Bar>
      <Drawer $open={mobileOpen} $colors={colors}>
        {links.map(l => (
          <DrawerLink key={l.path} to={l.path} onClick={closeMobile}>
            {t(l.labelKey)}
          </DrawerLink>
        ))}
      </Drawer>
    </>
  );
}
