import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { getCategoryPhoto } from '@/pages/categories/helper';
import { useLuxuryCollection } from './helper';
import {
  CollectionCta,
  CollectionGrid,
  CollectionIntro,
  CollectionLead,
  CollectionSection,
  CollectionTitle,
  ProductBadge,
  ProductCard,
  ProductGrid,
  ProductImage,
  ProductMeta,
  ProductName,
  SkeletonCard,
} from './styled';

export function LuxuryCollection() {
  const { t } = useTranslation();
  const { services, isLoading } = useLuxuryCollection();

  return (
    <CollectionSection>
      <CollectionGrid>
        <CollectionIntro>
          <CollectionTitle>
            {t('landing.luxuryCollectionTitle')}
          </CollectionTitle>
          <CollectionLead>{t('landing.luxuryCollectionLead')}</CollectionLead>
          <CollectionCta to={ROUTES.SERVICES}>
            {t('landing.luxurySeeMore')}
          </CollectionCta>
        </CollectionIntro>

        <ProductGrid>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : services.map(service => (
                <ProductCard
                  key={service.id}
                  to={`${ROUTES.SERVICES}?type=${service.slug}`}
                >
                  <ProductImage>
                    <img
                      src={getCategoryPhoto(service.slug)}
                      alt={service.name}
                      loading="lazy"
                    />
                    <ProductBadge>
                      <Sparkles size={14} />
                    </ProductBadge>
                  </ProductImage>
                  <ProductName>{service.name}</ProductName>
                  <ProductMeta>{service.description}</ProductMeta>
                </ProductCard>
              ))}
        </ProductGrid>
      </CollectionGrid>
    </CollectionSection>
  );
}
