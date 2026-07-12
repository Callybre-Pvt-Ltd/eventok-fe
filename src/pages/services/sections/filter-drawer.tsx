import { useEffect, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  availabilityOptions,
  budgetPresets,
  categoryOptions,
  cityOptions,
  defaultFilters,
  eventTypeOptions,
  getBudgetPresetId,
  getGuestPresetId,
  guestPresets,
  languageOptions,
  ratingOptions,
  toggleValue,
  yearsOptions,
  type DiscoveryFilters,
} from '../filters';
import {
  Accordion,
  AccordionBody,
  CheckChip,
  CheckGrid,
  Drawer,
  DrawerBody,
  DrawerFoot,
  DrawerGhost,
  DrawerHead,
  DrawerOverlay,
  DrawerPrimary,
  Field,
  FieldInput,
  FieldLabel,
  Segmented,
  SegmentedBtn,
  Toggle,
  ToggleRow,
} from '../styled';

interface FilterDrawerProps {
  open: boolean;
  mode: 'mobile' | 'more';
  onClose: () => void;
  filters: DiscoveryFilters;
  patch: (partial: Partial<DiscoveryFilters>) => void;
  clearAll: () => void;
  resultCount: number;
  /** Live count for draft filters (mobile apply preview). */
  countForDraft?: (draft: DiscoveryFilters) => number;
}

