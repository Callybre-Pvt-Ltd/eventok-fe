import { Calendar, MapPin, Search, Tag, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/design-system';
import { useEventSearch } from './helper';
import {
  FieldInput,
  FieldLabel,
  SearchBar,
  SearchBtnWrap,
  SearchField,
} from './styled';

interface EventSearchProps {
  large?: boolean;
}

export function EventSearch({ large }: EventSearchProps) {
  const { t } = useTranslation();
  const { colors, fields, updateField, handleSearch } = useEventSearch();

  return (
    <SearchBar $colors={colors} $large={large}>
      <SearchField>
        <FieldLabel $colors={colors}>
          <Tag size={12} /> {t('landing.searchCategory')}
        </FieldLabel>
        <FieldInput
          $colors={colors}
          $large={large}
          placeholder={t('landing.searchCategoryPlaceholder')}
          value={fields.category}
          onChange={e => updateField('category', e.target.value)}
        />
      </SearchField>
      <SearchField>
        <FieldLabel $colors={colors}>
          <MapPin size={12} /> {t('landing.searchLocation')}
        </FieldLabel>
        <FieldInput
          $colors={colors}
          $large={large}
          placeholder={t('landing.searchLocationPlaceholder')}
          value={fields.location}
          onChange={e => updateField('location', e.target.value)}
        />
      </SearchField>
      <SearchField>
        <FieldLabel $colors={colors}>
          <Calendar size={12} /> {t('landing.searchDate')}
        </FieldLabel>
        <FieldInput
          $colors={colors}
          $large={large}
          type="date"
          value={fields.date}
          onChange={e => updateField('date', e.target.value)}
        />
      </SearchField>
      <SearchField>
        <FieldLabel $colors={colors}>
          <Users size={12} /> {t('landing.searchGuests')}
        </FieldLabel>
        <FieldInput
          $colors={colors}
          $large={large}
          type="number"
          placeholder={t('landing.searchGuestsPlaceholder')}
          value={fields.guests}
          onChange={e => updateField('guests', e.target.value)}
        />
      </SearchField>
      <SearchBtnWrap>
        <Button
          tone="celebration"
          size={large ? 'lg' : 'md'}
          onClick={handleSearch}
        >
          <Search size={18} />
          {t('landing.searchButton')}
        </Button>
      </SearchBtnWrap>
    </SearchBar>
  );
}
