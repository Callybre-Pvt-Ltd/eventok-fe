import { BadgeCheck, Camera, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CatalogService } from '@/types/catalog';
import { usePdpGallery } from './helper';
import {
  Badge,
  BadgeRow,
  Chip,
  Chips,
  Frame,
  Image,
  RatingBadge,
  Thumb,
  ThumbImage,
  Thumbs,
  VerifiedBadge,
  EmptyFrame,
} from './styled';

export function PdpGallery({ service }: { service: CatalogService }) {
  const { t } = useTranslation();
  const hasImages = service.images.length > 0;
  const gallery = usePdpGallery(Math.max(service.images.length, 1));

  return (
    <div>
      <Frame>
        {hasImages ? (
          <Image src={service.images[gallery.index]} alt={service.title} />
        ) : (
          <EmptyFrame>Photos coming soon</EmptyFrame>
        )}
        <BadgeRow>
          <VerifiedBadge>
            <BadgeCheck size={13} />
            {t('storefront.pdpVerified')}
          </VerifiedBadge>
          {hasImages ? (
            <Badge>
              <Camera size={13} />
              {t('storefront.pdpPhotoCount', {
                current: gallery.index + 1,
                total: service.images.length,
              })}
            </Badge>
          ) : null}
        </BadgeRow>
        <RatingBadge>
          <Star size={13} />
          {t('storefront.pdpRating', {
            rating: service.rating,
            count: service.reviewCount,
          })}
        </RatingBadge>
      </Frame>

      {service.images.length > 1 && (
        <Thumbs>
          {service.images.map((image, position) => (
            <Thumb
              key={image}
              type="button"
              $active={position === gallery.index}
              onClick={() => gallery.setIndex(position)}
            >
              <ThumbImage src={image} alt="" />
            </Thumb>
          ))}
        </Thumbs>
      )}

      <Chips>
        {service.attributes.map(attribute => (
          <Chip key={attribute}>
            <Sparkles size={12} />
            {attribute}
          </Chip>
        ))}
      </Chips>
    </div>
  );
}
