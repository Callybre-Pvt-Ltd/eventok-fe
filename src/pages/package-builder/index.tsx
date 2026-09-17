import { useTranslation } from 'react-i18next';
import { StoreLayout } from '@/components/storefront/store-layout';
import { formatPrice } from '@/utils/storefront/pricing';
import { usePackageBuilder } from './helper';
import {
  BarActions,
  CategoryGrid,
  CategoryTile,
  Checkbox,
  GhostButton,
  Hint,
  Page,
  PrimaryButton,
  ReviewCard,
  ReviewRow,
  RowImage,
  RowPrice,
  RowTitle,
  ServiceList,
  ServiceRow,
  StepItem,
  Steps,
  StickyBar,
  Subtitle,
  TileMeta,
  TileName,
  Title,
  TotalBlock,
  TotalLabel,
  TotalValue,
} from './styled';

const STEP_KEYS = [
  'storefront.builderStepCategory',
  'storefront.builderStepServices',
  'storefront.builderStepReview',
];

export default function PackageBuilderPage() {
  const { t } = useTranslation();
  const builder = usePackageBuilder();

  return (
    <StoreLayout>
      <Page>
        <Title>{t('storefront.builderTitle')}</Title>
        <Subtitle>{t('storefront.builderSubtitle')}</Subtitle>

        <Steps>
          {STEP_KEYS.map((key, index) => (
            <StepItem key={key} $active={index <= builder.step}>
              {t(key)}
            </StepItem>
          ))}
        </Steps>

        {builder.step === 0 && (
          <CategoryGrid>
            {builder.categories.map(category => (
              <CategoryTile
                key={category.id}
                type="button"
                $active={builder.categorySlug === category.slug}
                onClick={() => builder.pickCategory(category.slug)}
              >
                <TileName>{category.name}</TileName>
                <TileMeta>
                  {t('storefront.builderServicesAvailable', {
                    count: category.serviceCount,
                  })}
                </TileMeta>
              </CategoryTile>
            ))}
          </CategoryGrid>
        )}

        {builder.step === 1 && (
          <ServiceList>
            {builder.services.map(service => (
              <ServiceRow
                key={service.id}
                $active={builder.selected.includes(service.slug)}
              >
                <Checkbox
                  type="checkbox"
                  checked={builder.selected.includes(service.slug)}
                  onChange={() => builder.toggleService(service.slug)}
                />
                <RowImage src={service.images[0]} alt={service.title} />
                <RowTitle>{service.title}</RowTitle>
                <RowPrice>{formatPrice(service.price)}</RowPrice>
              </ServiceRow>
            ))}
            {builder.services.length === 0 && (
              <Hint>{t('storefront.shopEmpty')}</Hint>
            )}
          </ServiceList>
        )}

        {builder.step === 2 && (
          <ReviewCard>
            {builder.chosen.map(service => (
              <ReviewRow key={service.id}>
                <span>{service.title}</span>
                <span>{formatPrice(service.price)}</span>
              </ReviewRow>
            ))}
            <ReviewRow>
              <span>{t('storefront.cartSubtotal')}</span>
              <span>{formatPrice(builder.total)}</span>
            </ReviewRow>
            <ReviewRow>
              <span>{t('storefront.cartDueNow')}</span>
              <span>{formatPrice(builder.dueNow)}</span>
            </ReviewRow>
          </ReviewCard>
        )}

        {builder.step === 1 && builder.selected.length === 0 && (
          <Hint>{t('storefront.builderEmpty')}</Hint>
        )}
      </Page>

      <StickyBar>
        <TotalBlock>
          <TotalLabel>{t('storefront.builderRunningTotal')}</TotalLabel>
          <TotalValue>{formatPrice(builder.total)}</TotalValue>
        </TotalBlock>
        <BarActions>
          {builder.step > 0 && (
            <GhostButton
              type="button"
              onClick={() => builder.setStep(builder.step === 2 ? 1 : 0)}
            >
              {t('storefront.builderBack')}
            </GhostButton>
          )}
          {builder.step < 2 ? (
            <PrimaryButton
              type="button"
              disabled={builder.step === 1 && builder.selected.length === 0}
              onClick={() => builder.setStep(builder.step === 0 ? 1 : 2)}
            >
              {t('storefront.builderContinue')}
            </PrimaryButton>
          ) : (
            <PrimaryButton
              type="button"
              disabled={builder.selected.length === 0}
              onClick={builder.addBundle}
            >
              {t('storefront.builderAddBundle')}
            </PrimaryButton>
          )}
        </BarActions>
      </StickyBar>
    </StoreLayout>
  );
}
