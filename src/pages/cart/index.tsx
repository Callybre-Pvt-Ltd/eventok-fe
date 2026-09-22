import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { StoreLayout } from '@/components/storefront/store-layout';
import { formatPrice } from '@/utils/storefront/pricing';
import { useCartPage } from './helper';
import {
  CheckoutButton,
  CouponButton,
  CouponInput,
  CouponRow,
  Empty,
  EmptyLink,
  Layout,
  LineBody,
  LineCard,
  LineFoot,
  LineImage,
  LineMeta,
  LinePrice,
  LineTitle,
  Lines,
  Page,
  Quantity,
  RemoveButton,
  SaveRow,
  StepButton,
  Stepper,
  Summary,
  SummaryRow,
  SummaryTitle,
  Title,
} from './styled';

export default function CartPage() {
  const { t } = useTranslation();
  const cart = useCartPage();

  return (
    <StoreLayout>
      <Page>
        <Title>{t('storefront.cartTitle')}</Title>

        {cart.lines.length === 0 ? (
          <Empty>
            {t('storefront.cartEmpty')}
            <EmptyLink to={ROUTES.SHOP}>
              {t('storefront.cartEmptyAction')}
            </EmptyLink>
          </Empty>
        ) : (
          <Layout>
            <Lines>
              {cart.lines.map(line => (
                <LineCard key={line.serviceSlug}>
                  <LineImage
                    src={line.service.images[0]}
                    alt={line.service.title}
                  />
                  <LineBody>
                    <LineTitle to={`/product/${line.serviceSlug}`}>
                      {line.service.title}
                    </LineTitle>
                    <LineMeta>
                      {t('storefront.cartDueNow')}:{' '}
                      {formatPrice(line.service.bookingAmount * line.quantity)}
                    </LineMeta>
                    <LineFoot>
                      <Stepper>
                        <StepButton
                          type="button"
                          onClick={() =>
                            cart.basket.setQuantity(
                              line.serviceSlug,
                              line.quantity - 1,
                            )
                          }
                          aria-label={t('storefront.cartQuantity')}
                        >
                          <Minus size={14} />
                        </StepButton>
                        <Quantity>{line.quantity}</Quantity>
                        <StepButton
                          type="button"
                          onClick={() =>
                            cart.basket.setQuantity(
                              line.serviceSlug,
                              line.quantity + 1,
                            )
                          }
                          aria-label={t('storefront.cartQuantity')}
                        >
                          <Plus size={14} />
                        </StepButton>
                      </Stepper>
                      <LinePrice>
                        {formatPrice(line.service.price * line.quantity)}
                      </LinePrice>
                      <RemoveButton
                        type="button"
                        onClick={() =>
                          cart.basket.removeFromCart(line.serviceSlug)
                        }
                        aria-label={t('storefront.cartRemove')}
                      >
                        <Trash2 size={16} />
                      </RemoveButton>
                    </LineFoot>
                  </LineBody>
                </LineCard>
              ))}
            </Lines>

            <Summary>
              <SummaryTitle>{t('storefront.cartSummary')}</SummaryTitle>
              <SummaryRow>
                <span>{t('storefront.cartSubtotal')}</span>
                <span>{formatPrice(cart.totals.subtotal)}</span>
              </SummaryRow>
              <SaveRow>
                <span>{t('storefront.cartSavings')}</span>
                <span>{formatPrice(cart.totals.savings)}</span>
              </SaveRow>
              <SummaryRow $strong>
                <span>{t('storefront.cartDueNow')}</span>
                <span>{formatPrice(cart.totals.dueNow)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>{t('storefront.cartDueLater')}</span>
                <span>{formatPrice(cart.totals.dueLater)}</span>
              </SummaryRow>
              <CouponRow>
                <CouponInput
                  value={cart.coupon}
                  onChange={event => cart.setCoupon(event.target.value)}
                  placeholder={t('storefront.cartCoupon')}
                  aria-label={t('storefront.cartCoupon')}
                />
                <CouponButton type="button">
                  {t('storefront.cartApply')}
                </CouponButton>
              </CouponRow>
              <CheckoutButton to={ROUTES.CHECKOUT}>
                {t('storefront.cartCheckout')}
                <ArrowRight size={16} />
              </CheckoutButton>
            </Summary>
          </Layout>
        )}
      </Page>
    </StoreLayout>
  );
}
