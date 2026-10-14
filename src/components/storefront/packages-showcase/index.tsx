import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import {
  OutlinePill,
  Section,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { formatPrice } from '@/utils/storefront/pricing';
import { usePackagesShowcase } from './helper';
import {
  Body,
  Card,
  Description,
  Foot,
  GoButton,
  Grid,
  Image,
  ImageFallback,
  Name,
  Price,
  PriceLabel,
  SavingsTag,
  VendorLine,
  ViewAllRow,
} from './styled';

interface PackagesShowcaseProps {
  /** On the dedicated Packages page an empty catalogue must still say something;
   *  inside the home page the whole section is simply skipped. */
  showEmptyState?: boolean;
}

/** Up to two letters standing in for a missing cover photo. */
const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('') || 'EO';

export function PackagesShowcase({ showEmptyState }: PackagesShowcaseProps) {
  const { t } = useTranslation();
  const { packages } = usePackagesShowcase();

  if (!packages.length) {
    if (!showEmptyState) return null;
    return (
      <Section>
        <SectionInner>
          <SectionTitle>{t('storefront.packagesTitle')}</SectionTitle>
          <SectionSubtitle>{t('storefront.packagesEmpty')}</SectionSubtitle>
        </SectionInner>
      </Section>
    );
  }

  return (
    <Section>
      <SectionInner>
        <SectionTitle>{t('storefront.packagesTitle')}</SectionTitle>
        <SectionSubtitle>{t('storefront.packagesSubtitle')}</SectionSubtitle>
        <Grid>
          {packages.map(item => (
            <Card key={item.id} to={`${ROUTES.PACKAGES}/${item.id}`}>
              {item.image ? (
                <Image src={item.image} alt={item.name} loading="lazy" />
              ) : (
                <ImageFallback aria-hidden="true">
                  {initialsOf(item.name)}
                </ImageFallback>
              )}
              <Body>
                {item.vendorName && <VendorLine>{item.vendorName}</VendorLine>}
                <Name>{item.name}</Name>
                <Description>{item.description}</Description>
                {item.savings > 0 && (
                  <SavingsTag>
                    {t('storefront.packagesSaving', {
                      amount: formatPrice(item.savings),
                    })}
                  </SavingsTag>
                )}
                <Foot>
                  <span>
                    <PriceLabel>{t('storefront.startingFrom')}</PriceLabel>
                    <Price>{formatPrice(item.startingPrice)}</Price>
                  </span>
                  <GoButton aria-hidden="true">
                    <ChevronRight size={18} />
                  </GoButton>
                </Foot>
              </Body>
            </Card>
          ))}
        </Grid>
        <ViewAllRow>
          <OutlinePill as={Link} to={ROUTES.PACKAGES}>
            {t('storefront.packagesViewAll')}
            <ArrowRight size={16} />
          </OutlinePill>
        </ViewAllRow>
      </SectionInner>
    </Section>
  );
}
