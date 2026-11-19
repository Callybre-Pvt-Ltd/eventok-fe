import { useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Gift,
  Heart,
  HelpCircle,
  Info,
  LogIn,
  LogOut,
  Mail,
  Package,
  Shield,
  ShoppingBag,
  Store,
  User,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@clerk/react';
import { BrandLogo } from '@/components/global/brand-logo';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/auth/use-auth';
import type { UserRole } from '@/types';
import { getRoleLabel } from '@/utils/auth/roles';
import { useMobileMenu } from './helper';
import {
  AccordionBody,
  AccordionHeader,
  CloseButton,
  Drawer,
  DrawerHead,
  LogoutButton,
  MenuAction,
  MenuCount,
  MenuLink,
  Overlay,
  PortalCardLink,
  PortalLeft,
  Section,
  SectionEyebrow,
  SubLink,
  UserAvatar,
  UserBadge,
  UserCard,
  UserEmail,
  UserInfo,
  UserName,
  ViewAllLink,
} from './styled';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  wishlistCount: number;
  onOpenBecomeVendor?: () => void;
}

export function MobileMenu({
  open,
  onClose,
  wishlistCount,
  onOpenBecomeVendor,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const { session, isSignedIn, logout } = useAuth();
  const { user: clerkUser, isLoaded: clerkUserLoaded } = useUser();
  const { groups } = useMobileMenu(open, onClose);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const user = session?.user;
  const clerkRole =
    (clerkUser?.publicMetadata?.role as UserRole | undefined) ??
    (clerkUser?.unsafeMetadata?.eventok_role === 'VENDOR'
      ? 'vendor'
      : undefined);
  const role: UserRole | undefined = user?.role ?? clerkRole;

  const email =
    user?.email ||
    clerkUser?.primaryEmailAddress?.emailAddress ||
    clerkUser?.emailAddresses?.[0]?.emailAddress ||
    '';
  const displayName =
    user?.name || clerkUser?.fullName || email.split('@')[0] || 'User';
  const letter = (displayName.trim()[0] || 'U').toUpperCase();
  const avatarUrl =
    clerkUserLoaded && clerkUser?.hasImage ? clerkUser.imageUrl : null;

  const isAdmin = role === 'admin' || role === 'super_admin';
  const hasVendorAccount =
    role === 'vendor' || Boolean(user?.vendorId) || Boolean(user?.vendorStatus);
  const isApprovedVendor =
    role === 'vendor' || user?.vendorStatus === 'approved';
  const vendorPath = isApprovedVendor
    ? ROUTES.VENDOR_DASHBOARD
    : ROUTES.VENDOR_PENDING;

  const toggleGroup = (key: string) => {
    setExpandedGroup(prev => (prev === key ? null : key));
  };

  const handleLogout = () => {
    onClose();
    logout();
  };

  return (
    <>
      <Overlay $open={open} onClick={onClose} aria-hidden />
      <Drawer $open={open} aria-hidden={!open}>
        <DrawerHead>
          <BrandLogo size={26} to={ROUTES.HOME} onClick={onClose} />
          <CloseButton
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            <X size={18} />
          </CloseButton>
        </DrawerHead>

        {/* User Identity Banner */}
        {isSignedIn ? (
          <UserCard>
            <UserAvatar>
              {avatarUrl ? <img src={avatarUrl} alt={displayName} /> : letter}
            </UserAvatar>
            <UserInfo>
              <UserName>{displayName}</UserName>
              <UserEmail>{email}</UserEmail>
              {role && role !== 'customer' && (
                <UserBadge>{getRoleLabel(role)}</UserBadge>
              )}
            </UserInfo>
          </UserCard>
        ) : null}

        {/* Portals & Core CTAs */}
        {isSignedIn && (isAdmin || hasVendorAccount) ? (
          <Section>
            {isAdmin && (
              <PortalCardLink
                to={ROUTES.ADMIN_DASHBOARD}
                $variant="admin"
                onClick={onClose}
              >
                <PortalLeft>
                  <Shield size={18} />
                  <span>Admin Portal</span>
                </PortalLeft>
                <ArrowRight size={16} />
              </PortalCardLink>
            )}
            {hasVendorAccount && (
              <PortalCardLink
                to={vendorPath}
                $variant="vendor"
                onClick={onClose}
              >
                <PortalLeft>
                  <Store size={18} />
                  <span>
                    {isApprovedVendor ? 'Vendor Dashboard' : 'Vendor Status'}
                  </span>
                </PortalLeft>
                <ArrowRight size={16} />
              </PortalCardLink>
            )}
          </Section>
        ) : null}

        {/* Account / Shop Links */}
        <Section>
          <SectionEyebrow>Account & Shopping</SectionEyebrow>
          {isSignedIn ? (
            <>
              <MenuLink to={ROUTES.CUSTOMER_BOOKINGS} onClick={onClose}>
                <Package size={18} />
                <span>{t('customer.bookings')}</span>
              </MenuLink>
              <MenuLink to={ROUTES.CUSTOMER_PROFILE} onClick={onClose}>
                <User size={18} />
                <span>{t('customer.profile')}</span>
              </MenuLink>
            </>
          ) : (
            <MenuLink to={ROUTES.LOGIN} onClick={onClose}>
              <LogIn size={18} />
              <span>{t('storefront.login')}</span>
            </MenuLink>
          )}

          <MenuLink to={ROUTES.WISHLIST} onClick={onClose}>
            <Heart size={18} />
            <span>{t('storefront.wishlist')}</span>
            {wishlistCount > 0 && <MenuCount>{wishlistCount}</MenuCount>}
          </MenuLink>

          {!hasVendorAccount && onOpenBecomeVendor ? (
            <MenuAction
              type="button"
              onClick={() => {
                onClose();
                onOpenBecomeVendor();
              }}
            >
              <Store size={18} />
              <span>{t('storefront.becomeVendor')}</span>
            </MenuAction>
          ) : null}
        </Section>

        {/* Explore Categories (Collapsible Accordions) */}
        <Section>
          <SectionEyebrow>Explore Services</SectionEyebrow>
          <MenuLink to={ROUTES.SHOP} onClick={onClose}>
            <ShoppingBag size={18} />
            <span>{t('storefront.navAllServices')}</span>
          </MenuLink>
          <MenuLink to={ROUTES.PACKAGE_BUILDER} onClick={onClose}>
            <Gift size={18} />
            <span>{t('storefront.packageBuilderNav')}</span>
          </MenuLink>

          {groups.map(group => {
            const isExpanded = expandedGroup === group.key;
            if (group.children.length === 0) {
              return (
                <MenuLink key={group.key} to={group.to} onClick={onClose}>
                  {t(group.labelKey)}
                </MenuLink>
              );
            }
            return (
              <div key={group.key}>
                <AccordionHeader
                  type="button"
                  $expanded={isExpanded}
                  onClick={() => toggleGroup(group.key)}
                  aria-expanded={isExpanded}
                >
                  <span>{t(group.labelKey)}</span>
                  <ChevronDown size={16} />
                </AccordionHeader>
                <AccordionBody $expanded={isExpanded}>
                  <ViewAllLink to={group.to} onClick={onClose}>
                    {t('common.viewAll')} {t(group.labelKey)}
                  </ViewAllLink>
                  {group.children.map(category => (
                    <SubLink
                      key={category.slug}
                      to={`/category/${category.slug}`}
                      onClick={onClose}
                    >
                      {category.name}
                    </SubLink>
                  ))}
                </AccordionBody>
              </div>
            );
          })}
        </Section>

        {/* Company & Support Links */}
        <Section>
          <SectionEyebrow>Company & Help</SectionEyebrow>
          <MenuLink to={ROUTES.ABOUT} onClick={onClose}>
            <Info size={18} />
            <span>{t('storefront.about')}</span>
          </MenuLink>
          <MenuLink to={ROUTES.CONTACT} onClick={onClose}>
            <Mail size={18} />
            <span>{t('storefront.contact')}</span>
          </MenuLink>
          <MenuLink
            to={{ pathname: ROUTES.HOME, hash: '#faq' }}
            onClick={onClose}
          >
            <HelpCircle size={18} />
            <span>{t('storefront.faq')}</span>
          </MenuLink>
        </Section>

        {/* Sign Out */}
        {isSignedIn && (
          <Section>
            <LogoutButton type="button" onClick={handleLogout}>
              <LogOut size={18} />
              <span>{t('auth.signOut')}</span>
            </LogoutButton>
          </Section>
        )}
      </Drawer>
    </>
  );
}
