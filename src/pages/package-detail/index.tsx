import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { StoreLayout } from '@/components/storefront/store-layout';
import { ROUTES } from '@/constants/routes';
import { formatPrice } from '@/utils/storefront/pricing';
import { usePackageDetailPage } from './helper';
import {
  Aside,
  BackLink,
  BookButton,
  Description,
  Hero,
  InclusionTag,
  Inclusions,
  Layout,
  Note,
  Page,
  PriceLabel,
  PriceRow,
  PriceValue,
  SavingsTag,
  SectionTitle,
  ServiceBody,
  ServiceCard,
  ServiceList,
  ServiceMeta,
  ServiceName,
  ServicePrice,
  ServiceThumb,
  ThumbFallback,
  StateWrap,
  Strike,
  Title,
  VendorName,
} from './styled';

export default function PackageDetailPage() {
  const { t } = useTranslation();
  const {
    pkg,
    isLoading,
    error,
    eventDate,
    setEventDate,
    book,
    isBooking,
    isSignedIn,
  } = usePackageDetailPage();

  if (isLoading || !pkg) {
    return (
      <StoreLayout>
        <Page>
          <BackLink to={ROUTES.PACKAGES}>
            <ArrowLeft size={15} />
            {t('storefront.packagesBack')}
          </BackLink>
          <StateWrap>
            {isLoading ? t('common.loading') : error ?? t('common.error')}
          </StateWrap>
        </Page>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <Page>
        <BackLink to={ROUTES.PACKAGES}>
          <ArrowLeft size={15} />
          {t('storefront.packagesBack')}
        </BackLink>

        <Layout>
          <div>
            <Hero>
              {pkg.vendorName && <VendorName>{pkg.vendorName}</VendorName>}
              <Title>{pkg.name}</Title>
              {pkg.description && <Description>{pkg.description}</Description>}
            </Hero>

            <SectionTitle>
              {t('storefront.packageIncludes', {
                count: pkg.services.length,
              })}
            </SectionTitle>
            <ServiceList>
              {pkg.services.map(service => (
                <ServiceCard key={service.id}>
                  {service.images[0] ? (
                    <ServiceThumb
                      src={service.images[0]}
                      alt={service.title}
                      loading="lazy"
                    />
                  ) : (
                    <ThumbFallback aria-hidden="true">
                      {service.title.slice(0, 2).toUpperCase()}
                    </ThumbFallback>
                  )}
                  <ServiceBody>
                    <ServiceName to={`/product/${service.slug}`}>
                      {service.title}
                    </ServiceName>
                    {service.description && (
                      <ServiceMeta>{service.description}</ServiceMeta>
                    )}
                    <ServicePrice>{formatPrice(service.price)}</ServicePrice>
                    {service.whatsIncluded.length > 0 && (
                      <Inclusions>
                        {service.whatsIncluded.slice(0, 4).map(item => (
                          <InclusionTag key={item.label}>
                            {item.label}
                          </InclusionTag>
                        ))}
                      </Inclusions>
                    )}
                  </ServiceBody>
                </ServiceCard>
              ))}
            </ServiceList>
          </div>

          <Aside>
            <PriceLabel>{t('storefront.packagePriceLabel')}</PriceLabel>
            <PriceValue>{formatPrice(pkg.customerPrice)}</PriceValue>
            {pkg.individualTotal > pkg.customerPrice && (
              <PriceRow>
                <span>{t('storefront.packageIndividualTotal')}</span>
                <Strike>{formatPrice(pkg.individualTotal)}</Strike>
              </PriceRow>
            )}
            {pkg.savings > 0 && (
              <SavingsTag>
                {t('storefront.packagesSaving', {
                  amount: formatPrice(pkg.savings),
                })}
              </SavingsTag>
            )}

            <PriceLabel>{t('storefront.packageEventDate')}</PriceLabel>
            <DatePicker
              value={eventDate ? dayjs(eventDate) : null}
              onChange={value =>
                setEventDate(value ? value.format('YYYY-MM-DD') : '')
              }
              disabledDate={current =>
                current && current < dayjs().startOf('day')
              }
              style={{ width: '100%' }}
            />

            <BookButton type="button" onClick={book} disabled={isBooking}>
              {isSignedIn
                ? t('storefront.packageBook')
                : t('storefront.checkoutSignInToBook')}
            </BookButton>
            <Note>{t('storefront.packageBookNote')}</Note>
          </Aside>
        </Layout>
      </Page>
    </StoreLayout>
  );
}
