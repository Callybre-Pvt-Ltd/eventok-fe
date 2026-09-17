import {
  CalendarDays,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CatalogService } from '@/types/catalog';
import { useBookingCard } from './helper';
import {
  Callout,
  CalloutText,
  CalloutTitle,
  Card,
  Label,
  Option,
  OptionHint,
  OptionText,
  OptionTitle,
  PartnerNote,
  Price,
  PrimaryButton,
  Radio,
  SecondaryButton,
  TrustItem,
  TrustRow,
  WhatsAppButton,
} from './styled';

export function BookingCard({ service }: { service: CatalogService }) {
  const { t } = useTranslation();
  const card = useBookingCard(service);

  return (
    <Card>
      <div>
        <Label>{t('storefront.pdpTotalPrice')}</Label>
        <Price>{card.price}</Price>
      </div>

      <Label>{t('storefront.pdpPaymentMethod')}</Label>

      <Option
        type="button"
        $active={card.mode === 'booking'}
        onClick={() => card.setMode('booking')}
      >
        <Radio $active={card.mode === 'booking'} />
        <OptionText>
          <OptionTitle>{t('storefront.pdpBookingAmount')}</OptionTitle>
          <OptionHint>
            {t('storefront.pdpBookingAmountHint', {
              amount: card.bookingAmount,
            })}
          </OptionHint>
        </OptionText>
      </Option>

      <Option
        type="button"
        $active={card.mode === 'full'}
        onClick={() => card.setMode('full')}
      >
        <Radio $active={card.mode === 'full'} />
        <OptionText>
          <OptionTitle>{t('storefront.pdpFullPayment')}</OptionTitle>
          <OptionHint>{t('storefront.pdpFullPaymentHint')}</OptionHint>
        </OptionText>
      </Option>

      <Callout>
        <CalloutTitle>{t('storefront.pdpWhyBookingTitle')}</CalloutTitle>
        <CalloutText>{t('storefront.pdpWhyBookingCopy')}</CalloutText>
      </Callout>

      <PrimaryButton type="button" onClick={card.book}>
        <CalendarDays size={16} />
        {t('storefront.bookNow')}
      </PrimaryButton>

      <SecondaryButton type="button" onClick={card.addOnly}>
        <ShoppingBag size={16} />
        {t('storefront.pdpAddToCart')}
      </SecondaryButton>

      <WhatsAppButton type="button">
        <MessageCircle size={16} />
        {t('storefront.pdpAskQuery')}
      </WhatsAppButton>

      <TrustRow>
        <TrustItem>
          <ShieldCheck size={16} />
          {t('storefront.pdpTrustSecure')}
        </TrustItem>
        <TrustItem>
          <Sparkles size={16} />
          {t('storefront.pdpTrustVerified')}
        </TrustItem>
        <TrustItem>
          <Zap size={16} />
          {t('storefront.pdpTrustRefund')}
        </TrustItem>
      </TrustRow>

      <PartnerNote>{t('storefront.pdpPartnerNote')}</PartnerNote>
    </Card>
  );
}
