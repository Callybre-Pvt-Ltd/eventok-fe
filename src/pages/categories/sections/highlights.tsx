import { ShieldCheck, Sparkles, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  HighlightDesc,
  HighlightIcon,
  HighlightItem,
  HighlightsGrid,
  HighlightsSection,
  HighlightTitle,
  SectionEyebrow,
  SectionIntro,
  SectionTitle,
} from '../styled';

const highlights = [
  {
    key: '1',
    icon: ShieldCheck,
    titleKey: 'categoriesPage.highlight1Title',
    descKey: 'categoriesPage.highlight1Desc',
  },
  {
    key: '2',
    icon: Sparkles,
    titleKey: 'categoriesPage.highlight2Title',
    descKey: 'categoriesPage.highlight2Desc',
  },
  {
    key: '3',
    icon: Users,
    titleKey: 'categoriesPage.highlight3Title',
    descKey: 'categoriesPage.highlight3Desc',
  },
] as const;

export function CategoriesHighlights() {
  const { t } = useTranslation();

  return (
    <HighlightsSection>
      <SectionIntro>
        <SectionEyebrow>{t('categoriesPage.highlightsEyebrow')}</SectionEyebrow>
        <SectionTitle>{t('categoriesPage.highlightsTitle')}</SectionTitle>
      </SectionIntro>
      <HighlightsGrid>
        {highlights.map(({ key, icon: Icon, titleKey, descKey }) => (
          <HighlightItem key={key}>
            <HighlightIcon>
              <Icon size={20} strokeWidth={1.5} />
            </HighlightIcon>
            <HighlightTitle>{t(titleKey)}</HighlightTitle>
            <HighlightDesc>{t(descKey)}</HighlightDesc>
          </HighlightItem>
        ))}
      </HighlightsGrid>
    </HighlightsSection>
  );
}
