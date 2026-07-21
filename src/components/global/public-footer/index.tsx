import { ArrowUpRight, ChevronUp, Gem } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import {
  footerQuickLinks,
  footerSocialLinks,
  footerSupportLinks,
  usePublicFooter,
} from './helper';
import {
  BackToTop,
  Footer,
  FooterBottom,
  FooterBrandCol,
  FooterCol,
  FooterGrid,
  FooterInner,
  FooterLink,
  FooterLogo,
  FooterLogoMark,
  FooterTitle,
  FooterWatermark,
  NewsletterForm,
  NewsletterInput,
  NewsletterSub,
  NewsletterSubmit,
  SocialLink,
  SocialRow,
} from './styled';

const categoryLinks = [
  { path: `${ROUTES.SERVICES}?type=wedding`, label: 'Wedding' },
  { path: `${ROUTES.SERVICES}?type=corporate`, label: 'Corporate' },
  { path: `${ROUTES.SERVICES}?type=birthday`, label: 'Birthday' },
  { path: `${ROUTES.SERVICES}?type=photography`, label: 'Photography' },
] as const;

const cityLinks = [
  { path: ROUTES.SERVICES, label: 'Mumbai' },
  { path: ROUTES.SERVICES, label: 'Delhi' },
  { path: ROUTES.SERVICES, label: 'Bengaluru' },
  { path: ROUTES.SERVICES, label: 'Udaipur' },
] as const;

export function PublicFooter() {
  const { t } = useTranslation();
  const { email, onEmailChange, onNewsletterSubmit } = usePublicFooter();

  return (
    <Footer>
      <FooterWatermark aria-hidden>EVENTOK</FooterWatermark>
      <FooterInner>
        <FooterGrid>
          <FooterBrandCol>
            <FooterLogo>
              <FooterLogoMark>
                <Gem size={18} strokeWidth={1.5} />
              </FooterLogoMark>
              {t('common.appName')}
            </FooterLogo>
            <NewsletterSub>{t('nav.menuTagline')}</NewsletterSub>
            <SocialRow>
              {footerSocialLinks.map(social => (
                <SocialLink
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                >
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {social.paths.map(d => (
                      <path key={d} d={d} />
                    ))}
                  </svg>
                </SocialLink>
              ))}
            </SocialRow>
          </FooterBrandCol>

          <FooterCol>
            <FooterTitle>{t('landing.wedluxQuickLinks')}</FooterTitle>
            {footerQuickLinks.map(link => (
              <FooterLink key={link.path} to={link.path}>
                {t(link.labelKey)}
              </FooterLink>
            ))}
            <FooterLink to={ROUTES.REGISTER}>{t('nav.register')}</FooterLink>
          </FooterCol>

          <FooterCol>
            <FooterTitle>{t('landing.wedluxFooterCategories')}</FooterTitle>
            {categoryLinks.map(link => (
              <FooterLink key={link.label} to={link.path}>
                {link.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol>
            <FooterTitle>{t('landing.wedluxFooterCities')}</FooterTitle>
            {cityLinks.map(link => (
              <FooterLink key={link.label} to={link.path}>
                {link.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol>
            <FooterTitle>{t('landing.wedluxSupport')}</FooterTitle>
            {footerSupportLinks.map(link => (
              <FooterLink key={link.path} to={link.path}>
                {t(link.labelKey)}
              </FooterLink>
            ))}
            <FooterLink to={`${ROUTES.HOME}#process`}>
              {t('landing.wedluxFooterHowItWorks')}
            </FooterLink>
            <FooterLink to={ROUTES.CONTACT}>
              {t('landing.wedluxFooterBecomeVendor')}
            </FooterLink>
          </FooterCol>

          <FooterCol>
            <FooterTitle>{t('landing.wedluxNewsletterTitle')}</FooterTitle>
            <NewsletterSub>{t('landing.wedluxNewsletterSub')}</NewsletterSub>
            <NewsletterForm onSubmit={onNewsletterSubmit}>
              <NewsletterInput
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder={t('landing.wedluxNewsletterPlaceholder')}
              />
              <NewsletterSubmit
                type="submit"
                aria-label={t('landing.wedluxNewsletterTitle')}
              >
                <ArrowUpRight size={16} />
              </NewsletterSubmit>
            </NewsletterForm>
          </FooterCol>
        </FooterGrid>

        <FooterBottom>
          <span>{t('landing.wedluxRights')}</span>
          <span>
            <FooterLink to={ROUTES.HOME}>
              {t('landing.wedluxFooterPrivacy')}
            </FooterLink>
            {' · '}
            <FooterLink to={ROUTES.HOME}>
              {t('landing.wedluxFooterTerms')}
            </FooterLink>
          </span>
        </FooterBottom>
      </FooterInner>

      <BackToTop
        type="button"
        aria-label={t('landing.wedluxFooterBackToTop')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp size={20} />
      </BackToTop>
    </Footer>
  );
}
