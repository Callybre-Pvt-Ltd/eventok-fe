import {
  Check,
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  BUDGET_PRESETS,
  CATALOG_MAX_PRICE,
  EVENT_TYPE_FILTERS,
  SORT_OPTIONS,
} from '@/constants/catalog';
import type { CatalogEventType, CatalogSortOption } from '@/types/catalog';
import { formatPrice } from '@/utils/storefront/pricing';
import { useFiltersPanel } from './helper';
import {
  ActiveBadge,
  ChevronIcon,
  CustomCheck,
  EmptyHint,
  Group,
  GroupBody,
  GroupTitle,
  GroupTitleWrap,
  GroupToggle,
  Head,
  HeadMeta,
  HeadTitle,
  HiddenCheckbox,
  MiniSearchIcon,
  MiniSearchInput,
  MiniSearchWrap,
  Panel,
  PresetGrid,
  PresetPill,
  PriceDash,
  PriceInput,
  PriceInputBox,
  PriceInputLabel,
  PriceInputsRow,
  RangeLabels,
  ResetButton,
  SectionCount,
  Slider,
  TagCount,
  TagLabel,
  TagLeft,
  TagList,
  TagRow,
} from './styled';

interface FiltersPanelProps {
  minPrice: number;
  maxPrice: number;
  selectedTags: string[];
  eventType: CatalogEventType | 'all';
  sort: CatalogSortOption;
  hasPhotosOnly: boolean;
  hasInclusionsOnly: boolean;
  hasPolicyOnly: boolean;
  activeFilterCount: number;
  inSheet?: boolean;
  onPriceRangeChange: (min: number, max: number) => void;
  onTagToggle: (tag: string) => void;
  onEventTypeChange?: (value: CatalogEventType | 'all') => void;
  onSortChange?: (value: CatalogSortOption) => void;
  onTogglePref: (pref: 'photos' | 'included' | 'flexible') => void;
  onReset: () => void;
}

