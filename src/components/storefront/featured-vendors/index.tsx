import { ArrowRight, CheckCircle2, MapPin, Star } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import {
  Eyebrow,
  PillLink,
  Section,
  SectionHead,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { mockVendors } from '@/mock/vendors';
import {
  CardContent,
  CardFooter,
  Description,
  ExperienceBadge,
  HeaderRow,
  LocationMeta,
  PortfolioStrip,
  PortfolioThumb,
  PriceHint,
  RatingBlock,
  RatingScore,
  Tag,
  TagRow,
  VendorCardRoot,
  VendorGrid,
  VendorTitle,
  ViewVendorBtn,
} from './styled';

export function FeaturedVendorsSection() {
  const vendors = mockVendors.filter(v => v.featured);

  if (!vendors.length) return null;

  return (
    <Section>
      <SectionInner>
        <SectionHead>
          <div>
            <Eyebrow>Verified Event Masters</Eyebrow>
            <SectionTitle>Meet Our Top-Rated Event Specialists</SectionTitle>
            <SectionSubtitle>
              Handpicked verified decorators, photographers, and caterers with
              proven portfolios and 5-star customer reviews.
            </SectionSubtitle>
          </div>
          <PillLink to={ROUTES.SHOP}>
            View All Vendors <ArrowRight size={16} />
          </PillLink>
        </SectionHead>

        <VendorGrid>
          {vendors.map(vendor => {
            const photos = vendor.portfolio.slice(0, 3);
            return (
              <VendorCardRoot key={vendor.id}>
                <PortfolioStrip>
                  {photos.map((item, idx) => (
                    <PortfolioThumb key={item.id} $cover={idx === 0}>
                      <img
                        src={item.url}
                        alt={item.caption || vendor.businessName}
                        loading="lazy"
                      />
                    </PortfolioThumb>
                  ))}
                </PortfolioStrip>

                <CardContent>
                  <HeaderRow>
                    <VendorTitle>
                      {vendor.businessName}
                      <CheckCircle2 size={16} />
                    </VendorTitle>
                    <ExperienceBadge>
                      {vendor.experience}+ Yrs Exp
                    </ExperienceBadge>
                  </HeaderRow>

                  <LocationMeta>
                    <MapPin size={12} />
                    {vendor.city} • Verified KYC Partner
                  </LocationMeta>

                  <Description>{vendor.description}</Description>

                  <TagRow>
                    {vendor.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagRow>

                  <CardFooter>
                    <RatingBlock>
                      <RatingScore>
                        <Star size={13} fill="#f59e0b" />
                        {vendor.rating} ({vendor.reviewCount} reviews)
                      </RatingScore>
                      <PriceHint>{vendor.pricing}</PriceHint>
                    </RatingBlock>

                    <ViewVendorBtn to={`${ROUTES.SHOP}?vendor=${vendor.id}`}>
                      View Catalog
                    </ViewVendorBtn>
                  </CardFooter>
                </CardContent>
              </VendorCardRoot>
            );
          })}
        </VendorGrid>
      </SectionInner>
    </Section>
  );
}
