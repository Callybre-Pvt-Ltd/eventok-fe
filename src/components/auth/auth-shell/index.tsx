import { motion } from 'framer-motion';
import { Check, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuthShell } from './helper';
import {
  Shell,
  BgLayer,
  Blob,
  Grid,
  BenefitsPanel,
  BenefitItem,
  SocialProof,
  Quote,
  QuoteAuthor,
  CardWrap,
  GlassCard,
  VendorCta,
} from './styled';
import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily } from '@/theme';

const Eyebrow = styled.p`
  margin: 0 0 0.75rem;
  display: inline-flex;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: ${brandColors.pink100};
  color: ${brandColors.pink600};
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const VendorBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 40px;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);

  &:hover {
    color: ${brandColors.pink600};
  }
`;

interface AuthShellProps {
  children: React.ReactNode;
  showVendorCta?: boolean;
}

export function AuthShell({ children, showVendorCta = true }: AuthShellProps) {
  const { t } = useTranslation();
  const { palette, benefits } = useAuthShell();

  return (
    <Shell $palette={palette}>
      <BgLayer $palette={palette} />
      <Blob
        $palette={palette}
        as={motion.div}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Blob
        $palette={palette}
        $secondary
        as={motion.div}
        animate={{ x: [0, -24, 0], y: [0, 24, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Grid>
        <BenefitsPanel
          as={motion.div}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Eyebrow>Welcome back</Eyebrow>
          <h2>Login to {t('common.appName')}</h2>
          <p>{t('auth.loginSubtitle')}</p>
          <ul>
            {benefits.map(b => (
              <BenefitItem key={b} $palette={palette}>
                <Check size={16} />
                {t(b)}
              </BenefitItem>
            ))}
          </ul>
          <SocialProof $palette={palette}>
            {t('marketplace.authSocialProof')}
          </SocialProof>
          <Quote $palette={palette}>
            &ldquo;{t('marketplace.authTestimonial')}&rdquo;
          </Quote>
          <QuoteAuthor $palette={palette}>
            {t('marketplace.authTestimonialAuthor')}
          </QuoteAuthor>
        </BenefitsPanel>

        <CardWrap
          as={motion.div}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <GlassCard $palette={palette}>
            {children}
            {showVendorCta ? (
              <VendorCta>
                <h3>Are you a Vendor?</h3>
                <p>
                  Access your business dashboard to manage services, leads,
                  bookings, and profile.
                </p>
                <VendorBtn to={ROUTES.VENDOR_LOGIN}>
                  <Store size={14} />
                  Login as Vendor →
                </VendorBtn>
              </VendorCta>
            ) : null}
          </GlassCard>
        </CardWrap>
      </Grid>
    </Shell>
  );
}
