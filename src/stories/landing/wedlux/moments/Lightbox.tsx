import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Memory } from './memories';
import {
  LightboxClose,
  LightboxImage,
  LightboxImageWrap,
  LightboxInfo,
  LightboxMeta,
  LightboxRoot,
  LightboxStage,
  LightboxTitle,
  LightboxTop,
  NavButton,
  RelatedLabel,
  Thumb,
  ThumbStrip,
} from './styled';

interface LightboxProps {
  memories: Memory[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (index: number) => void;
}

export function MemoryLightbox({
  memories,
  index,
  onClose,
  onNext,
  onPrev,
  onSelect,
}: LightboxProps) {
  const { t } = useTranslation();
  const memory = memories[index];
  const [scale, setScale] = useState(1);
  const pinchRef = useRef<{ startDist: number; startScale: number } | null>(
    null,
  );
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    setScale(1);
  }, [index]);

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (event.touches.length === 2) {
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        pinchRef.current = {
          startDist: Math.hypot(dx, dy),
          startScale: scale,
        };
        dragStartX.current = null;
        return;
      }
      if (event.touches.length === 1 && scale <= 1.05) {
        dragStartX.current = event.touches[0].clientX;
      }
    },
    [scale],
  );

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    if (event.touches.length === 2 && pinchRef.current) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const next =
        pinchRef.current.startScale *
        (dist / Math.max(pinchRef.current.startDist, 1));
      setScale(Math.min(3, Math.max(1, next)));
    }
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (pinchRef.current) {
        pinchRef.current = null;
        return;
      }
      if (dragStartX.current === null || scale > 1.05) {
        dragStartX.current = null;
        return;
      }
      const endX = event.changedTouches[0]?.clientX ?? dragStartX.current;
      const delta = endX - dragStartX.current;
      dragStartX.current = null;
      if (Math.abs(delta) > 56) {
        if (delta < 0) onNext();
        else onPrev();
      }
    },
    [onNext, onPrev, scale],
  );

  if (!memory) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        style={{ position: 'fixed', inset: 0, zIndex: 1000 }}
      >
        <LightboxRoot
          role="dialog"
          aria-modal="true"
          aria-label={t(memory.titleKey)}
        >
          <LightboxTop>
            <LightboxInfo>
              <LightboxTitle>{t(memory.titleKey)}</LightboxTitle>
              <LightboxMeta>
                {t(memory.locationKey)} · {t(memory.categoryKey)} ·{' '}
                {t('landing.wedluxMomentsPartner')} · {memory.year}
              </LightboxMeta>
            </LightboxInfo>
            <LightboxClose
              type="button"
              onClick={onClose}
              aria-label={t('landing.wedluxMomentsClose')}
            >
              <X size={20} />
            </LightboxClose>
          </LightboxTop>

          <LightboxStage
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <NavButton
              type="button"
              $side="left"
              onClick={onPrev}
              aria-label={t('landing.wedluxMomentsPrev')}
            >
              <ChevronLeft size={22} />
            </NavButton>

            <LightboxImageWrap>
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={scale <= 1.05 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) onNext();
                  if (info.offset.x > 80) onPrev();
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LightboxImage
                  src={memory.src}
                  alt={t(memory.titleKey)}
                  style={{ transform: `scale(${scale})` }}
                  draggable={false}
                />
              </motion.div>
            </LightboxImageWrap>

            <NavButton
              type="button"
              $side="right"
              onClick={onNext}
              aria-label={t('landing.wedluxMomentsNext')}
            >
              <ChevronRight size={22} />
            </NavButton>
          </LightboxStage>

          <RelatedLabel>{t('landing.wedluxMomentsRelated')}</RelatedLabel>
          <ThumbStrip
            role="tablist"
            aria-label={t('landing.wedluxMomentsRelated')}
          >
            {memories.map((item, i) => (
              <Thumb
                key={item.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                $active={i === index}
                onClick={() => onSelect(i)}
              >
                <img src={item.src} alt="" loading="lazy" />
              </Thumb>
            ))}
          </ThumbStrip>
        </LightboxRoot>
      </motion.div>
    </AnimatePresence>
  );
}
