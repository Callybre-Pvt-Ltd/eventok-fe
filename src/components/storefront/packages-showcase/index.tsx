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
  Name,
  Price,
  PriceLabel,
  ViewAllRow,
} from './styled';

export function PackagesShowcase() {
  const { t } = useTranslation();
  const { packages } = usePackagesShowcase();

  if (!packages.length) return null;

  return (
    <Section>
      <SectionInner>
        <SectionTitle>{t('storefront.packagesTitle')}</SectionTitle>
        <SectionSubtitle>{t('storefront.packagesSubtitle')}</SectionSubtitle>
        <Grid>
          {packages.map(item => (
            <Card key={item.id}>
              <Image src={item.image} alt={item.name} loading="lazy" />
              <Body>
                <Name>{item.name}</Name>
                <Description>{item.description}</Description>
                <Foot>
                  <span>
                    <PriceLabel>{t('storefront.startingFrom')}</PriceLabel>
                    <Price>{formatPrice(item.startingPrice)}</Price>
                  </span>
                  <GoButton
                    to={`${ROUTES.PACKAGE_BUILDER}?package=${item.slug}`}
                    aria-label={item.name}
                  >
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
