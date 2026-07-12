import { ArrowRight, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { photography } from '@/design-system/tokens/photography';
import { eventTypes, useLuxuryCategoryPicker } from './helper';
import {
  CategoryCopy,
  CategoryGrid,
  CategoryLead,
  CategorySection,
  CategoryTitle,
  PlayButton,
  TypeArrow,
  TypeCard,
  TypeImage,
  TypeLabel,
  TypeList,
  VideoWrap,
} from './styled';

export function LuxuryCategoryPicker() {
  const { t } = useTranslation();
  const { goToCategory } = useLuxuryCategoryPicker();

  return (
    <CategorySection>
      <CategoryGrid>
        <VideoWrap>
          <img src={photography.corporate[2]} alt="" loading="lazy" />
          <PlayButton type="button" aria-label={t('landing.luxuryPlayVideo')}>
            <Play size={22} fill="currentColor" />
          </PlayButton>
        </VideoWrap>

        <CategoryCopy>
          <CategoryTitle>{t('landing.luxuryChooseType')}</CategoryTitle>
          <CategoryLead>{t('landing.luxuryChooseTypeLead')}</CategoryLead>
          <TypeList>
            {eventTypes.map(type => (
              <TypeCard
                key={type.slug}
                type="button"
                onClick={() => goToCategory(type.slug)}
              >
                <TypeImage src={type.image} alt="" />
                <TypeLabel>{t(type.labelKey)}</TypeLabel>
                <TypeArrow>
                  <ArrowRight size={12} />
                </TypeArrow>
              </TypeCard>
            ))}
          </TypeList>
        </CategoryCopy>
      </CategoryGrid>
    </CategorySection>
  );
}
