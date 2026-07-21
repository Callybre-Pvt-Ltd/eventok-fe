import { Heart, MapPin, ShieldCheck, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import type { PublicVendor } from '@/types';
import { useTheme } from '@/theme';
import { useVendorCard } from './helper';
import {
  Card,
  CardBody,
  CardHeader,
  CardLink,
  CtaRow,
  FavoriteBtn,
  ImageWrap,
  Location,
  Logo,
  Meta,
  NameBlock,
  PortfolioCount,
  Rating,
  VendorName,
  VerifiedBadge,
} from './styled';

interface VendorCardProps {
  vendor: PublicVendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { favorited, toggleFavorite } = useVendorCard();
  const imageUrl = vendor.portfolio[0]?.url;
  const initial = vendor.businessName.charAt(0).toUpperCase();

  return (
    <CardLink to={ROUTES.SERVICES}>
      <Card
        $palette={palette}
        whileHover={{
          y: -6,
          boxShadow: '0 16px 48px rgba(124, 58, 237, 0.15)',
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <ImageWrap $url={imageUrl}>
          <VerifiedBadge $palette={palette}>
            <ShieldCheck size={12} />
            {t('landing.serviceVerified')}
          </VerifiedBadge>
          <FavoriteBtn
            $palette={palette}
            $active={favorited}
            onClick={toggleFavorite}
            aria-label="Favorite"
          >
            <Heart size={16} fill={favorited ? 'currentColor' : 'none'} />
          </FavoriteBtn>
        </ImageWrap>
        <CardBody>
          <CardHeader>
            <Logo $palette={palette} $initial={initial}>
              {initial}
            </Logo>
            <NameBlock>
              <VendorName $palette={palette}>{vendor.businessName}</VendorName>
              <Location $palette={palette}>
                <MapPin size={12} />
                {vendor.city}
              </Location>
            </NameBlock>
          </CardHeader>
          <Meta $palette={palette}>
            <Rating $palette={palette}>
              <Star size={14} fill="currentColor" />
              {vendor.rating} ({vendor.reviewCount})
            </Rating>
            <PortfolioCount $palette={palette}>
              {vendor.portfolio.length} {t('landing.servicePortfolio')}
            </PortfolioCount>
          </Meta>
          <CtaRow>
            <Button variant="secondary" size="sm" fullWidth>
              {t('landing.serviceViewPortfolio')}
            </Button>
          </CtaRow>
        </CardBody>
      </Card>
    </CardLink>
  );
}
