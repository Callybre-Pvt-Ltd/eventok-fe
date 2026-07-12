import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { photography } from '@/design-system/tokens/photography';
import {
  DetailImageWrap,
  EditorialCopy,
  EditorialCta,
  EditorialGrid,
  EditorialLead,
  EditorialSection,
  EditorialTitle,
  MainImageWrap,
  RatingBadge,
} from './styled';

export function LuxuryEditorial() {
  const { t } = useTranslation();

  return (
    <EditorialSection>
      <EditorialGrid>
        <MainImageWrap>
          <img src={photography.weddings[0]} alt="" loading="lazy" />
          <RatingBadge>
            <Star size={14} fill="currentColor" />
            {t('landing.luxuryEditorialRating')}
          </RatingBadge>
        </MainImageWrap>

        <EditorialCopy>
          <EditorialTitle>{t('landing.luxuryEditorialTitle')}</EditorialTitle>
          <EditorialLead>{t('landing.luxuryEditorialLead')}</EditorialLead>
          <EditorialCta to={ROUTES.ABOUT}>
            {t('landing.luxuryLearnMore')}
          </EditorialCta>
        </EditorialCopy>

        <DetailImageWrap>
          <img src={photography.weddings[3]} alt="" loading="lazy" />
        </DetailImageWrap>
      </EditorialGrid>
    </EditorialSection>
  );
}
