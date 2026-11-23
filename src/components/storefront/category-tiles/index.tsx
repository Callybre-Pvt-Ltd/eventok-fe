import { useMemo, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Section,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { EVENT_TYPE_FILTERS } from '@/constants/catalog';
import { getCategoryPhoto } from '@/pages/categories/helper';
import { fadeUp, staggerContainer, viewportOnce } from '@/utils/motion';
import type { CatalogEventType } from '@/types/catalog';
import { useCategoryTiles } from './helper';
import {
  EyebrowBadge,
  FilterContainer,
  FilterPill,
  FilterScroll,
  Grid,
  HeaderWrap,
  Tile,
  TileAction,
  TileBadge,
  TileBody,
  TileImage,
  TileMedia,
  TileName,
  TileOverlay,
  TileSubtitle,
  TileTitleWrap,
} from './styled';

interface CategoryTilesProps {
  limit?: number;
  tint?: boolean;
  hrefPrefix?: string;
}

const EVENT_TYPE_LABELS: Record<CatalogEventType, string> = {
  wedding: 'Wedding',
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  'baby-shower': 'Baby Shower',
  corporate: 'Corporate',
  'home-decoration': 'Home Decor',
};

export function CategoryTiles({
  limit,
  tint = true,
  hrefPrefix = '/category',
}: CategoryTilesProps) {
  const { t } = useTranslation();
  const { categories } = useCategoryTiles(limit);
  const [activeFilter, setActiveFilter] = useState<CatalogEventType | 'all'>(
    'all',
  );

  const filteredCategories = useMemo(() => {
    if (activeFilter === 'all') return categories;
    return categories.filter(category => category.eventType === activeFilter);
  }, [categories, activeFilter]);

  return (
    <Section $tint={tint}>
      <SectionInner>
        <HeaderWrap>
          <EyebrowBadge>
            <Sparkles size={13} />
            <span>
              {t('storefront.builderEyebrow', 'Custom Event Packages')}
            </span>
          </EyebrowBadge>
          <SectionTitle>{t('storefront.builderTitle')}</SectionTitle>
          <SectionSubtitle>{t('storefront.builderSubtitle')}</SectionSubtitle>
        </HeaderWrap>

        <FilterContainer>
          <FilterScroll>
            {EVENT_TYPE_FILTERS.map(filter => (
              <FilterPill
                key={filter.value}
                type="button"
                $active={activeFilter === filter.value}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </FilterPill>
            ))}
          </FilterScroll>
        </FilterContainer>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Grid>
            <AnimatePresence mode="popLayout">
              {filteredCategories.map(category => {
                const photo = getCategoryPhoto(category.slug);
                const badgeLabel =
                  EVENT_TYPE_LABELS[category.eventType] || 'Celebration';

                return (
                  <motion.div
                    key={category.id}
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Tile to={`${hrefPrefix}/${category.slug}`}>
                      <TileMedia>
                        <TileBadge>{badgeLabel}</TileBadge>
                        <TileImage
                          src={photo}
                          alt={category.name}
                          loading="lazy"
                        />
                        <TileOverlay />
                      </TileMedia>
                      <TileBody>
                        <TileTitleWrap>
                          <TileName>{category.name}</TileName>
                          <TileSubtitle>Explore packages</TileSubtitle>
                        </TileTitleWrap>
                        <TileAction aria-hidden="true">
                          <ArrowRight size={14} />
                        </TileAction>
                      </TileBody>
                    </Tile>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </Grid>
        </motion.div>
      </SectionInner>
    </Section>
  );
}
