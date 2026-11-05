import { CategoryTiles } from '@/components/storefront/category-tiles';
import { HeroCarousel } from '@/components/storefront/hero-carousel';
import { PackagesShowcase } from '@/components/storefront/packages-showcase';
import { PreviousWork } from '@/components/storefront/previous-work';
import { ReferEarn } from '@/components/storefront/refer-earn';
import { ServiceRail } from '@/components/storefront/service-rail';
import { StoreLayout } from '@/components/storefront/store-layout';
import { VenuesSection } from '@/components/storefront/venues-section';
import { WeddingServices } from '@/components/storefront/wedding-services';
import { Statistics } from '@/components/landing/statistics';
import { useHomePage } from './helper';
import { PageWrap } from './styled';

export default function HomePage() {
  useHomePage();

  return (
    <StoreLayout>
      <PageWrap>
        <HeroCarousel />
        <ServiceRail />
        <WeddingServices />
        <CategoryTiles limit={20} />
        <Statistics />
        <ReferEarn />
        <VenuesSection />
        <PackagesShowcase />
        <PreviousWork />
        <div id="faq" />
      </PageWrap>
    </StoreLayout>
  );
}
