import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  MapPin,
  Star,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PublicVendor } from '@/types';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { useVendorPortfolioCard } from './helper';
import {
  Card,
  CardLink,
  ImageStage,
  SlideImage,
  CarouselDots,
  Dot,
  NavBtn,
  VerifiedPill,
  FavBtn,
  HoverLayer,
  PreviewText,
  CategoryTags,
  CategoryTag,
  Body,
  AvatarRow,
  Avatar,
  Info,
  Name,
  MetaGrid,
  MetaItem,
  Actions,
  ActionBtn,
  PortfolioCount,
} from './styled';

interface VendorPortfolioCardProps {
  vendor: PublicVendor;
  categoryNames?: string[];
}

export function VendorPortfolioCard({
  vendor,
  categoryNames = [],
}: VendorPortfolioCardProps) {
  const { t } = useTranslation();
  const {
    palette,
    images,
    activeIndex,
    isHovered,
    isFav,
    setHovered,
    next,
    prev,
    goTo,
    toggleFav,
    handleQuote,
  } = useVendorPortfolioCard(vendor);

  const initial = vendor.businessName.charAt(0).toUpperCase();

  return (
    <Card
      $palette={palette}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      layout
    >
      <ImageStage $palette={palette}>
        <AnimatePresence mode="wait">
          <SlideImage
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt={vendor.businessName}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>

        <VerifiedPill $palette={palette}>
          <BadgeCheck size={12} />
          {t('marketplace.verified')}
        </VerifiedPill>

        <FavBtn
          type="button"
          $palette={palette}
          $active={isFav}
          onClick={toggleFav}
          aria-label={isFav ? t('marketplace.saved') : t('marketplace.save')}
          as={motion.button}
          whileTap={{ scale: 0.85 }}
          animate={isFav ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </FavBtn>

        {images.length > 1 && (
          <>
            <NavBtn
              type="button"
              $side="left"
              onClick={e => {
                e.preventDefault();
                prev();
              }}
              aria-label={t('marketplace.prevImage')}
            >
              <ChevronLeft size={18} />
            </NavBtn>
            <NavBtn
              type="button"
              $side="right"
              onClick={e => {
                e.preventDefault();
                next();
              }}
              aria-label={t('marketplace.nextImage')}
            >
              <ChevronRight size={18} />
            </NavBtn>
            <CarouselDots>
              {images.map((_, i) => (
                <Dot
                  key={i}
                  type="button"
                  $active={i === activeIndex}
                  $palette={palette}
                  onClick={e => {
                    e.preventDefault();
                    goTo(i);
                  }}
                />
              ))}
            </CarouselDots>
          </>
        )}

        <PortfolioCount $palette={palette}>
          {vendor.portfolio.length} {t('marketplace.projects')}
        </PortfolioCount>

        <HoverLayer
          $palette={palette}
          as={motion.div}
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
          transition={{ duration: 0.3 }}
        >
          <PreviewText $palette={palette}>
            <Eye size={14} />
            {t('marketplace.quickPreview')}
          </PreviewText>
          <p>{vendor.description.slice(0, 120)}…</p>
          {categoryNames.length > 0 && (
            <CategoryTags>
              {categoryNames.map(c => (
                <CategoryTag key={c} $palette={palette}>
                  {c}
                </CategoryTag>
              ))}
            </CategoryTags>
          )}
        </HoverLayer>
      </ImageStage>

      <Body>
        <AvatarRow>
          <Avatar $palette={palette}>{initial}</Avatar>
          <Info>
            <Name $palette={palette}>{vendor.businessName}</Name>
            <MetaGrid $palette={palette}>
              <MetaItem>
                <MapPin size={13} />
                {vendor.city}
              </MetaItem>
              <MetaItem>
                <Star size={13} fill="currentColor" />
                {vendor.rating} · {vendor.reviewCount}{' '}
                {t('marketplace.reviews')}
              </MetaItem>
              <MetaItem>
                {vendor.experience} {t('marketplace.yearsExp')}
              </MetaItem>
            </MetaGrid>
            {categoryNames.length > 0 && (
              <CategoryTags>
                {categoryNames.map(c => (
                  <CategoryTag key={c} $palette={palette}>
                    {c}
                  </CategoryTag>
                ))}
              </CategoryTags>
            )}
          </Info>
        </AvatarRow>

        <Actions>
          <ActionBtn type="button" onClick={handleQuote}>
            <Button variant="primary" size="sm" fullWidth>
              {t('marketplace.requestQuote')}
            </Button>
          </ActionBtn>
          <CardLink to={ROUTES.SERVICES}>
            <Button variant="outline" size="sm" fullWidth>
              {t('marketplace.viewPortfolio')}
            </Button>
          </CardLink>
        </Actions>
      </Body>
    </Card>
  );
}
