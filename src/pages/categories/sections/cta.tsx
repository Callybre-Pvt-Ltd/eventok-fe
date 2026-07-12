import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import {
  CtaActions,
  CtaLead,
  CtaPrimary,
  CtaSecondary,
  CtaSection,
  CtaTitle,
} from '../styled';

export function CategoriesCta() {
  const { t } = useTranslation();

  return (
    <CtaSection>
      <CtaTitle>{t('categoriesPage.ctaTitle')}</CtaTitle>
      <CtaLead>{t('categoriesPage.ctaLead')}</CtaLead>
      <CtaActions>
        <CtaPrimary to={ROUTES.CATEGORIES}>
          {t('categoriesPage.ctaBrowse')}
        </CtaPrimary>
        <CtaSecondary to={ROUTES.CONTACT}>
          {t('categoriesPage.ctaContact')}
        </CtaSecondary>
      </CtaActions>
    </CtaSection>
  );
}
