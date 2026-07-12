import { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  budgetPresets,
  categoryOptions,
  cityOptions,
  getBudgetPresetId,
  getResultsContext,
  getSortLabel,
  searchSuggestions,
  sortOptions,
  type DiscoveryFilters,
} from '../filters';
import { MultiSelect } from './multi-select';
import {
  ActivePills,
  ClearBtn,
  ContextLine,
  DesktopFilters,
  Field,
  FilterCount,
  FilterShell,
  IconToolBtn,
  MetaLeft,
  MetaRow,
  MobileToolbar,
  MoreFiltersBtn,
  Pill,
  ResultsCount,
  SearchField,
  SearchWrap,
  Select,
  SortHint,
  StickyCluster,
  SuggestItem,
  SuggestList,
} from '../styled';

interface FilterBarProps {
  filters: DiscoveryFilters;
  patch: (partial: Partial<DiscoveryFilters>) => void;
  clearAll: () => void;
  removePill: (key: string) => void;
  pills: { key: string; label: string }[];
  activeFilterCount: number;
  resultCount: number;
  onOpenMobileFilters: () => void;
  onOpenMoreFilters: () => void;
  onOpenSort: () => void;
}

export function DiscoveryFilterBar({
  filters,
  patch,
  clearAll,
  removePill,
  pills,
  activeFilterCount,
  resultCount,
  onOpenMobileFilters,
  onOpenMoreFilters,
  onOpenSort,
}: FilterBarProps) {
  const { t } = useTranslation();
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const suggestions = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const list = [...searchSuggestions];
    if (!q) return list.slice(0, 6);
    return list.filter(item => item.toLowerCase().includes(q)).slice(0, 8);
  }, [filters.query]);

  const budgetId = getBudgetPresetId(filters.budgetMin, filters.budgetMax);
  const context = getResultsContext(filters);

  const renderSearch = (tall: boolean) => (
    <SearchWrap>
      <SearchField $tall={tall}>
        <Search aria-hidden />
        <input
          type="search"
          value={filters.query}
          onChange={e => {
            patch({ query: e.target.value });
            setSuggestOpen(true);
          }}
          onFocus={() => setSuggestOpen(true)}
          onBlur={() => window.setTimeout(() => setSuggestOpen(false), 120)}
          placeholder={t('servicesPage.searchPlaceholder')}
          aria-label={t('servicesPage.searchPlaceholder')}
          aria-autocomplete="list"
        />
      </SearchField>
      {suggestOpen && suggestions.length > 0 ? (
        <SuggestList>
          {suggestions.map(item => (
            <li key={item}>
              <SuggestItem
                type="button"
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  patch({ query: item });
                  setSuggestOpen(false);
                }}
              >
                {item}
              </SuggestItem>
            </li>
          ))}
        </SuggestList>
      ) : null}
    </SearchWrap>
  );

  return (
    <StickyCluster data-disc-filter $compact={compact}>
      <FilterShell $compact={compact}>
        <MobileToolbar>
          {renderSearch(true)}
          <IconToolBtn
            type="button"
            onClick={onOpenMobileFilters}
            aria-label={t('servicesPage.filtersLabel')}
          >
            <SlidersHorizontal size={18} aria-hidden />
            {activeFilterCount > 0 ? (
              <FilterCount>{activeFilterCount}</FilterCount>
            ) : null}
          </IconToolBtn>
          <IconToolBtn
            type="button"
            onClick={onOpenSort}
            aria-label={t('servicesPage.sortLabel')}
          >
            <ArrowUpDown size={18} aria-hidden />
          </IconToolBtn>
        </MobileToolbar>

        <DesktopFilters>
          {renderSearch(false)}
          <MultiSelect
            label={t('servicesPage.categoryLabel')}
            options={categoryOptions}
            values={filters.categories}
            onChange={categories => patch({ categories })}
            placeholder="Any"
          />
          <MultiSelect
            label={t('servicesPage.locationLabel')}
            options={cityOptions}
            values={filters.cities}
            onChange={cities => patch({ cities })}
            placeholder="Any"
          />
          <Field>
            {t('servicesPage.budgetLabel')}
            <Select
              value={budgetId}
              onChange={e => {
                const preset = budgetPresets.find(p => p.id === e.target.value);
                if (!preset) return;
                patch({ budgetMin: preset.min, budgetMax: preset.max });
              }}
            >
              {budgetPresets.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field>
            {t('servicesPage.sortLabel')}
            <Select
              value={filters.sort}
              onChange={e =>
                patch({ sort: e.target.value as DiscoveryFilters['sort'] })
              }
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </Field>
          <MoreFiltersBtn type="button" onClick={onOpenMoreFilters}>
            <SlidersHorizontal size={15} aria-hidden />
            {t('servicesPage.moreFilters')}
            {activeFilterCount > 0 ? (
              <FilterCount>{activeFilterCount}</FilterCount>
            ) : null}
          </MoreFiltersBtn>
        </DesktopFilters>

        {pills.length > 0 ? (
          <ActivePills>
            {pills.map(pill => (
              <Pill
                key={pill.key}
                type="button"
                onClick={() => removePill(pill.key)}
                aria-label={`Remove ${pill.label}`}
              >
                {pill.label}
                <X aria-hidden />
              </Pill>
            ))}
            <ClearBtn type="button" onClick={clearAll}>
              {t('servicesPage.clearAll')}
            </ClearBtn>
          </ActivePills>
        ) : null}

        <MetaRow>
          <MetaLeft>
            <ResultsCount>
              {t('servicesPage.foundVerified', { count: resultCount })}
            </ResultsCount>
            <SortHint>
              {t('servicesPage.sortedBy', {
                sort: getSortLabel(filters.sort),
              })}
            </SortHint>
            {context ? <ContextLine>{context}</ContextLine> : null}
          </MetaLeft>
        </MetaRow>
      </FilterShell>
    </StickyCluster>
  );
}
