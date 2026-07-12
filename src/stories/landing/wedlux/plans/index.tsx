import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { ArrowCta } from '@/components/ui/arrow-cta';
import { Starburst } from '@/components/ui/starburst';
import { SectionShell, SerifTitle, WhiteSection } from '../shared/styled';
import { useWedluxPlans } from './helper';
import {
  CardStarburst,
  Divider,
  PhotoCol,
  PhotoParallax,
  PlanBody,
  PlanCard,
  PlanCtaRow,
  PlanInfo,
  PlanName,
  PlanPrice,
  PlanRow,
  PlansGrid,
  PlansSub,
} from './styled';

export function WedluxPlans() {
  const { t } = useTranslation();
  const { scope, plans, planImage } = useWedluxPlans();

  return (
    <WhiteSection id="plans" ref={scope}>
      <SectionShell>
        <PlansGrid>
          <PlanCard data-reveal>
            <CardStarburst aria-hidden>
              <Starburst size={72} opacity={0.85} />
            </CardStarburst>
            <SerifTitle>{t('landing.wedluxPlansTitle')}</SerifTitle>
            <PlansSub>{t('landing.wedluxPlansSubtitle')}</PlansSub>
            <Divider aria-hidden />
            {plans.map(({ titleKey, priceKey, bodyKey }) => (
              <PlanRow key={titleKey} data-reveal-group="plans">
                <PlanInfo>
                  <PlanName>{t(titleKey)}</PlanName>
                  <PlanBody>{t(bodyKey)}</PlanBody>
                </PlanInfo>
                <PlanPrice>
                  {t(priceKey)}
                  <sup>$</sup>
                </PlanPrice>
              </PlanRow>
            ))}
            <PlanCtaRow>
              <ArrowCta
                to={ROUTES.CONTACT}
                label={t('landing.wedluxPlansCta')}
                dark
              />
            </PlanCtaRow>
          </PlanCard>
          <PhotoCol>
            <PhotoParallax data-parallax data-parallax-speed="6">
              <img src={planImage} alt="" aria-hidden loading="lazy" />
            </PhotoParallax>
          </PhotoCol>
        </PlansGrid>
      </SectionShell>
    </WhiteSection>
  );
}
