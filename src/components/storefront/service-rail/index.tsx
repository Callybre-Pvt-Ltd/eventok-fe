import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '@/components/storefront/product-card';
import {
  Eyebrow,
  Rail,
  RailControls,
  RoundButton,
  Section,
  SectionHead,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
  TabItem,
  TabRow,
} from '@/components/storefront/shared/styled';
import { useServiceRail } from './helper';
import { CardSlot } from './styled';

export function ServiceRail() {
  const { t } = useTranslation();
  const rail = useServiceRail();

  return (
    <Section>
      <SectionInner>
        <SectionHead>
          <div>
            <Eyebrow>{t('storefront.recentCelebrations')}</Eyebrow>
            <SectionTitle>{t('storefront.trendingTitle')}</SectionTitle>
            <SectionSubtitle>
              {t('storefront.trendingSubtitle')}
            </SectionSubtitle>
          </div>
          <RailControls>
            <RoundButton
              type="button"
              onClick={() => rail.scrollBy(-1)}
              aria-label={t('storefront.scrollLeft')}
            >
              <ChevronLeft size={18} />
            </RoundButton>
            <RoundButton
              type="button"
              onClick={() => rail.scrollBy(1)}
              aria-label={t('storefront.scrollRight')}
            >
              <ChevronRight size={18} />
            </RoundButton>
          </RailControls>
        </SectionHead>

        <TabRow role="tablist">
          {rail.tabs.map(item => (
            <TabItem
              key={item.value}
              type="button"
              role="tab"
              aria-selected={rail.tab === item.value}
              $active={rail.tab === item.value}
              onClick={() => rail.setTab(item.value)}
            >
              {item.label}
            </TabItem>
          ))}
        </TabRow>

        <Rail ref={rail.railRef}>
          {rail.services.length === 0 ? (
            <SectionSubtitle>
              No vendor services yet. Categories stay available — vendors can
              publish listings from their dashboard.
            </SectionSubtitle>
          ) : (
            rail.services.map(service => (
              <CardSlot key={service.id}>
                <ProductCard service={service} />
              </CardSlot>
            ))
          )}
        </Rail>
      </SectionInner>
    </Section>
  );
}
