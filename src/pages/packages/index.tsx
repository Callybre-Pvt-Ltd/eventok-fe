import { CategoryTiles } from '@/components/storefront/category-tiles';
import { PackagesShowcase } from '@/components/storefront/packages-showcase';
import { StoreLayout } from '@/components/storefront/store-layout';

export default function PackagesPage() {
  return (
    <StoreLayout>
      <PackagesShowcase showEmptyState />
      <CategoryTiles />
    </StoreLayout>
  );
}
