import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { GalleryCta } from './GalleryCta';
import { useWedluxMoments } from './helper';
import { MemoryLightbox } from './Lightbox';
import { MemoryCard } from './MemoryCard';
import {
  EditorialGrid,
  Eyebrow,
  FilterChip,
  FilterRail,
  GridSlot,
  Header,
  HeaderCopy,
  Lead,
  MobileRail,
  MobileStack,
  MomentsRoot,
  MomentsShell,
  StripLabel,
  StripRail,
  StripSection,
  Title,
} from './styled';

const REVEALS = ['clip', 'fade', 'scale', 'slide'] as const;

export function WedluxMoments() {
  const { t } = useTranslation();
  const {
    scope,
    categories,
    activeCategory,
    setActiveCategory,
    featured,
    editorial,
    strip,
    filtered,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    goNext,
    goPrev,
    setLightboxIndex,
  } = useWedluxMoments();

  return (
    <MomentsRoot id="moments" ref={scope}>
      <MomentsShell>
        <Header>
          <HeaderCopy>
            <Eyebrow data-memory-header>
              {t('landing.wedluxMomentsEyebrow')}
            </Eyebrow>
            <Title data-memory-header>{t('landing.wedluxMomentsTitle')}</Title>
            <Lead data-memory-header>{t('landing.wedluxMomentsSubtitle')}</Lead>
          </HeaderCopy>
          <div data-memory-header className="moments-cta-desktop">
            <GalleryCta label={t('landing.wedluxMomentsCta')} />
          </div>
        </Header>

        <FilterRail
          role="tablist"
          aria-label={t('landing.wedluxMomentsFilterLabel')}
        >
          {categories.map(cat => (
            <FilterChip
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              $active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {t(cat.labelKey)}
            </FilterChip>
          ))}
        </FilterRail>

        <MobileRail aria-label={t('landing.wedluxMomentsRailLabel')}>
          {featured.map((memory, index) => (
            <MemoryCard
              key={`rail-${memory.id}`}
              memory={memory}
              tall
              reveal={REVEALS[index % REVEALS.length]}
              onOpen={openLightbox}
              priority={index === 0}
            />
          ))}
        </MobileRail>

        <EditorialGrid>
          {editorial.map((memory, index) => (
            <GridSlot key={memory.id} $layout={memory.layout}>
              <MemoryCard
                memory={memory}
                reveal={REVEALS[index % REVEALS.length]}
                onOpen={openLightbox}
                priority={index < 2}
              />
            </GridSlot>
          ))}
        </EditorialGrid>

        <MobileStack>
          {editorial.slice(0, 4).map((memory, index) => (
            <MemoryCard
              key={`stack-${memory.id}`}
              memory={memory}
              tall={index % 2 === 0}
              reveal={REVEALS[index % REVEALS.length]}
              onOpen={openLightbox}
            />
          ))}
        </MobileStack>

        <StripSection>
          <StripLabel data-memory-header>
            {t('landing.wedluxMomentsStrip')}
          </StripLabel>
          <StripRail>
            {strip.map((memory, index) => (
              <MemoryCard
                key={`strip-${memory.id}`}
                memory={memory}
                reveal="slide"
                onOpen={openLightbox}
                priority={index < 2}
              />
            ))}
          </StripRail>
        </StripSection>

        <GalleryCta label={t('landing.wedluxMomentsCta')} />
      </MomentsShell>

      {lightboxIndex !== null && filtered[lightboxIndex]
        ? createPortal(
            <MemoryLightbox
              memories={filtered}
              index={lightboxIndex}
              onClose={closeLightbox}
              onNext={goNext}
              onPrev={goPrev}
              onSelect={setLightboxIndex}
            />,
            document.body,
          )
        : null}
    </MomentsRoot>
  );
}
