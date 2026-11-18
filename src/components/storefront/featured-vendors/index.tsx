import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
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
import { useFeaturedVendors } from '@/components/landing/featured-vendors/helper';
import {
  CardContent,
  CardFooter,
  Description,
  ExperienceBadge,
  HeaderRow,
  PortfolioStrip,
  PortfolioThumb,
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
  const { vendors } = useFeaturedVendors();

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
            const photos = (vendor.portfolio ?? []).slice(0, 3);
            return (
              <VendorCardRoot key={vendor.id}>
                {photos.length > 0 && (
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
                )}

                <CardContent>
                  <HeaderRow>
                    <VendorTitle>
                      {vendor.businessName}
                      <CheckCircle2 size={16} />
                    </VendorTitle>
                    {vendor.experience ? (
                      <ExperienceBadge>
                        {vendor.experience}+ Yrs Exp
                      </ExperienceBadge>
                    ) : null}
                  </HeaderRow>

                  <Description>{vendor.description}</Description>

                  {vendor.tags?.length ? (
                    <TagRow>
                      {vendor.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagRow>
                  ) : null}

                  <CardFooter>
                    <RatingBlock>
                      <RatingScore>
                        <Star size={13} fill="#f59e0b" />
                        {vendor.rating} ({vendor.reviewCount} reviews)
                      </RatingScore>
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
