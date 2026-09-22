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
import { AnnouncementBar } from '@/components/storefront/announcement-bar';
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
  VendorLink,
} from './styled';

export function StoreHeader() {
  const { t } = useTranslation();
  const header = useStoreHeader();
  const { isSignedIn } = useAuth();

  return (
    <HeaderRoot>
      <AnnouncementBar />
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
            {!isSignedIn ? (
              <VendorLink to={ROUTES.VENDOR_LOGIN}>
                {t('storefront.becomeVendor')}
              </VendorLink>
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
              <ProfileMenu />
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
      />
    </HeaderRoot>
  );
}
