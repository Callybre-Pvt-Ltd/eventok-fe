import { CategoryTiles } from '@/components/storefront/category-tiles';
import { HeroCarousel } from '@/components/storefront/hero-carousel';
import { ReferEarn } from '@/components/storefront/refer-earn';
import { ServiceRail } from '@/components/storefront/service-rail';
import { StoreLayout } from '@/components/storefront/store-layout';
import { WeddingServices } from '@/components/storefront/wedding-services';
import { Statistics } from '@/components/landing/statistics';
import { useHomePage } from './helper';
import { PageWrap } from './styled';

export default function HomePage() {
  useHomePage();

  return (
    <StoreLayout>
      <PageWrap>
        {/* 1. Hero Carousel */}
        <HeroCarousel />

        {/* 2. Trendiest Decorations */}
        <ServiceRail />

        {/* 3. Everything for Your Perfect Wedding */}
        <WeddingServices />

        {/* 4. Select a Category to Build Your Package */}
        <CategoryTiles limit={16} />

        {/* 5. Statistics Highlights */}
        <Statistics />

        {/* 6. Invite Friends & Earn Rewards */}
        <ReferEarn />

        <div id="faq" />
      </PageWrap>
    </StoreLayout>
  );
}
