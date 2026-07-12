import { useTranslation } from 'react-i18next';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { ExperienceCard } from './ExperienceCard';
import { useWedluxServices } from './helper';
import {
  CompactRow,
  EditorialGrid,
  ExperiencesRoot,
  ExperiencesShell,
  Eyebrow,
  FeaturedSlot,
  FilterChip,
  FilterRow,
  FootNote,
  HeaderBlock,
  HeaderCopy,
  Lead,
  MobileRail,
  PanoramaSlot,
  SideStack,
  Title,
  ViewAllLink,
} from './styled';

export function WedluxServices() {
  const { t } = useTranslation();
  const {
    scope,
    categories,
    activeCategory,
    setActiveCategory,
    featured,
    mediumCards,
    panorama,
    compactCards,
    mobileCards,
  } = useWedluxServices();

  return (
    <ExperiencesRoot id="services" ref={scope}>
      <ExperiencesShell>
        <HeaderBlock>
          <HeaderCopy>
            <Eyebrow data-reveal>{t('landing.wedluxServicesBadge')}</Eyebrow>
            <Title data-reveal>{t('landing.wedluxServicesTitle')}</Title>
            <Lead data-reveal>{t('landing.wedluxServicesLead')}</Lead>
          </HeaderCopy>
          <ViewAllLink to={ROUTES.SERVICES} data-reveal>
            {t('landing.wedluxExpViewAll')}
            <ArrowRight size={16} aria-hidden />
          </ViewAllLink>
        </HeaderBlock>

        <FilterRow
          role="toolbar"
          aria-label={t('landing.wedluxExpFilterLabel')}
        >
          {categories.map(cat => {
            const active = activeCategory === cat.id;
            return (
              <FilterChip
                key={cat.id}
                type="button"
                aria-pressed={active}
                $active={active}
                onClick={() => setActiveCategory(cat.id)}
              >
                {t(cat.labelKey)}
              </FilterChip>
            );
          })}
        </FilterRow>

        <EditorialGrid $solo={mediumCards.length === 0}>
          {featured ? (
            <FeaturedSlot $solo={mediumCards.length === 0}>
              <ExperienceCard experience={featured} variant="featured" />
            </FeaturedSlot>
          ) : null}

          {mediumCards.length > 0 ? (
            <SideStack>
              {mediumCards.map(item => (
                <ExperienceCard
                  key={item.id}
                  experience={item}
                  variant="medium"
                />
              ))}
            </SideStack>
          ) : null}
        </EditorialGrid>

        {panorama ? (
          <PanoramaSlot>
            <ExperienceCard experience={panorama} variant="panorama" />
          </PanoramaSlot>
        ) : null}

        {compactCards.length > 0 ? (
          <CompactRow>
            {compactCards.map(item => (
              <ExperienceCard
                key={item.id}
                experience={item}
                variant="compact"
              />
            ))}
          </CompactRow>
        ) : null}

        <MobileRail aria-label={t('landing.wedluxExpCarouselLabel')}>
          {mobileCards.map(item => (
            <ExperienceCard
              key={`m-${item.id}`}
              experience={item}
              variant={item.layout === 'featured' ? 'featured' : 'medium'}
            />
          ))}
        </MobileRail>

        <FootNote>
          <MessageCircle size={14} aria-hidden />
          {t('landing.wedluxExpAdminNote')}
        </FootNote>
      </ExperiencesShell>
    </ExperiencesRoot>
  );
}
