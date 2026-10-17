import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Menu,
  Mic,
  Search,
  ShoppingBag,
  User,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProfileMenu } from '@/components/auth/profile-menu';
import { BecomeVendorModal } from '@/components/vendor/become-vendor-modal';
import { CategoryNav } from '@/components/storefront/category-nav';
import { MobileMenu } from '@/components/storefront/mobile-menu';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { useStoreHeader } from './helper';
import {
  Actions,
  Badge,
  Brand,
  BrandMark,
  BrandWord,
  DesktopOnly,
  HeaderRoot,
  IconLink,
  LocationChip,
  LoginButton,
  LoginLabel,
  MainBar,
  MenuButton,
  MobileOnly,
  SearchForm,
  SearchIcon,
  SearchInput,
  SearchSubmit,
  VendorButton,
} from './styled';

const APPLY_VENDOR_KEY = 'eventok_open_vendor_modal';

export function StoreHeader() {
  const { t } = useTranslation();
  const header = useStoreHeader();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { session, isSignedIn } = useAuth();
  const [becomeVendorOpen, setBecomeVendorOpen] = useState(false);

  const role = session?.user?.role;
  const isVendor = role === 'vendor' || Boolean(session?.user?.vendorId);

  const openVendorApplication = () => {
    if (!isSignedIn) {
      sessionStorage.setItem(APPLY_VENDOR_KEY, '1');
      navigate(ROUTES.LOGIN);
      return;
    }
    if (!isVendor) setBecomeVendorOpen(true);
  };

  useEffect(() => {
    const requested =
      searchParams.get('applyVendor') === '1' ||
      sessionStorage.getItem(APPLY_VENDOR_KEY) === '1';
    if (!requested || !isSignedIn || isVendor) return;
    sessionStorage.removeItem(APPLY_VENDOR_KEY);
    setBecomeVendorOpen(true);
    if (searchParams.get('applyVendor') === '1') {
      const next = new URLSearchParams(searchParams);
      next.delete('applyVendor');
      setSearchParams(next, { replace: true });
    }
  }, [isSignedIn, isVendor, searchParams, setSearchParams]);

  return (
    <HeaderRoot>
      <MainBar>
        <Brand to={ROUTES.HOME}>
          <BrandMark>EO</BrandMark>
          <BrandWord>{t('common.appName')}</BrandWord>
        </Brand>

        <LocationChip type="button">
          <MapPin size={16} />
          {t('storefront.setLocation')}
        </LocationChip>

        <SearchForm onSubmit={header.submit} role="search">
          <SearchIcon>
            <Search size={18} />
          </SearchIcon>
          <SearchInput
            value={header.term}
            onChange={event => header.setTerm(event.target.value)}
            placeholder={t('storefront.searchPlaceholder', {
              term: header.placeholder,
            })}
            aria-label={t('storefront.searchSubmit')}
          />
          <SearchIcon aria-hidden>
            <Mic size={18} />
          </SearchIcon>
          <SearchSubmit type="submit" aria-label={t('storefront.searchSubmit')}>
            <Search size={18} />
          </SearchSubmit>
        </SearchForm>

        <Actions>
          <DesktopOnly>
            {!isSignedIn || !isVendor ? (
              <VendorButton type="button" onClick={openVendorApplication}>
                {t('storefront.becomeVendor')}
              </VendorButton>
            ) : null}
            <IconLink
              to={ROUTES.WISHLIST}
              aria-label={t('storefront.wishlist')}
            >
              <Heart size={20} />
              {header.wishlistCount > 0 && (
                <Badge>{header.wishlistCount}</Badge>
              )}
            </IconLink>
          </DesktopOnly>

          <IconLink to={ROUTES.CART} aria-label={t('storefront.cart')}>
            <ShoppingBag size={20} />
            {header.cartCount > 0 && <Badge>{header.cartCount}</Badge>}
          </IconLink>

          <DesktopOnly>
            {isSignedIn ? (
              <ProfileMenu onOpenBecomeVendor={openVendorApplication} />
            ) : (
              <LoginButton to={ROUTES.LOGIN}>
                <User size={16} />
                <LoginLabel>{t('storefront.login')}</LoginLabel>
              </LoginButton>
            )}
          </DesktopOnly>

          <MobileOnly>
            <MenuButton
              type="button"
              onClick={header.openMenu}
              aria-label={t('common.menu')}
            >
              <Menu size={20} />
            </MenuButton>
          </MobileOnly>
        </Actions>
      </MainBar>
      <CategoryNav />
      <MobileMenu
        open={header.menuOpen}
        onClose={header.closeMenu}
        wishlistCount={header.wishlistCount}
        onOpenBecomeVendor={openVendorApplication}
      />
      <BecomeVendorModal
        open={becomeVendorOpen}
        onClose={() => setBecomeVendorOpen(false)}
      />
    </HeaderRoot>
  );
}
