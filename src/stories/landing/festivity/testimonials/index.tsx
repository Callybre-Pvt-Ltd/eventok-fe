import { useTranslation } from 'react-i18next';
import { festivityTestimonials } from '../helper';
import {
  CenteredIntro,
  DisplayTitle,
  IvorySection,
  ScriptEyebrow,
  SectionShell,
} from '../shared/styled';
import {
  TestimonialAvatar,
  TestimonialCard,
  TestimonialGrid,
  TestimonialName,
  TestimonialQuote,
} from './styled';

export function FestivityTestimonials() {
  const { t } = useTranslation();

  return (
    <IvorySection id="testimonials">
      <SectionShell>
        <CenteredIntro>
          <ScriptEyebrow>
            {t('landing.festivityTestimonialsEyebrow')}
          </ScriptEyebrow>
          <DisplayTitle>{t('landing.festivityTestimonialsTitle')}</DisplayTitle>
        </CenteredIntro>

        <TestimonialGrid>
          {festivityTestimonials.map(item => (
            <TestimonialCard key={item.id}>
              <TestimonialAvatar src={item.image} alt="" loading="lazy" />
              <TestimonialName>{t(item.nameKey)}</TestimonialName>
              <TestimonialQuote>
                &ldquo;{t(item.quoteKey)}&rdquo;
              </TestimonialQuote>
            </TestimonialCard>
          ))}
        </TestimonialGrid>
      </SectionShell>
    </IvorySection>
  );
}
