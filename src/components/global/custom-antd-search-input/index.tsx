import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SearchIconWrap, SearchWrapper, StyledSearchInput } from './styled';

interface CustomAntdSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CustomAntdSearchInput({
  value,
  onChange,
  placeholder,
}: CustomAntdSearchInputProps) {
  const { t } = useTranslation();

  return (
    <SearchWrapper>
      <SearchIconWrap>
        <Search size={18} />
      </SearchIconWrap>
      <StyledSearchInput
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? t('common.search')}
        allowClear
      />
    </SearchWrapper>
  );
}
