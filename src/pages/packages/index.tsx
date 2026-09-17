import { useTranslation } from 'react-i18next';
import { CategoryTiles } from '@/components/storefront/category-tiles';
import { PackagesShowcase } from '@/components/storefront/packages-showcase';
import { StoreLayout } from '@/components/storefront/store-layout';
import { Page, Title } from './styled';

export default function PackagesPage() {
  const { t } = useTranslation();

  return (
    <StoreLayout>
      <Page>
        <Title>{t('storefront.packagesTitle')}</Title>
      </Page>
      <PackagesShowcase />
      <CategoryTiles />
    </StoreLayout>
  );
}
