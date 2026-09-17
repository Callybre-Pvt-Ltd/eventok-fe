import { useTranslation } from 'react-i18next';
import {
  Section,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { categoryIcon } from '@/utils/storefront/icons';
import { useCategoryTiles } from './helper';
import { Grid, IconCircle, Tile, TileMeta, TileName } from './styled';

interface CategoryTilesProps {
  limit?: number;
  tint?: boolean;
  hrefPrefix?: string;
}

export function CategoryTiles({
  limit,
  tint = true,
  hrefPrefix = '/category',
}: CategoryTilesProps) {
  const { t } = useTranslation();
  const { categories } = useCategoryTiles(limit);

  return (
    <Section $tint={tint}>
      <SectionInner>
        <SectionTitle>{t('storefront.builderTitle')}</SectionTitle>
        <SectionSubtitle>{t('storefront.builderSubtitle')}</SectionSubtitle>
        <Grid>
          {categories.map(category => {
            const Icon = categoryIcon(category.icon);
            return (
              <Tile key={category.id} to={`${hrefPrefix}/${category.slug}`}>
                <IconCircle>
                  <Icon size={22} />
                </IconCircle>
                <TileName>{category.name}</TileName>
                <TileMeta>
                  {t('storefront.builderServicesAvailable', {
                    count: category.serviceCount,
                  })}
                </TileMeta>
              </Tile>
            );
          })}
        </Grid>
      </SectionInner>
    </Section>
  );
}
