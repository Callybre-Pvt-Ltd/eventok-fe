import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import { fadeUp, MotionDiv, viewportOnce } from '@/utils/motion';
import { useCorporateEvents } from './helper';
import {
  Content,
  Eyebrow,
  FeatureItem,
  FeatureList,
  Section,
  SectionInner,
  Split,
  Subtitle,
  Title,
  Visual,
} from './styled';

export function CorporateEvents() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { image, features } = useCorporateEvents();

  return (
    <Section $palette={palette} $alt>
      <SectionInner>
        <MotionDiv
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Split>
            <Content>
              <Eyebrow $palette={palette}>Corporate</Eyebrow>
              <Title $palette={palette}>{t('landing.corporateTitle')}</Title>
              <Subtitle $palette={palette}>
                {t('landing.corporateSubtitle')}
              </Subtitle>
              <FeatureList $palette={palette}>
                {features.map(key => (
                  <FeatureItem key={key} $palette={palette}>
                    {t(key)}
                  </FeatureItem>
                ))}
              </FeatureList>
              <Link to={ROUTES.SERVICES}>
                <Button variant="primary" size="lg">
                  {t('landing.corporateCta')}
                </Button>
              </Link>
            </Content>
            <Visual $url={image} />
          </Split>
        </MotionDiv>
      </SectionInner>
    </Section>
  );
}
