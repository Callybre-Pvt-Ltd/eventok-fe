import { useTranslation } from 'react-i18next';
import { HorizontalRail, SectionShell, StoryHeader } from '@/design-system';
import { ROUTES } from '@/constants/routes';
import { useCategoryDiscovery } from './helper';
import {
  CategoryTile,
  TileMeta,
  TilePhoto,
  TileLabel,
  TileCount,
} from './styled';

export function CategoryDiscovery() {
  const { t } = useTranslation();
  const { colors, categories } = useCategoryDiscovery();

  return (
    <SectionShell
      pattern={{
        variant: 'rail',
        bg: 'default',
        alignment: 'left',
        density: 'balanced',
        flowOut: 'continue',
      }}
      id="categories"
    >
      <StoryHeader
        eyebrow={t('landing.browseEyebrow')}
        title={t('landing.categoriesTitle')}
        lead={t('landing.categoriesSubtitle')}
      />
      <HorizontalRail>
        {categories.map(cat => (
          <CategoryTile
            key={cat.slug}
            to={`${ROUTES.SERVICES}?type=${cat.slug}`}
            $colors={colors}
          >
            <TilePhoto src={cat.photo} alt="" loading="lazy" />
            <TileMeta>
              <TileLabel>{t(`landing.${cat.labelKey}`)}</TileLabel>
              <TileCount>
                {cat.count} {t('landing.categoryProducts')}
              </TileCount>
            </TileMeta>
          </CategoryTile>
        ))}
      </HorizontalRail>
    </SectionShell>
  );
}
