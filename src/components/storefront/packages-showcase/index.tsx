import { ArrowRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  ImageWrap,
  IncludeTag,
  IncludesRow,
  Name,
  Price,
  PriceLabel,
  SavingsTag,
  VendorLine,
  ViewAllRow,
} from './styled';

interface PackagesShowcaseProps {
  showEmptyState?: boolean;
}

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
              <ImageWrap>
                {item.image ? (
                  <Image src={item.image} alt={item.name} loading="lazy" />
                ) : (
                  <ImageFallback aria-hidden="true">
                    {initialsOf(item.name)}
                  </ImageFallback>
                )}
              </ImageWrap>
              <Body>
                {item.vendorName && <VendorLine>{item.vendorName}</VendorLine>}
                <Name>{item.name}</Name>
                <Description>{item.description}</Description>

                {item.serviceSlugs && item.serviceSlugs.length > 0 && (
                  <IncludesRow>
                    {item.serviceSlugs.map(slug => (
                      <IncludeTag key={slug}>
                        <Check size={11} color="var(--color-primary)" />
                        {slug.replace(/-/g, ' ')}
                      </IncludeTag>
                    ))}
                  </IncludesRow>
                )}

                {item.savings > 0 && (
                  <SavingsTag>
                    Save {formatPrice(item.savings)} on Bundle
                  </SavingsTag>
                )}

                <Foot>
                  <div>
                    <PriceLabel>{t('storefront.startingFrom')}</PriceLabel>
                    <Price>{formatPrice(item.startingPrice)}</Price>
                  </div>
                  <GoButton aria-hidden="true">
                    View Package <ArrowRight size={14} />
                  </GoButton>
                </Foot>
              </Body>
            </Card>
          ))}
        </Grid>
        <ViewAllRow>
          <OutlinePill to={ROUTES.PACKAGES}>
            Explore All Bundles <ArrowRight size={16} />
          </OutlinePill>
        </ViewAllRow>
      </SectionInner>
    </Section>
  );
}
