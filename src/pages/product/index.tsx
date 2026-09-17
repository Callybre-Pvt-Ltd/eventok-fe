import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { BookingCard } from '@/components/storefront/booking-card';
import { PdpGallery } from '@/components/storefront/pdp-gallery';
import { PdpTabs } from '@/components/storefront/pdp-tabs';
import { StoreLayout } from '@/components/storefront/store-layout';
import { formatPrice } from '@/utils/storefront/pricing';
import { useProductPage } from './helper';
import {
  BackLink,
  DescriptionCard,
  DescriptionText,
  DescriptionTitle,
  Layout,
  Loading,
  NotFound,
  Page,
  RelatedCard,
  RelatedImage,
  RelatedLabel,
  RelatedPrice,
  RelatedRail,
  RelatedSection,
  RelatedTitle,
  Title,
} from './styled';

export default function ProductPage() {
  const { t } = useTranslation();
  const { service, related, isLoading } = useProductPage();

  if (!service) {
    return (
      <StoreLayout>
        <Page>
          {isLoading ? (
            <Loading>{t('common.loading')}</Loading>
          ) : (
            <NotFound>
              {t('storefront.pdpNotFound')}
              <BackLink to={ROUTES.SHOP}>
                {t('storefront.pdpBackToShop')}
              </BackLink>
            </NotFound>
          )}
        </Page>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <Page>
        <Layout>
          <div>
            <Title>{service.title}</Title>
            <PdpGallery service={service} />

            <DescriptionCard>
              <DescriptionTitle>{t('storefront.pdpAbout')}</DescriptionTitle>
              <DescriptionText>{service.description}</DescriptionText>
            </DescriptionCard>

            <PdpTabs service={service} />

            <RelatedSection>
              <RelatedTitle>{t('storefront.pdpRelated')}</RelatedTitle>
              <RelatedRail>
                {related.map(item => (
                  <RelatedCard key={item.id} to={`/product/${item.slug}`}>
                    <RelatedImage src={item.images[0]} alt={item.title} />
                    <RelatedLabel>{item.title}</RelatedLabel>
                    <RelatedPrice>
                      {t('storefront.from')} {formatPrice(item.price)}
                    </RelatedPrice>
                  </RelatedCard>
                ))}
              </RelatedRail>
            </RelatedSection>
          </div>

          <BookingCard service={service} />
        </Layout>
      </Page>
    </StoreLayout>
  );
}
