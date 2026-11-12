import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import {
  Badge,
  CardBody,
  CardMedia,
  CardMeta,
  CardPricing,
  CardTag,
  CardTitle,
  CardVendor,
  FieldLabel,
  FieldSelect,
  FloatingPill,
  Headline,
  HeroCopy,
  HeroInner,
  HeroSection,
  MainCard,
  PillIconWrap,
  PillInfo,
  PillSubtitle,
  PillText,
  PillTitle,
  PriceFrom,
  PriceValue,
  SearchAction,
  SearchField,
  SearchWidget,
  Subheadline,
  TrustItem,
  TrustRow,
  VisualShowcase,
} from './styled';

const CITIES = [
  'Delhi-NCR',
  'Mumbai',
  'Bengaluru',
  'Jaipur',
  'Chandigarh',
  'Pune',
  'Hyderabad',
];

const EVENTS = [
  { value: '', label: 'All Celebrations' },
  { value: 'wedding', label: 'Weddings & Receptions' },
  { value: 'birthday', label: 'Birthday Parties' },
  { value: 'anniversary', label: 'Romantic Anniversaries' },
  { value: 'baby-shower', label: 'Baby Showers' },
  { value: 'corporate', label: 'Corporate Events' },
  { value: 'home-decoration', label: 'Festive Home Pooja' },
];

const SERVICES = [
  { value: '', label: 'All Service Types' },
  { value: 'mandap-decoration', label: 'Mandap & Floral Decor' },
  { value: 'balloon-decoration', label: 'Balloon & Theme Styling' },
  { value: 'photographer', label: 'Photography & Drone' },
  { value: 'catering', label: 'Gourmet Catering' },
  { value: 'lighting-and-sound', label: 'DJ, Sound & Lighting' },
];

export function HeroPlanner() {
  const navigate = useNavigate();
  const [city, setCity] = useState('Delhi-NCR');
  const [eventType, setEventType] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (eventType) params.set('event', eventType);
    if (serviceCategory) params.set('category', serviceCategory);
    navigate(`${ROUTES.SHOP}?${params.toString()}`);
  };

  return (
    <HeroSection>
      <HeroInner>
        <HeroCopy>
          <Badge>
            <Sparkles size={14} /> India’s Premier Celebration Marketplace
          </Badge>
          <Headline>
            Craft Extraordinary Celebrations. <span>Cherish Every Moment.</span>
          </Headline>
          <Subheadline>
            Book verified wedding decorators, birthday stylists, caterers and
            cinematic photographers with 100% on-time setup guarantee and
            transparent pricing.
          </Subheadline>

          <SearchWidget role="search">
            <SearchField>
              <FieldLabel>
                <MapPin size={12} /> City
              </FieldLabel>
              <FieldSelect
                value={city}
                onChange={e => setCity(e.target.value)}
                aria-label="Select City"
              >
                {CITIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </FieldSelect>
            </SearchField>

            <SearchField>
              <FieldLabel>Celebration</FieldLabel>
              <FieldSelect
                value={eventType}
                onChange={e => setEventType(e.target.value)}
                aria-label="Select Event Type"
              >
                {EVENTS.map(ev => (
                  <option key={ev.value} value={ev.value}>
                    {ev.label}
                  </option>
                ))}
              </FieldSelect>
            </SearchField>

            <SearchField>
              <FieldLabel>Service</FieldLabel>
              <FieldSelect
                value={serviceCategory}
                onChange={e => setServiceCategory(e.target.value)}
                aria-label="Select Service"
              >
                {SERVICES.map(sc => (
                  <option key={sc.value} value={sc.value}>
                    {sc.label}
                  </option>
                ))}
              </FieldSelect>
            </SearchField>

            <SearchAction type="button" onClick={handleSearch}>
              Explore Services <ArrowRight size={16} />
            </SearchAction>
          </SearchWidget>

          <TrustRow>
            <TrustItem>
              <CheckCircle2 size={16} /> 100% On-Time Setup Guarantee
            </TrustItem>
            <TrustItem>
              <ShieldCheck size={16} /> 500+ Verified KYC Partners
            </TrustItem>
            <TrustItem>
              <Clock size={16} /> Same-Day Availability Support
            </TrustItem>
          </TrustRow>
        </HeroCopy>

        <VisualShowcase>
          <MainCard>
            <CardMedia>
              <img
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80"
                alt="Royal Floral Celebration Archway"
                loading="eager"
              />
              <CardTag>Spotlight of the Week</CardTag>
            </CardMedia>
            <CardBody>
              <CardMeta>
                <CardTitle>
                  Royal Floral Arch &amp; Fairy Light Canopy
                </CardTitle>
                <CardVendor>By Priya Events Studio • Mumbai</CardVendor>
              </CardMeta>
              <CardPricing>
                <PriceFrom>Starting At</PriceFrom>
                <PriceValue>₹24,999</PriceValue>
              </CardPricing>
            </CardBody>
          </MainCard>

          <FloatingPill to={`${ROUTES.SHOP}?event=wedding`}>
            <PillInfo>
              <PillIconWrap>
                <TrendingUp size={18} />
              </PillIconWrap>
              <PillText>
                <PillTitle>Trending Celebration Packages</PillTitle>
                <PillSubtitle>
                  Over 450+ celebrations styled across India this month
                </PillSubtitle>
              </PillText>
            </PillInfo>
            <ArrowRight size={16} color="var(--color-primary)" />
          </FloatingPill>
        </VisualShowcase>
      </HeroInner>
    </HeroSection>
  );
}
