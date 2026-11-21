import { CategoryTiles } from '@/components/storefront/category-tiles';
import { HeroCarousel } from '@/components/storefront/hero-carousel';
import { ServiceRail } from '@/components/storefront/service-rail';
import { StoreLayout } from '@/components/storefront/store-layout';
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

        {/* 3. Select a Category to Build Your Package */}
        <CategoryTiles limit={16} />

        <div id="faq" />
      </PageWrap>
    </StoreLayout>
  );
}