export function DiscoveryFilterDrawer({
  open,
  mode,
  onClose,
  filters,
  patch,
  clearAll,
  resultCount,
  countForDraft,
}: FilterDrawerProps) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(filters);
  void clearAll;

  useEffect(() => {
    if (open) setDraft(filters);
  }, [open, filters]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const title =
    mode === 'more'
      ? t('servicesPage.moreFilters')
      : t('servicesPage.filtersLabel');

  const set = (partial: Partial<DiscoveryFilters>) => {
    setDraft(prev => ({ ...prev, ...partial }));
  };

  const budgetId = getBudgetPresetId(draft.budgetMin, draft.budgetMax);
  const guestId = getGuestPresetId(draft.guestCount);
  const previewCount = countForDraft ? countForDraft(draft) : resultCount;

  const apply = () => {
    patch(draft);
    onClose();
  };

  const clear = () => {
    setDraft({
      ...defaultFilters,
      query: draft.query,
      sort: draft.sort,
    });
  };

  return (
    <>
      <DrawerOverlay $open={open} onClick={onClose} aria-hidden={!open} />
      <Drawer
        $open={open}
        $sheet
        role="dialog"
        aria-modal="true"
        aria-label={title}
        aria-hidden={!open}
      >
        <DrawerHead>
          <div>
            <span className="handle" aria-hidden />
            <h2>{title}</h2>
          </div>
          <DrawerGhost type="button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </DrawerGhost>
        </DrawerHead>

        <DrawerBody>
          <Accordion open>
            <summary>
              {t('servicesPage.categoryLabel')}
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <CheckGrid>
                {categoryOptions.map(opt => (
                  <CheckChip
                    key={opt.value}
                    type="button"
                    $on={draft.categories.includes(opt.value)}
                    aria-pressed={draft.categories.includes(opt.value)}
                    onClick={() =>
                      set({
                        categories: toggleValue(draft.categories, opt.value),
                      })
                    }
                  >
                    {opt.label}
                  </CheckChip>
                ))}
              </CheckGrid>
            </AccordionBody>
          </Accordion>

          <Accordion open>
            <summary>
              {t('servicesPage.locationLabel')}
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <CheckGrid>
                {cityOptions.map(opt => (
                  <CheckChip
                    key={opt.value}
                    type="button"
                    $on={draft.cities.includes(opt.value)}
                    aria-pressed={draft.cities.includes(opt.value)}
                    onClick={() =>
                      set({
                        cities: toggleValue(draft.cities, opt.value),
                      })
                    }
                  >
                    {opt.label}
                  </CheckChip>
                ))}
              </CheckGrid>
            </AccordionBody>
          </Accordion>

          <Accordion open>
            <summary>
              {t('servicesPage.budgetLabel')}
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <Segmented>
                {budgetPresets.map(opt => (
                  <SegmentedBtn
                    key={opt.id}
                    type="button"
                    $on={budgetId === opt.id}
                    aria-pressed={budgetId === opt.id}
                    onClick={() =>
                      set({ budgetMin: opt.min, budgetMax: opt.max })
                    }
                  >
                    {opt.label}
                  </SegmentedBtn>
                ))}
              </Segmented>
            </AccordionBody>
          </Accordion>

          <Accordion>
            <summary>
              Event Type
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <CheckGrid>
                {eventTypeOptions.map(opt => (
                  <CheckChip
                    key={opt.value}
                    type="button"
                    $on={draft.eventTypes.includes(opt.value)}
                    aria-pressed={draft.eventTypes.includes(opt.value)}
                    onClick={() =>
                      set({
                        eventTypes: toggleValue(draft.eventTypes, opt.value),
                      })
                    }
                  >
                    {opt.label}
                  </CheckChip>
                ))}
              </CheckGrid>
            </AccordionBody>
          </Accordion>

          <Accordion>
            <summary>
              Trust
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <ToggleRow>
                <Toggle
                  type="button"
                  $on={draft.verifiedOnly}
                  aria-pressed={draft.verifiedOnly}
                  onClick={() => set({ verifiedOnly: !draft.verifiedOnly })}
                >
                  {t('servicesPage.verifiedOnly')}
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.featuredOnly}
                  aria-pressed={draft.featuredOnly}
                  onClick={() => set({ featuredOnly: !draft.featuredOnly })}
                >
                  {t('servicesPage.featuredOnly')}
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.trending}
                  aria-pressed={draft.trending}
                  onClick={() => set({ trending: !draft.trending })}
                >
                  {t('servicesPage.trendingOnly')}
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.recentlyAdded}
                  aria-pressed={draft.recentlyAdded}
                  onClick={() => set({ recentlyAdded: !draft.recentlyAdded })}
                >
                  Recently Added
                </Toggle>
              </ToggleRow>
            </AccordionBody>
          </Accordion>

          <Accordion>
            <summary>
              {t('servicesPage.ratingLabel')}
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <Segmented>
                {ratingOptions.map(opt => (
                  <SegmentedBtn
                    key={opt.value}
                    type="button"
                    $on={draft.ratingMin === opt.value}
                    aria-pressed={draft.ratingMin === opt.value}
                    onClick={() => set({ ratingMin: opt.value })}
                  >
                    {opt.label}
                  </SegmentedBtn>
                ))}
              </Segmented>
            </AccordionBody>
          </Accordion>

          <Accordion>
            <summary>
              {t('servicesPage.guestsLabel')}
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <Segmented>
                {guestPresets.map(opt => (
                  <SegmentedBtn
                    key={opt.id}
                    type="button"
                    $on={guestId === opt.id}
                    aria-pressed={guestId === opt.id}
                    onClick={() => set({ guestCount: opt.guestCount })}
                  >
                    {opt.label}
                  </SegmentedBtn>
                ))}
              </Segmented>
            </AccordionBody>
          </Accordion>

          <Accordion>
            <summary>
              {t('servicesPage.yearsLabel')}
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <Segmented>
                {yearsOptions.map(opt => (
                  <SegmentedBtn
                    key={opt.value}
                    type="button"
                    $on={draft.yearsMin === opt.value}
                    aria-pressed={draft.yearsMin === opt.value}
                    onClick={() => set({ yearsMin: opt.value })}
                  >
                    {opt.label}
                  </SegmentedBtn>
                ))}
              </Segmented>
            </AccordionBody>
          </Accordion>

          <Accordion>
            <summary>
              {t('servicesPage.availabilityLabel')}
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <Segmented>
                {availabilityOptions.map(opt => (
                  <SegmentedBtn
                    key={opt.value}
                    type="button"
                    $on={draft.availability === opt.value}
                    aria-pressed={draft.availability === opt.value}
                    onClick={() =>
                      set({
                        availability:
                          opt.value as DiscoveryFilters['availability'],
                      })
                    }
                  >
                    {opt.label}
                  </SegmentedBtn>
                ))}
              </Segmented>
              {draft.availability === 'date' ? (
                <Field>
                  Date
                  <FieldInput
                    type="date"
                    value={draft.availableDate}
                    onChange={e => set({ availableDate: e.target.value })}
                  />
                </Field>
              ) : null}
              <FieldLabel>Languages</FieldLabel>
              <CheckGrid>
                {languageOptions.map(opt => (
                  <CheckChip
                    key={opt.value}
                    type="button"
                    $on={draft.languages.includes(opt.value)}
                    aria-pressed={draft.languages.includes(opt.value)}
                    onClick={() =>
                      set({
                        languages: toggleValue(draft.languages, opt.value),
                      })
                    }
                  >
                    {opt.label}
                  </CheckChip>
                ))}
              </CheckGrid>
            </AccordionBody>
          </Accordion>

          <Accordion>
            <summary>
              Style
              <ChevronDown size={16} aria-hidden />
            </summary>
            <AccordionBody>
              <ToggleRow>
                <Toggle
                  type="button"
                  $on={draft.destinationOnly}
                  aria-pressed={draft.destinationOnly}
                  onClick={() =>
                    set({ destinationOnly: !draft.destinationOnly })
                  }
                >
                  Destination
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.luxuryOnly}
                  aria-pressed={draft.luxuryOnly}
                  onClick={() => set({ luxuryOnly: !draft.luxuryOnly })}
                >
                  Luxury
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.outdoor}
                  aria-pressed={draft.outdoor}
                  onClick={() => set({ outdoor: !draft.outdoor })}
                >
                  Outdoor
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.indoor}
                  aria-pressed={draft.indoor}
                  onClick={() => set({ indoor: !draft.indoor })}
                >
                  Indoor
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.traditional}
                  aria-pressed={draft.traditional}
                  onClick={() => set({ traditional: !draft.traditional })}
                >
                  Traditional
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.modern}
                  aria-pressed={draft.modern}
                  onClick={() => set({ modern: !draft.modern })}
                >
                  Modern
                </Toggle>
                <Toggle
                  type="button"
                  $on={draft.premium}
                  aria-pressed={draft.premium}
                  onClick={() => set({ premium: !draft.premium })}
                >
                  Premium
                </Toggle>
              </ToggleRow>
            </AccordionBody>
          </Accordion>
        </DrawerBody>

        <DrawerFoot>
          <DrawerGhost type="button" onClick={clear}>
            {t('servicesPage.clearAll')}
          </DrawerGhost>
          <DrawerPrimary type="button" onClick={apply}>
            {t('servicesPage.applyFilters')} ({previewCount})
          </DrawerPrimary>
        </DrawerFoot>
      </Drawer>
    </>
  );
}
