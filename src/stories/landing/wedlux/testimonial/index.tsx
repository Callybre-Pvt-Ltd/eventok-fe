import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { ColumnRules, ForestSection, SectionShell } from '../shared/styled';
import { useWedluxTestimonial } from './helper';
import {
  QuoteMark,
  QuoteText,
  StarRow,
  TestimonialGrid,
  TestimonialMedia,
  TestimonialName,
} from './styled';

export function WedluxTestimonial() {
  const { t } = useTranslation();
  const { scope, image, rating } = useWedluxTestimonial();

  return (
    <ForestSection id="testimonial" ref={scope}>
      <ColumnRules />
      <SectionShell>
        <TestimonialGrid>
          <TestimonialMedia data-reveal>
            <img src={image} alt="" aria-hidden loading="lazy" />
          </TestimonialMedia>
          <div data-reveal>
            <QuoteMark aria-hidden>“</QuoteMark>
            <QuoteText>{t('landing.wedluxTestimonialQuote')}</QuoteText>
            <StarRow aria-hidden>
              {Array.from({ length: rating }, (_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </StarRow>
            <TestimonialName>
              {t('landing.wedluxTestimonialName')}
            </TestimonialName>
          </div>
        </TestimonialGrid>
      </SectionShell>
    </ForestSection>
  );
}
