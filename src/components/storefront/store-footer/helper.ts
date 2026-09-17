import { ROUTES } from '@/constants/routes';

export interface FooterColumn {
  titleKey: string;
  links: { label: string; to: string }[];
}

export function useStoreFooter() {
  const columns: FooterColumn[] = [
    {
      titleKey: 'storefront.footerCompany',
      links: [
        { label: 'About Us', to: ROUTES.ABOUT },
        { label: 'Contact Us', to: ROUTES.CONTACT },
        { label: 'Become a Vendor', to: ROUTES.VENDOR_LOGIN },
      ],
    },
    {
      titleKey: 'storefront.footerServices',
      links: [
        { label: 'Wedding Decoration', to: `${ROUTES.SHOP}?event=wedding` },
        { label: 'Birthday Decoration', to: `${ROUTES.SHOP}?event=birthday` },
        {
          label: 'Anniversary Decoration',
          to: `${ROUTES.SHOP}?event=anniversary`,
        },
        { label: 'Baby Shower', to: `${ROUTES.SHOP}?event=baby-shower` },
      ],
    },
    {
      titleKey: 'storefront.footerCategories',
      links: [
        { label: 'Wedding Packages', to: ROUTES.PACKAGES },
        { label: 'Bride Make-up', to: '/category/bride-makeup' },
        { label: 'Catering', to: '/category/catering' },
        { label: 'Photographer', to: '/category/photographer' },
        { label: 'Cafe Booking', to: '/category/cafe-booking' },
      ],
    },
    {
      titleKey: 'storefront.footerSupport',
      links: [
        { label: 'Help Center', to: ROUTES.CONTACT },
        { label: 'FAQs', to: ROUTES.FAQ },
        { label: 'How to Book', to: ROUTES.ABOUT },
        { label: 'My Bookings', to: ROUTES.CUSTOMER_BOOKINGS },
      ],
    },
    {
      titleKey: 'storefront.footerLegal',
      links: [
        { label: 'Terms of Use', to: ROUTES.ABOUT },
        { label: 'Privacy Policy', to: ROUTES.ABOUT },
        { label: 'Cancellation & Refund', to: ROUTES.FAQ },
      ],
    },
  ];

  return { columns, year: new Date().getFullYear() };
}
