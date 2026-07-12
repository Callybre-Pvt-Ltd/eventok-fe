import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { HeroSearch } from './hero-search';
import { useEditorialHero } from './helper';
import {
  Section,
  Inner,
  CopyColumn,
  Header,
  Eyebrow,
  Title,
  Lead,
  CategoryRow,
  CategoryPill,
  Mosaic,
  MosaicItem,
  MosaicStack,
  MosaicSmall,
} from './styled';

export function EditorialHero() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const {
    fields,
    updateField,
    handleSearch,
    goToCategory,
    images,
    categories,
  } = useEditorialHero();

  const [main, catering, venue] = images;

  return (
    <Section $palette={palette} id="hero">
      <Inner>
        <CopyColumn>
          <Header>
            <Eyebrow>{t('landing.heroBadge')}</Eyebrow>
            <Title $palette={palette}>{t('landing.heroTitle')}</Title>
            <Lead $palette={palette}>{t('landing.heroSubtitle')}</Lead>
          </Header>

          <HeroSearch
            fields={fields}
            onUpdate={updateField}
            onSearch={handleSearch}
          />

          <CategoryRow>
            {categories.map(cat => (
              <CategoryPill
                key={cat.slug}
                type="button"
                onClick={() => goToCategory(cat.slug)}
              >
                {t(`landing.${cat.labelKey}`)}
              </CategoryPill>
            ))}
          </CategoryRow>
        </CopyColumn>

        <Mosaic>
          <MosaicItem $wide>
            <img src={main.src} alt={main.alt} loading="eager" />
          </MosaicItem>
          <MosaicStack>
            <MosaicSmall>
              <img src={catering.src} alt={catering.alt} loading="lazy" />
            </MosaicSmall>
            <MosaicSmall>
              <img src={venue.src} alt={venue.alt} loading="lazy" />
            </MosaicSmall>
          </MosaicStack>
        </Mosaic>
      </Inner>
    </Section>
  );
}
