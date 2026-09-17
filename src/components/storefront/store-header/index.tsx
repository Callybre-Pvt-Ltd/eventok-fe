import { CalendarDays, Heart, MapPin, Mic, Search, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { AnnouncementBar } from '@/components/storefront/announcement-bar';
import { CategoryNav } from '@/components/storefront/category-nav';
import { useStoreHeader } from './helper';
import {
  Actions,
  Badge,
  Brand,
  BrandMark,
  BrandWord,
  HeaderRoot,
  IconLink,
  LocationChip,
  LoginButton,
  LoginLabel,
  MainBar,
  SearchForm,
  SearchIcon,
  SearchInput,
  SearchSubmit,
  VendorLink,
} from './styled';

export function StoreHeader() {
  const { t } = useTranslation();
  const header = useStoreHeader();

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
          <VendorLink to={ROUTES.VENDOR_LOGIN}>
            {t('storefront.becomeVendor')}
          </VendorLink>
          <IconLink to={ROUTES.WISHLIST} aria-label={t('storefront.wishlist')}>
            <Heart size={20} />
            {header.wishlistCount > 0 && <Badge>{header.wishlistCount}</Badge>}
          </IconLink>
          <IconLink
            to={ROUTES.CUSTOMER_BOOKINGS}
            aria-label={t('customer.bookings')}
          >
            <CalendarDays size={20} />
          </IconLink>
          <LoginButton to={ROUTES.LOGIN}>
            <User size={16} />
            <LoginLabel>{t('storefront.login')}</LoginLabel>
          </LoginButton>
        </Actions>
      </MainBar>
      <CategoryNav />
    </HeaderRoot>
  );
}
