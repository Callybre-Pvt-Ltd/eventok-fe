import { ArrowUpRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Memory } from './memories';
import {
  ArrowHint,
  Card,
  CardImage,
  CardMeta,
  CardOverlay,
  MetaRow,
  MetaTitle,
  SweepLayer,
} from './styled';

interface MemoryCardProps {
  memory: Memory;
  reveal?: 'fade' | 'clip' | 'scale' | 'slide';
  tall?: boolean;
  onOpen: (memory: Memory) => void;
  priority?: boolean;
}

export function MemoryCard({
  memory,
  reveal = 'fade',
  tall,
  onOpen,
  priority,
}: MemoryCardProps) {
  const { t } = useTranslation();

  return (
    <Card
      type="button"
      $tall={tall}
      data-memory-card
      data-reveal={reveal}
      onClick={() => onOpen(memory)}
      aria-label={`${t(memory.titleKey)} — ${t('landing.wedluxMomentsOpen')}`}
    >
      <CardImage
        src={memory.src}
        alt={t(memory.titleKey)}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes="(max-width: 767px) 90vw, 40vw"
      />
      <CardOverlay aria-hidden />
      <SweepLayer data-memory-sweep aria-hidden />
      <ArrowHint data-memory-arrow aria-hidden>
        <ArrowUpRight size={18} />
      </ArrowHint>
      <CardMeta data-memory-meta>
        <MetaTitle>{t(memory.titleKey)}</MetaTitle>
        <MetaRow>
          <span>
            <MapPin size={11} style={{ marginRight: 3 }} aria-hidden />
            {t(memory.locationKey)}
          </span>
          <span>{t(memory.categoryKey)}</span>
          <span>{t('landing.wedluxMomentsPartner')}</span>
          <span>{memory.year}</span>
        </MetaRow>
      </CardMeta>
    </Card>
  );
}
