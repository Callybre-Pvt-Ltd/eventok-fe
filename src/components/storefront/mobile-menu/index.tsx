import { Heart, LogIn, Store, User, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import { useMobileMenu } from './helper';
import {
  CloseButton,
  Drawer,
  DrawerHead,
  DrawerTitle,
  MenuCount,
  MenuLink,
  Overlay,
  Section,
  SubLink,
} from './styled';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  wishlistCount: number;
}

export function MobileMenu({ open, onClose, wishlistCount }: MobileMenuProps) {
  const { t } = useTranslation();
  const { isSignedIn } = useAuth();
  const { groups } = useMobileMenu(open, onClose);

  return (
    <>
      <Overlay $open={open} onClick={onClose} aria-hidden />
      <Drawer $open={open} aria-hidden={!open}>
        <DrawerHead>
          <DrawerTitle>{t('common.appName')}</DrawerTitle>
          <CloseButton
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            <X size={18} />
          </CloseButton>
        </DrawerHead>

        <Section>
          <MenuLink to={isSignedIn ? ROUTES.CUSTOMER_PROFILE : ROUTES.LOGIN}>
            {isSignedIn ? <User size={18} /> : <LogIn size={18} />}
            {isSignedIn ? t('customer.profile') : t('storefront.login')}
          </MenuLink>
          <MenuLink to={ROUTES.WISHLIST}>
            <Heart size={18} />
            {t('storefront.wishlist')}
            {wishlistCount > 0 && <MenuCount>{wishlistCount}</MenuCount>}
          </MenuLink>
          {!isSignedIn && (
            <MenuLink to={ROUTES.VENDOR_LOGIN}>
              <Store size={18} />
              {t('storefront.becomeVendor')}
            </MenuLink>
          )}
        </Section>

        {groups.map(group => (
          <Section key={group.key}>
            <MenuLink to={group.to}>{t(group.labelKey)}</MenuLink>
            {group.children.map(category => (
              <SubLink key={category.slug} to={`/category/${category.slug}`}>
                {category.name}
                <MenuCount>{category.serviceCount ?? 0}</MenuCount>
              </SubLink>
            ))}
          </Section>
        ))}
      </Drawer>
    </>
  );
}
