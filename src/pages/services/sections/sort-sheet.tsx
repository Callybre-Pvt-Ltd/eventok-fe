import { useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  sortOptions,
  type DiscoveryFilters,
  type SortOption,
} from '../filters';
import {
  DrawerGhost,
  DrawerOverlay,
  SortOptionBtn,
  SortSheet,
  SortSheetBody,
  SortSheetHead,
} from '../styled';

interface SortSheetProps {
  open: boolean;
  value: SortOption;
  onChange: (sort: SortOption) => void;
  onClose: () => void;
}

export function DiscoverySortSheet({
  open,
  value,
  onChange,
  onClose,
}: SortSheetProps) {
  const { t } = useTranslation();

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

  return (
    <>
      <DrawerOverlay $open={open} onClick={onClose} aria-hidden={!open} />
      <SortSheet
        $open={open}
        role="dialog"
        aria-modal="true"
        aria-label={t('servicesPage.sortLabel')}
        aria-hidden={!open}
      >
        <SortSheetHead>
          <h2>{t('servicesPage.sortLabel')}</h2>
          <DrawerGhost type="button" onClick={onClose} aria-label="Close">
            <X size={18} />
          </DrawerGhost>
        </SortSheetHead>
        <SortSheetBody>
          {sortOptions.map(opt => (
            <SortOptionBtn
              key={opt.value}
              type="button"
              $on={value === opt.value}
              aria-pressed={value === opt.value}
              onClick={() => {
                onChange(opt.value as DiscoveryFilters['sort']);
                onClose();
              }}
            >
              {opt.label}
            </SortOptionBtn>
          ))}
        </SortSheetBody>
      </SortSheet>
    </>
  );
}
