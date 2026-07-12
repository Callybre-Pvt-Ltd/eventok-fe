import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { HeroSearchFields } from './helper';
import {
  FieldInput,
  FieldLabel,
  SearchBar,
  SearchButton,
  SearchField,
  SearchWrap,
} from './hero-search-styled';

interface HeroSearchProps {
  fields: HeroSearchFields;
  onUpdate: (key: keyof HeroSearchFields, value: string) => void;
  onSearch: () => void;
}

export function HeroSearch({ fields, onUpdate, onSearch }: HeroSearchProps) {
  const { t } = useTranslation();

  return (
    <SearchWrap>
      <SearchBar>
        <SearchField>
          <FieldLabel>{t('landing.searchCategory')}</FieldLabel>
          <FieldInput
            placeholder={t('landing.searchCategoryPlaceholder')}
            value={fields.category}
            onChange={e => onUpdate('category', e.target.value)}
          />
        </SearchField>
        <SearchField $divider>
          <FieldLabel>{t('landing.searchLocation')}</FieldLabel>
          <FieldInput
            placeholder={t('landing.searchLocationPlaceholder')}
            value={fields.location}
            onChange={e => onUpdate('location', e.target.value)}
          />
        </SearchField>
        <SearchField $divider>
          <FieldLabel>{t('landing.searchDate')}</FieldLabel>
          <FieldInput
            type="date"
            value={fields.date}
            onChange={e => onUpdate('date', e.target.value)}
          />
        </SearchField>
        <SearchField $divider>
          <FieldLabel>{t('landing.searchGuests')}</FieldLabel>
          <FieldInput
            type="number"
            min={1}
            placeholder={t('landing.searchGuestsPlaceholder')}
            value={fields.guests}
            onChange={e => onUpdate('guests', e.target.value)}
          />
        </SearchField>
        <SearchButton type="button" onClick={onSearch}>
          <Search size={18} strokeWidth={2.25} />
          {t('landing.searchButton')}
        </SearchButton>
      </SearchBar>
    </SearchWrap>
  );
}
