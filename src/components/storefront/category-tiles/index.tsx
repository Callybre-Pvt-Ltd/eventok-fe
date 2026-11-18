import { useTranslation } from 'react-i18next';
import {
  Section,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { getCategoryPhoto } from '@/pages/categories/helper';
import { useCategoryTiles } from './helper';
import {
  Grid,
  HeaderWrap,
  Tile,
  TileBody,
  TileImage,
  TileMedia,
  TileName,
  TileOverlay,
} from './styled';

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
        <HeaderWrap>
          <SectionTitle>{t('storefront.builderTitle')}</SectionTitle>
          <SectionSubtitle>{t('storefront.builderSubtitle')}</SectionSubtitle>
        </HeaderWrap>
        <Grid>
          {categories.map(category => {
            const photo = getCategoryPhoto(category.slug);

            return (
              <Tile key={category.id} to={`${hrefPrefix}/${category.slug}`}>
                <TileMedia>
                  <TileImage src={photo} alt={category.name} loading="lazy" />
                  <TileOverlay />
                </TileMedia>
                <TileBody>
                  <TileName>{category.name}</TileName>
                </TileBody>
              </Tile>
            );
          })}
        </Grid>
      </SectionInner>
    </Section>
  );
}