export function FiltersPanel({
  minPrice,
  maxPrice,
  selectedTags,
  eventType,
  sort,
  hasPhotosOnly,
  hasInclusionsOnly,
  hasPolicyOnly,
  activeFilterCount,
  inSheet = false,
  onPriceRangeChange,
  onTagToggle,
  onEventTypeChange,
  onSortChange,
  onTogglePref,
  onReset,
}: FiltersPanelProps) {
  const { t } = useTranslation();
  const panel = useFiltersPanel(eventType);

  const budgetModified = minPrice > 0 || maxPrice < CATALOG_MAX_PRICE;
  const prefsCount =
    Number(hasPhotosOnly) + Number(hasInclusionsOnly) + Number(hasPolicyOnly);

  const preferences = [
    {
      key: 'photos' as const,
      label: t('storefront.shopPrefPhotos'),
      checked: hasPhotosOnly,
    },
    {
      key: 'included' as const,
      label: t('storefront.shopPrefInclusions'),
      checked: hasInclusionsOnly,
    },
    {
      key: 'flexible' as const,
      label: t('storefront.shopPrefPolicy'),
      checked: hasPolicyOnly,
    },
  ];

  const handleMinChange = (raw: string) => {
    const parsed = Math.max(0, Math.min(Number(raw) || 0, maxPrice));
    onPriceRangeChange(parsed, maxPrice);
  };

  const handleMaxChange = (raw: string) => {
    const parsed = Math.max(
      minPrice,
      Math.min(Number(raw) || 0, CATALOG_MAX_PRICE),
    );
    onPriceRangeChange(minPrice, parsed);
  };

  return (
    <Panel $inSheet={inSheet}>
      {!inSheet && (
        <Head>
          <HeadTitle>
            <SlidersHorizontal size={16} />
            {t('storefront.shopFilters')}
          </HeadTitle>
          <HeadMeta>
            {activeFilterCount > 0 && (
              <ActiveBadge>
                {t('storefront.shopActiveCount', { count: activeFilterCount })}
              </ActiveBadge>
            )}
            <ResetButton
              type="button"
              onClick={onReset}
              disabled={activeFilterCount === 0}
              $visible={activeFilterCount > 0}
              aria-label={t('storefront.shopReset')}
            >
              <RotateCcw size={13} />
              <span>{t('storefront.shopClearAll')}</span>
            </ResetButton>
          </HeadMeta>
        </Head>
      )}

      {inSheet && onSortChange && (
        <Group>
          <GroupToggle
            type="button"
            onClick={() => panel.toggleSection('sort')}
            aria-expanded={panel.openSections.sort}
          >
            <GroupTitleWrap>
              <GroupTitle>{t('storefront.shopSortBy')}</GroupTitle>
            </GroupTitleWrap>
            <ChevronIcon $open={panel.openSections.sort}>
              <ChevronDown size={15} />
            </ChevronIcon>
          </GroupToggle>
          <GroupBody $open={panel.openSections.sort}>
            <PresetGrid>
              {SORT_OPTIONS.map(opt => (
                <PresetPill
                  key={opt.value}
                  type="button"
                  $active={sort === opt.value}
                  onClick={() => onSortChange(opt.value)}
                >
                  {opt.label}
                </PresetPill>
              ))}
            </PresetGrid>
          </GroupBody>
        </Group>
      )}

      {inSheet && onEventTypeChange && (
        <Group>
          <GroupToggle
            type="button"
            onClick={() => panel.toggleSection('eventType')}
            aria-expanded={panel.openSections.eventType}
          >
            <GroupTitleWrap>
              <GroupTitle>{t('storefront.shopEventType')}</GroupTitle>
              {eventType !== 'all' && <SectionCount>1</SectionCount>}
            </GroupTitleWrap>
            <ChevronIcon $open={panel.openSections.eventType}>
              <ChevronDown size={15} />
            </ChevronIcon>
          </GroupToggle>
          <GroupBody $open={panel.openSections.eventType}>
            <PresetGrid>
              {EVENT_TYPE_FILTERS.map(filter => (
                <PresetPill
                  key={filter.value}
                  type="button"
                  $active={eventType === filter.value}
                  onClick={() => onEventTypeChange(filter.value)}
                >
                  {filter.label}
                </PresetPill>
              ))}
            </PresetGrid>
          </GroupBody>
        </Group>
      )}

      <Group>
        <GroupToggle
          type="button"
          onClick={() => panel.toggleSection('budget')}
          aria-expanded={panel.openSections.budget}
        >
          <GroupTitleWrap>
            <GroupTitle>{t('storefront.shopPriceRange')}</GroupTitle>
            {budgetModified && <SectionCount>1</SectionCount>}
          </GroupTitleWrap>
          <ChevronIcon $open={panel.openSections.budget}>
            <ChevronDown size={15} />
          </ChevronIcon>
        </GroupToggle>
        <GroupBody $open={panel.openSections.budget}>
          <PresetGrid>
            {BUDGET_PRESETS.map(preset => {
              const isSelected =
                minPrice === preset.min && maxPrice === preset.max;
              return (
                <PresetPill
                  key={preset.id}
                  type="button"
                  $active={isSelected}
                  onClick={() => onPriceRangeChange(preset.min, preset.max)}
                >
                  {preset.label}
                </PresetPill>
              );
            })}
          </PresetGrid>

          <PriceInputsRow>
            <PriceInputBox>
              <PriceInputLabel>{t('storefront.shopMinPrice')}</PriceInputLabel>
              <PriceInput
                type="number"
                min={0}
                max={maxPrice}
                step={500}
                value={minPrice}
                onChange={e => handleMinChange(e.target.value)}
                aria-label={t('storefront.shopMinPrice')}
              />
            </PriceInputBox>
            <PriceDash>–</PriceDash>
            <PriceInputBox>
              <PriceInputLabel>{t('storefront.shopMaxPrice')}</PriceInputLabel>
              <PriceInput
                type="number"
                min={minPrice}
                max={CATALOG_MAX_PRICE}
                step={500}
                value={maxPrice}
                onChange={e => handleMaxChange(e.target.value)}
                aria-label={t('storefront.shopMaxPrice')}
              />
            </PriceInputBox>
          </PriceInputsRow>

          <Slider
            type="range"
            $fill={Math.round((maxPrice / CATALOG_MAX_PRICE) * 100)}
            min={0}
            max={CATALOG_MAX_PRICE}
            step={500}
            value={maxPrice}
            onChange={event =>
              onPriceRangeChange(
                Math.min(minPrice, Number(event.target.value)),
                Number(event.target.value),
              )
            }
            aria-label={t('storefront.shopPriceRange')}
          />
          <RangeLabels>
            <span>{formatPrice(minPrice)}</span>
            <span>{formatPrice(maxPrice)}</span>
          </RangeLabels>
        </GroupBody>
      </Group>

      <Group>
        <GroupToggle
          type="button"
          onClick={() => panel.toggleSection('categories')}
          aria-expanded={panel.openSections.categories}
        >
          <GroupTitleWrap>
            <GroupTitle>{t('storefront.shopTags')}</GroupTitle>
            {selectedTags.length > 0 && (
              <SectionCount>{selectedTags.length}</SectionCount>
            )}
          </GroupTitleWrap>
          <ChevronIcon $open={panel.openSections.categories}>
            <ChevronDown size={15} />
          </ChevronIcon>
        </GroupToggle>
        <GroupBody $open={panel.openSections.categories}>
          {panel.totalCategories > 6 && (
            <MiniSearchWrap>
              <MiniSearchIcon>
                <Search size={13} />
              </MiniSearchIcon>
              <MiniSearchInput
                type="search"
                value={panel.categorySearch}
                onChange={e => panel.setCategorySearch(e.target.value)}
                placeholder={t('storefront.shopFilterCategoriesPlaceholder')}
                aria-label={t('storefront.shopFilterCategoriesPlaceholder')}
              />
            </MiniSearchWrap>
          )}
          <TagList>
            {panel.categories.length === 0 ? (
              <EmptyHint>No matching categories</EmptyHint>
            ) : (
              panel.categories.map(category => {
                const checked = selectedTags.includes(category.name);
                return (
                  <TagRow key={category.id} $checked={checked}>
                    <TagLeft>
                      <HiddenCheckbox
                        type="checkbox"
                        checked={checked}
                        onChange={() => onTagToggle(category.name)}
                      />
                      <CustomCheck $checked={checked} aria-hidden>
                        {checked && <Check size={12} strokeWidth={3} />}
                      </CustomCheck>
                      <TagLabel>{category.name}</TagLabel>
                    </TagLeft>
                    {category.serviceCount > 0 && (
                      <TagCount>{category.serviceCount}</TagCount>
                    )}
                  </TagRow>
                );
              })
            )}
          </TagList>
        </GroupBody>
      </Group>

      <Group>
        <GroupToggle
          type="button"
          onClick={() => panel.toggleSection('preferences')}
          aria-expanded={panel.openSections.preferences}
        >
          <GroupTitleWrap>
            <GroupTitle>{t('storefront.shopPreferences')}</GroupTitle>
            {prefsCount > 0 && <SectionCount>{prefsCount}</SectionCount>}
          </GroupTitleWrap>
          <ChevronIcon $open={panel.openSections.preferences}>
            <ChevronDown size={15} />
          </ChevronIcon>
        </GroupToggle>
        <GroupBody $open={panel.openSections.preferences}>
          <TagList>
            {preferences.map(pref => (
              <TagRow key={pref.key} $checked={pref.checked}>
                <TagLeft>
                  <HiddenCheckbox
                    type="checkbox"
                    checked={pref.checked}
                    onChange={() => onTogglePref(pref.key)}
                  />
                  <CustomCheck $checked={pref.checked} aria-hidden>
                    {pref.checked && <Check size={12} strokeWidth={3} />}
                  </CustomCheck>
                  <TagLabel>{pref.label}</TagLabel>
                </TagLeft>
              </TagRow>
            ))}
          </TagList>
        </GroupBody>
      </Group>
    </Panel>
  );
}
