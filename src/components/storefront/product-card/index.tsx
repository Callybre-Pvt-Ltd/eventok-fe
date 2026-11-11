import { Heart } from 'lucide-react';
import type { CatalogService } from '@/types/catalog';
import { useProductCard } from './helper';
import {
  Body,
  BookButton,
  Card,
  Image,
  Media,
  Price,
  PriceRow,
  RatingText,
  Ribbon,
  TitleLink,
  WishButton,
  EmptyMedia,
} from './styled';

interface ProductCardProps {
  service: CatalogService;
  width?: string;
}

export function ProductCard({ service, width }: ProductCardProps) {
  const card = useProductCard(service);
  const cover = service.images[0];
  const tag = service.tags?.[0] || 'Decor';

  return (
    <Card $width={width}>
      <Media to={card.to}>
        {cover ? (
          <Image src={cover} alt={service.title} loading="lazy" />
        ) : (
          <EmptyMedia aria-hidden>No photo</EmptyMedia>
        )}
        <Ribbon>{tag}</Ribbon>
        <WishButton
          type="button"
          $active={card.wishlisted}
          onClick={card.toggleWish}
          aria-label={
            card.wishlisted ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          <Heart size={15} fill={card.wishlisted ? 'currentColor' : 'none'} />
        </WishButton>
      </Media>

      <Body>
        <TitleLink to={card.to}>{service.title}</TitleLink>
        <PriceRow>
          <Price>{card.price}</Price>
          {service.rating ? (
            <RatingText>
              ★ {service.rating} ({service.reviewCount ?? 120})
            </RatingText>
          ) : null}
        </PriceRow>
        <BookButton to={card.to}>Book Service</BookButton>
      </Body>
    </Card>
  );
}
