import { useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { introSlides } from '../helper';
import {
  CenteredIntro,
  DisplayTitle,
  ScriptEyebrow,
  SectionLead,
  SectionShell,
  TaupeSection,
} from '../shared/styled';
import {
  IntroArrowLeft,
  IntroArrowRight,
  IntroSlide,
  IntroSlideImage,
  IntroSliderFrame,
  IntroSliderRow,
  IntroSliderTrack,
} from './styled';

export function FestivityIntroSlider() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => {
    setIndex(current => (current === 0 ? introSlides.length - 1 : current - 1));
  }, []);

  const next = useCallback(() => {
    setIndex(current => (current === introSlides.length - 1 ? 0 : current + 1));
  }, []);

  const slide = introSlides[index];

  return (
    <TaupeSection>
      <SectionShell>
        <CenteredIntro>
          <ScriptEyebrow>{t('landing.festivityIntroEyebrow')}</ScriptEyebrow>
          <DisplayTitle $light>{t('landing.festivityIntroTitle')}</DisplayTitle>
        </CenteredIntro>

        <IntroSliderFrame>
          <IntroSliderRow>
            <IntroArrowLeft
              type="button"
              onClick={prev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </IntroArrowLeft>

            <IntroSliderTrack>
              <IntroSlide key={slide.id}>
                <IntroSlideImage
                  src={slide.image}
                  alt={slide.alt}
                  loading="lazy"
                />
              </IntroSlide>
            </IntroSliderTrack>

            <IntroArrowRight
              type="button"
              onClick={next}
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </IntroArrowRight>
          </IntroSliderRow>
        </IntroSliderFrame>

        <CenteredIntro style={{ marginTop: '2.5rem', marginBottom: 0 }}>
          <SectionLead $light>{t('landing.festivityIntroLead')}</SectionLead>
        </CenteredIntro>
      </SectionShell>
    </TaupeSection>
  );
}
