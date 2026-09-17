import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { ProductCard } from '@/components/storefront/product-card';
import { StoreLayout } from '@/components/storefront/store-layout';
import { useWishlistPage } from './helper';
import { Empty, EmptyLink, Grid, Page, Title } from './styled';

export default function WishlistPage() {
  const { t } = useTranslation();
  const { services } = useWishlistPage();

  return (
    <StoreLayout>
      <Page>
        <Title>{t('storefront.wishlistTitle')}</Title>
        {services.length === 0 ? (
          <Empty>
            {t('storefront.wishlistEmpty')}
            <EmptyLink to={ROUTES.SHOP}>
              {t('storefront.cartEmptyAction')}
            </EmptyLink>
          </Empty>
        ) : (
          <Grid>
            {services.map(service => (
              <ProductCard key={service.id} service={service} />
            ))}
          </Grid>
        )}
      </Page>
    </StoreLayout>
  );
}
