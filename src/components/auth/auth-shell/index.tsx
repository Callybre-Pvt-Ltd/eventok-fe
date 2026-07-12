import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
} from './styled';

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
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
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>{t('common.appName')}</h2>
          <p>{t('landing.heroSubtitle')}</p>
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
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard $palette={palette}>{children}</GlassCard>
        </CardWrap>
      </Grid>
    </Shell>
  );
}
