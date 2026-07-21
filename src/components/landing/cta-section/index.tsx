import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import { fadeUp, MotionDiv, viewportOnce } from '@/utils/motion';
import { useCtaSection } from './helper';
import { Actions, Inner, Section, Subtitle, Title } from './styled';

export function CtaSection() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  useCtaSection();

  return (
    <Section $palette={palette}>
      <MotionDiv
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <Inner $palette={palette}>
          <Title>{t('landing.ctaTitle')}</Title>
          <Subtitle>{t('landing.ctaSubtitle')}</Subtitle>
          <Actions>
            <Link to={ROUTES.REGISTER}>
              <Button variant="secondary" size="lg">
                {t('landing.ctaButton')}
              </Button>
            </Link>
            <Link to={ROUTES.SERVICES}>
              <Button variant="outline" size="lg">
                {t('landing.heroCta')}
              </Button>
            </Link>
          </Actions>
        </Inner>
      </MotionDiv>
    </Section>
  );
}
