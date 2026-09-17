import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CATALOG_MAX_PRICE } from '@/constants/catalog';
import { formatPrice } from '@/utils/storefront/pricing';
import { useFiltersPanel } from './helper';
import {
  Checkbox,
  Group,
  GroupHead,
  GroupTitle,
  GroupValue,
  Head,
  HeadTitle,
  Panel,
  RangeLabels,
  ResetButton,
  Slider,
  TagList,
  TagRow,
} from './styled';

interface FiltersPanelProps {
  maxPrice: number;
  selectedTags: string[];
  onPriceChange: (value: number) => void;
  onTagToggle: (tag: string) => void;
  onReset: () => void;
}

export function FiltersPanel({
  maxPrice,
  selectedTags,
  onPriceChange,
  onTagToggle,
  onReset,
}: FiltersPanelProps) {
  const { t } = useTranslation();
  const { tags } = useFiltersPanel();

  return (
    <Panel>
      <Head>
        <HeadTitle>
          <SlidersHorizontal size={16} />
          {t('storefront.shopFilters')}
        </HeadTitle>
        <ResetButton
          type="button"
          onClick={onReset}
          aria-label={t('storefront.shopReset')}
        >
          <RotateCcw size={16} />
        </ResetButton>
      </Head>

      <Group>
        <GroupHead>
          <GroupTitle>{t('storefront.shopPriceRange')}</GroupTitle>
          <GroupValue>{formatPrice(maxPrice)}</GroupValue>
        </GroupHead>
        <Slider
          type="range"
          min={0}
          max={CATALOG_MAX_PRICE}
          step={500}
          value={maxPrice}
          onChange={event => onPriceChange(Number(event.target.value))}
          aria-label={t('storefront.shopPriceRange')}
        />
        <RangeLabels>
          <span>{formatPrice(0)}</span>
          <span>{formatPrice(CATALOG_MAX_PRICE)}</span>
        </RangeLabels>
      </Group>

      <Group>
        <GroupHead>
          <GroupTitle>{t('storefront.shopTags')}</GroupTitle>
        </GroupHead>
        <TagList>
          {tags.map(tag => (
            <TagRow key={tag}>
              <Checkbox
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => onTagToggle(tag)}
              />
              {tag}
            </TagRow>
          ))}
        </TagList>
      </Group>
    </Panel>
  );
}
