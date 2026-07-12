import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, BadgeCheck } from 'lucide-react';
import type { PublicVendor } from '@/types';
import { Text } from '../Text';
import { Button } from '../Button';
import { useVendorTile } from './helper';
import {
  Tile,
  PhotoWrap,
  Photo,
  PhotoOverlay,
  Body,
  TopRow,
  Logo,
  FavBtn,
  Meta,
  MetaItem,
  Actions,
} from './styled';

interface VendorTileProps {
  vendor: PublicVendor;
  to: string;
  featured?: boolean;
}

export function VendorTile({ vendor, to, featured }: VendorTileProps) {
  const { colors, image, toggleFav, isFav } = useVendorTile(vendor);

  return (
    <Tile
      $colors={colors}
      $featured={featured}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <PhotoWrap>
        <Photo src={image} alt={vendor.businessName} loading="lazy" />
        <PhotoOverlay $colors={colors} />
        <FavBtn
          type="button"
          onClick={toggleFav}
          aria-label="Save vendor"
          $active={isFav}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </FavBtn>
      </PhotoWrap>
      <Body>
        <TopRow>
          <Logo>{vendor.businessName.charAt(0)}</Logo>
          <div>
            <Text variant="subtitle">{vendor.businessName}</Text>
            <Meta>
              <MetaItem>
                <Star size={14} />
                {vendor.rating} ({vendor.reviewCount})
              </MetaItem>
              <MetaItem>
                <BadgeCheck size={14} />
                Verified
              </MetaItem>
            </Meta>
          </div>
        </TopRow>
        <Meta>
          <MetaItem>
            <MapPin size={14} />
            {vendor.city}
          </MetaItem>
          <MetaItem>{vendor.experience}+ years</MetaItem>
          <MetaItem>{vendor.portfolio.length} projects</MetaItem>
        </Meta>
        <Actions>
          <Link to={to}>
            <Button tone="celebration" size="sm">
              View portfolio
            </Button>
          </Link>
        </Actions>
      </Body>
    </Tile>
  );
}
