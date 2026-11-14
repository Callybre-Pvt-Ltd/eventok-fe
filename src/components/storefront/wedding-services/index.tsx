import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { Section, SectionInner } from '@/components/storefront/shared/styled';
import { getCategoryPhoto } from '@/pages/categories/helper';
import { useWeddingServices } from './helper';
import {
  CardBody,
  CardDescription,
  CardFooter,
  CardImage,
  CardMedia,
  CardTag,
  CardTitle,
  ExploreButton,
  ExploreLink,
  Eyebrow,
  HeaderAction,
  HeaderContent,
  HeaderRow,
  MediaOverlay,
  PricePrefix,
  PriceTag,
  PriceValue,
  SectionSubtitle,
  SectionTitle,
  WeddingCard,
  WeddingGrid,
} from './styled';

export function WeddingServices() {
  const { t } = useTranslation();
  const { tiles } = useWeddingServices();

  return (
    <Section $tint>
      <SectionInner>
        <HeaderRow>
          <HeaderContent>
            <Eyebrow>
              <Sparkles size={14} />
              <span>{t('storefront.weddingEyebrow')}</span>
            </Eyebrow>
            <SectionTitle>{t('storefront.weddingTitle')}</SectionTitle>
            <SectionSubtitle>{t('storefront.weddingSubtitle')}</SectionSubtitle>
          </HeaderContent>
          <HeaderAction>
            <ExploreButton to={`${ROUTES.SHOP}?event=wedding`}>
              <span>{t('storefront.weddingViewAll')}</span>
              <ArrowRight size={16} />
            </ExploreButton>
          </HeaderAction>
        </HeaderRow>

        <WeddingGrid>
          {tiles.map(tile => (
            <WeddingCard key={tile.id} to={`/category/${tile.slug}`}>
              <CardMedia>
                <CardImage
                  src={tile.photo || getCategoryPhoto(tile.slug)}
                  alt={tile.name}
                  loading="lazy"
                />
                <MediaOverlay />
                {tile.tag && <CardTag>{tile.tag}</CardTag>}
              </CardMedia>
              <CardBody>
                <CardTitle>{tile.name}</CardTitle>
                <CardDescription>{tile.description}</CardDescription>
                <CardFooter>
                  <PriceTag>
                    <PricePrefix>
                      {t('storefront.weddingStartingAt', 'Starts at')}
                    </PricePrefix>
                    <PriceValue>{tile.startingPrice}</PriceValue>
                  </PriceTag>
                  <ExploreLink aria-hidden>
                    <span>{t('storefront.weddingView', 'View Services')}</span>
                    <ArrowRight size={14} />
                  </ExploreLink>
                </CardFooter>
              </CardBody>
            </WeddingCard>
          ))}
        </WeddingGrid>
      </SectionInner>
    </Section>
  );
}
