import { ArrowRight, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CatalogService } from '@/types/catalog';
import { useProductCard } from './helper';
import {
  Body,
  BookButton,
  Card,
  Image,
  Media,
  MetaRow,
  NewChip,
  OffChip,
  Price,
  PriceRow,
  Ribbon,
  SaveText,
  Strike,
  TitleLink,
  WishButton,
} from './styled';

interface ProductCardProps {
  service: CatalogService;
  width?: string;
}

export function ProductCard({ service, width }: ProductCardProps) {
  const { t } = useTranslation();
  const card = useProductCard(service);

  return (
    <Card $width={width}>
      <Media to={card.to}>
        <Image src={service.images[0]} alt={service.title} loading="lazy" />
        {card.discount > 0 && (
          <Ribbon>
            {card.discount}% {t('storefront.off')}
          </Ribbon>
        )}
        {service.isNew && <NewChip>{t('storefront.newTag')}</NewChip>}
        <WishButton
          type="button"
          $active={card.wishlisted}
          onClick={card.toggleWish}
          aria-label={
            card.wishlisted
              ? t('storefront.removeFromWishlist')
              : t('storefront.addToWishlist')
          }
        >
          <Heart size={16} fill={card.wishlisted ? 'currentColor' : 'none'} />
        </WishButton>
      </Media>

      <Body>
        <TitleLink to={card.to}>{service.title}</TitleLink>
        <PriceRow>
          <Price>{card.price}</Price>
          {card.discount > 0 && <Strike>{card.original}</Strike>}
        </PriceRow>
        {card.discount > 0 && (
          <MetaRow>
            <SaveText>
              {t('storefront.save')} {card.saved}
            </SaveText>
            <OffChip>
              {card.discount}% {t('storefront.off')}
            </OffChip>
          </MetaRow>
        )}
        <BookButton type="button" onClick={card.book}>
          {t('storefront.bookNow')}
          <ArrowRight size={16} />
        </BookButton>
      </Body>
    </Card>
  );
}
