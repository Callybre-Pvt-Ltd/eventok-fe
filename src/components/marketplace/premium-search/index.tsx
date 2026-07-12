import { AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Search,
  Sparkles,
  Tag,
  Users,
  X,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { usePremiumSearch } from './helper';
import {
  Backdrop,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseBtn,
  Fields,
  Field,
  FieldLabel,
  FieldInput,
  Suggestions,
  SuggestionGroup,
  GroupLabel,
  SuggestionChip,
  Footer,
  TriggerBar,
  TriggerInner,
  TriggerPlaceholder,
} from './styled';

interface PremiumSearchProps {
  variant?: 'bar' | 'modal';
}

export function PremiumSearch({ variant = 'bar' }: PremiumSearchProps) {
  const { t } = useTranslation();
  const {
    palette,
    open,
    fields,
    update,
    openModal,
    closeModal,
    search,
    popular,
    recent,
    suggestions,
    applySuggestion,
  } = usePremiumSearch();

  if (variant === 'bar') {
    return (
      <>
        <TriggerBar
          $palette={palette}
          type="button"
          onClick={openModal}
          aria-label={t('marketplace.openSearch')}
        >
          <TriggerInner>
            <Search size={20} />
            <TriggerPlaceholder $palette={palette}>
              {t('marketplace.searchTitle')}
            </TriggerPlaceholder>
          </TriggerInner>
        </TriggerBar>
        <SearchModal
          open={open}
          palette={palette}
          fields={fields}
          update={update}
          close={closeModal}
          search={search}
          popular={popular}
          recent={recent}
          suggestions={suggestions}
          applySuggestion={applySuggestion}
        />
      </>
    );
  }

  return (
    <SearchModal
      open
      palette={palette}
      fields={fields}
      update={update}
      close={closeModal}
      search={search}
      popular={popular}
      recent={recent}
      suggestions={suggestions}
      applySuggestion={applySuggestion}
      inline
    />
  );
}

function SearchModal({
  open,
  palette,
  fields,
  update,
  close,
  search,
  popular,
  recent,
  suggestions,
  applySuggestion,
  inline,
}: {
  open: boolean;
  palette: ReturnType<typeof usePremiumSearch>['palette'];
  fields: ReturnType<typeof usePremiumSearch>['fields'];
  update: ReturnType<typeof usePremiumSearch>['update'];
  close: () => void;
  search: ReturnType<typeof usePremiumSearch>['search'];
  popular: ReturnType<typeof usePremiumSearch>['popular'];
  recent: ReturnType<typeof usePremiumSearch>['recent'];
  suggestions: ReturnType<typeof usePremiumSearch>['suggestions'];
  applySuggestion: ReturnType<typeof usePremiumSearch>['applySuggestion'];
  inline?: boolean;
}) {
  const { t } = useTranslation();

  const content = (
    <Modal
      $palette={palette}
      initial={{ opacity: 0, y: inline ? 0 : 24, scale: inline ? 1 : 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <ModalHeader>
        <ModalTitle $palette={palette}>
          {t('marketplace.searchTitle')}
        </ModalTitle>
        {!inline && (
          <CloseBtn
            type="button"
            onClick={close}
            aria-label={t('marketplace.closeSearch')}
          >
            <X size={20} />
          </CloseBtn>
        )}
      </ModalHeader>

      <Fields>
        <Field $palette={palette}>
          <FieldLabel $palette={palette}>
            <Tag size={14} /> {t('marketplace.searchEventType')}
          </FieldLabel>
          <FieldInput
            $palette={palette}
            value={fields.eventType}
            onChange={e => update('eventType', e.target.value)}
            placeholder="Wedding, Birthday..."
            list="event-suggestions"
          />
        </Field>
        <Field $palette={palette}>
          <FieldLabel $palette={palette}>
            <MapPin size={14} /> {t('marketplace.searchCity')}
          </FieldLabel>
          <FieldInput
            $palette={palette}
            value={fields.city}
            onChange={e => update('city', e.target.value)}
            placeholder="Mumbai, Delhi..."
          />
        </Field>
        <Field $palette={palette}>
          <FieldLabel $palette={palette}>
            <Calendar size={14} /> {t('marketplace.searchDate')}
          </FieldLabel>
          <FieldInput
            $palette={palette}
            type="date"
            value={fields.date}
            onChange={e => update('date', e.target.value)}
          />
        </Field>
        <Field $palette={palette}>
          <FieldLabel $palette={palette}>
            <Users size={14} /> {t('marketplace.searchGuests')}
          </FieldLabel>
          <FieldInput
            $palette={palette}
            type="number"
            min={1}
            value={fields.guests}
            onChange={e => update('guests', e.target.value)}
            placeholder="150"
          />
        </Field>
      </Fields>

      <Suggestions>
        {recent.length > 0 && (
          <SuggestionGroup>
            <GroupLabel $palette={palette}>
              {t('marketplace.recentSearches')}
            </GroupLabel>
            {recent.map(s => (
              <SuggestionChip
                key={s}
                type="button"
                $palette={palette}
                onClick={() => applySuggestion(s)}
              >
                {s}
              </SuggestionChip>
            ))}
          </SuggestionGroup>
        )}
        <SuggestionGroup>
          <GroupLabel $palette={palette}>
            <Sparkles size={12} /> {t('marketplace.popularSearches')}
          </GroupLabel>
          {popular.map(s => (
            <SuggestionChip
              key={s}
              type="button"
              $palette={palette}
              onClick={() => applySuggestion(s)}
            >
              {s}
            </SuggestionChip>
          ))}
        </SuggestionGroup>
        {suggestions.length > 0 && (
          <SuggestionGroup>
            <GroupLabel $palette={palette}>
              {t('marketplace.quickSuggestions')}
            </GroupLabel>
            {suggestions.map(s => (
              <SuggestionChip
                key={s}
                type="button"
                $palette={palette}
                onClick={() => applySuggestion(s)}
              >
                {s}
              </SuggestionChip>
            ))}
          </SuggestionGroup>
        )}
      </Suggestions>

      <Footer>
        <Button variant="primary" size="lg" fullWidth onClick={search}>
          <Search size={18} />
          {t('marketplace.searchButton')}
        </Button>
      </Footer>
    </Modal>
  );

  if (inline) return content;

  return (
    <AnimatePresence>
      {open && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <div onClick={e => e.stopPropagation()}>{content}</div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
}
