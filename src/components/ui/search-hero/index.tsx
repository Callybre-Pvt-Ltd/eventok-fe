import { Calendar, MapPin, Search, Tag, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { useSearchHero } from './helper';
import {
  FieldInput,
  FieldLabel,
  SearchBar,
  SearchBtn,
  SearchBtnWrap,
  SearchField,
} from './styled';

export function SearchHero() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { fields, updateField, handleSearch } = useSearchHero();

  return (
    <SearchBar $palette={palette}>
      <SearchField $palette={palette}>
        <FieldLabel $palette={palette}>
          <Tag size={12} /> {t('landing.searchCategory')}
        </FieldLabel>
        <FieldInput
          $palette={palette}
          placeholder={t('landing.searchCategoryPlaceholder')}
          value={fields.category}
          onChange={e => updateField('category', e.target.value)}
        />
      </SearchField>
      <SearchField $palette={palette}>
        <FieldLabel $palette={palette}>
          <MapPin size={12} /> {t('landing.searchLocation')}
        </FieldLabel>
        <FieldInput
          $palette={palette}
          placeholder={t('landing.searchLocationPlaceholder')}
          value={fields.location}
          onChange={e => updateField('location', e.target.value)}
        />
      </SearchField>
      <SearchField $palette={palette}>
        <FieldLabel $palette={palette}>
          <Calendar size={12} /> {t('landing.searchDate')}
        </FieldLabel>
        <FieldInput
          $palette={palette}
          type="date"
          placeholder={t('landing.searchDatePlaceholder')}
          value={fields.date}
          onChange={e => updateField('date', e.target.value)}
        />
      </SearchField>
      <SearchField $palette={palette}>
        <FieldLabel $palette={palette}>
          <Users size={12} /> {t('landing.searchGuests')}
        </FieldLabel>
        <FieldInput
          $palette={palette}
          type="number"
          placeholder={t('landing.searchGuestsPlaceholder')}
          value={fields.guests}
          onChange={e => updateField('guests', e.target.value)}
        />
      </SearchField>
      <SearchBtnWrap $palette={palette}>
        <SearchBtn $palette={palette} type="button" onClick={handleSearch}>
          <Search size={18} />
          {t('landing.searchButton')}
        </SearchBtn>
      </SearchBtnWrap>
    </SearchBar>
  );
}
