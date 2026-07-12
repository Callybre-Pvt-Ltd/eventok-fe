import { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { portfolioSlides } from '../helper';
import { useIsMobile } from '@/hooks/use-is-mobile';
import {
  CenteredIntro,
  DarkSliderArrow,
  DisplayTitle,
  IvoryButton,
  IvorySection,
  ScriptEyebrow,
  SectionLead,
  SectionShell,
} from '../shared/styled';
import {
  PortfolioCard,
  PortfolioCardImage,
  PortfolioCardTitle,
  PortfolioGrid,
  PortfolioSliderFrame,
  PortfolioSliderRow,
  PortfolioTrack,
} from './styled';

const DESKTOP_VISIBLE = 3;

export function FestivityPortfolioSlider() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();
  const visibleCount = isMobile ? 1 : DESKTOP_VISIBLE;
  const maxIndex = Math.max(0, portfolioSlides.length - visibleCount);

  const visibleSlides = useMemo(() => {
    return portfolioSlides.slice(index, index + visibleCount);
  }, [index, visibleCount]);

  const prev = useCallback(() => {
    setIndex(current => (current === 0 ? maxIndex : current - 1));
  }, [maxIndex]);

  const next = useCallback(() => {
    setIndex(current => (current >= maxIndex ? 0 : current + 1));
  }, [maxIndex]);

  return (
    <IvorySection>
      <SectionShell>
        <CenteredIntro>
          <ScriptEyebrow>
            {t('landing.festivityPortfolioEyebrow')}
          </ScriptEyebrow>
          <DisplayTitle>{t('landing.festivityPortfolioTitle')}</DisplayTitle>
          <SectionLead>{t('landing.festivityPortfolioLead')}</SectionLead>
        </CenteredIntro>

        <PortfolioSliderFrame>
          <PortfolioSliderRow>
            <DarkSliderArrow type="button" onClick={prev} aria-label="Previous">
              <ChevronLeft size={18} />
            </DarkSliderArrow>

            <PortfolioTrack>
              <PortfolioGrid $count={visibleSlides.length}>
                {visibleSlides.map(slide => (
                  <PortfolioCard key={slide.id}>
                    <PortfolioCardImage
                      src={slide.image}
                      alt=""
                      loading="lazy"
                    />
                    <PortfolioCardTitle>{t(slide.titleKey)}</PortfolioCardTitle>
                  </PortfolioCard>
                ))}
              </PortfolioGrid>
            </PortfolioTrack>

            <DarkSliderArrow type="button" onClick={next} aria-label="Next">
              <ChevronRight size={18} />
            </DarkSliderArrow>
          </PortfolioSliderRow>
        </PortfolioSliderFrame>

        <CenteredIntro style={{ marginTop: '2.5rem', marginBottom: 0 }}>
          <IvoryButton to={ROUTES.SERVICES}>
            {t('landing.festivityPortfolioCta')}
          </IvoryButton>
        </CenteredIntro>
      </SectionShell>
    </IvorySection>
  );
}
