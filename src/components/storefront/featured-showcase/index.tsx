import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import {
  BirthdayTrioGrid,
  BookCta,
  Eyebrow,
  HeaderContent,
  HeaderLink,
  MasterBadge,
  MasterBody,
  MasterDesc,
  MasterFeatureCard,
  MasterFoot,
  MasterMedia,
  MasterMeta,
  MasterTitle,
  MiniCard,
  MiniDetails,
  MiniGrid,
  MiniPrice,
  MiniTag,
  MiniThumb,
  MiniTitle,
  PriceBlock,
  PriceTag,
  SectionHeader,
  ShowcaseInner,
  ShowcaseSection,
  Subtitle,
  Title,
  TrioBody,
  TrioCard,
  TrioMedia,
  TrioPrice,
  TrioTag,
  TrioTitle,
  WeddingSplitGrid,
} from './styled';

const WEDDING_MINIS = [
  {
    title: 'Vibrant Haldi Marigold Pavilion',
    tag: 'Traditional & Floral',
    price: '₹9,500',
    img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
    link: `${ROUTES.SHOP}?event=wedding&theme=haldi`,
  },
  {
    title: 'Glow Mehndi & Fairy Light Lounge',
    tag: 'Intimate Gathering',
    price: '₹12,000',
    img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80',
    link: `${ROUTES.SHOP}?event=wedding&theme=mehndi`,
  },
  {
    title: 'Royal Varmala Stage Backdrop',
    tag: 'Stage & Framing',
    price: '₹16,800',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
    link: `${ROUTES.SHOP}?event=wedding&theme=stage`,
  },
];

const BIRTHDAY_TRIO = [
  {
    title: 'Organic Pastel Balloon Arch & Custom Signage',
    tag: 'Milestone Birthdays',
    price: 'From ₹4,500',
    img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    link: `${ROUTES.SHOP}?event=birthday&style=balloon`,
  },
  {
    title: 'Neon Glow Starlight Cocktail Setup',
    tag: 'Evening Soiree',
    price: 'From ₹7,200',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    link: `${ROUTES.SHOP}?event=birthday&style=neon`,
  },
  {
    title: 'Boho Teepee & Floral Canopy Picnic',
    tag: 'Anniversaries & Proposals',
    price: 'From ₹6,000',
    img: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=600&q=80',
    link: `${ROUTES.SHOP}?event=anniversary&style=boho`,
  },
];

export function FeaturedShowcase() {
  return (
    <ShowcaseSection>
      <ShowcaseInner>
        {/* Pillar 1: Wedding Collections */}
        <div>
          <SectionHeader>
            <HeaderContent>
              <Eyebrow>Curated Collections</Eyebrow>
              <Title>Weddings &amp; Grand Ceremonies</Title>
              <Subtitle>
                Handcrafted Mandap staging, floral arches, and thematic
                ceremonial decor designed by India&apos;s leading wedding
                stylists.
              </Subtitle>
            </HeaderContent>
            <HeaderLink to={`${ROUTES.SHOP}?event=wedding`}>
              View All Wedding Decor <ArrowRight size={16} />
            </HeaderLink>
          </SectionHeader>

          <WeddingSplitGrid style={{ marginTop: '1.75rem' }}>
            <MasterFeatureCard>
              <MasterMedia>
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80"
                  alt="Luxe Floral Wedding Staging"
                />
                <MasterBadge>Signature Setup</MasterBadge>
              </MasterMedia>
              <MasterBody>
                <MasterMeta>
                  <MasterTitle>
                    Ivory &amp; Rose Golden Mandap Pavilion
                  </MasterTitle>
                  <MasterDesc>
                    Complete setup including brass urli accents, fragrant
                    jasmine curtains, cushioned seating for 20, and precision
                    warm spotlighting.
                  </MasterDesc>
                </MasterMeta>
                <MasterFoot>
                  <PriceBlock>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      All-Inclusive Package
                    </span>
                    <PriceTag>₹32,000</PriceTag>
                  </PriceBlock>
                  <BookCta to={`${ROUTES.SHOP}?event=wedding`}>
                    View Details <ArrowRight size={14} />
                  </BookCta>
                </MasterFoot>
              </MasterBody>
            </MasterFeatureCard>

            <MiniGrid>
              {WEDDING_MINIS.map(mini => (
                <MiniCard key={mini.title} to={mini.link}>
                  <MiniThumb src={mini.img} alt={mini.title} />
                  <MiniDetails>
                    <MiniTag>{mini.tag}</MiniTag>
                    <MiniTitle>{mini.title}</MiniTitle>
                    <MiniPrice>{mini.price}</MiniPrice>
                  </MiniDetails>
                  <ArrowRight size={16} color="var(--color-primary)" />
                </MiniCard>
              ))}
            </MiniGrid>
          </WeddingSplitGrid>
        </div>

        {/* Pillar 2: Birthdays, Anniversaries & Private Soirees */}
        <div>
          <SectionHeader>
            <HeaderContent>
              <Eyebrow>Intimate Gatherings</Eyebrow>
              <Title>Birthdays, Anniversaries &amp; Parties</Title>
              <Subtitle>
                Expressive backdrops, bespoke balloon installations, and
                romantic setups customized to your space in under 3 hours.
              </Subtitle>
            </HeaderContent>
            <HeaderLink to={`${ROUTES.SHOP}?event=birthday`}>
              Explore Party Themes <ArrowRight size={16} />
            </HeaderLink>
          </SectionHeader>

          <BirthdayTrioGrid style={{ marginTop: '1.75rem' }}>
            {BIRTHDAY_TRIO.map(trio => (
              <TrioCard key={trio.title} to={trio.link}>
                <TrioMedia>
                  <img src={trio.img} alt={trio.title} />
                </TrioMedia>
                <TrioBody>
                  <TrioTag>{trio.tag}</TrioTag>
                  <TrioTitle>{trio.title}</TrioTitle>
                  <TrioPrice>{trio.price}</TrioPrice>
                </TrioBody>
              </TrioCard>
            ))}
          </BirthdayTrioGrid>
        </div>
      </ShowcaseInner>
    </ShowcaseSection>
  );
}
