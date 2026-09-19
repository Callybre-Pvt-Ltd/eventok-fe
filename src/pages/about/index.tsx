import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { StoreLayout } from '@/components/storefront/store-layout';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';
import { photography } from '@/design-system/tokens/photography';
import { useAboutPage } from './helper';
import {
  PageWrap,
  Hero,
  HeroMedia,
  HeroImage,
  HeroScrim,
  HeroContent,
  HeroTitle,
  HeroLead,
  Section,
  SectionInner,
  Split,
  SplitImageWrap,
  SplitImage,
  SplitCopy,
  ValuesGrid,
  ValueCard,
  Timeline,
  TimelineItem,
  TeamGrid,
  TeamCard,
  TeamPhotoWrap,
  TeamPhoto,
  StatsGrid,
  StatCard,
  Partners,
  PartnerLogo,
  CtaBand,
} from './styled';

const TEAM = [
  {
    name: 'Ananya Rao',
    role: 'Founder & CEO',
    photo:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85',
  },
  {
    name: 'Rohan Mehta',
    role: 'Head of Operations',
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85',
  },
  {
    name: 'Sneha Patel',
    role: 'Customer Experience',
    photo:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=85',
  },
];

const AWARDS = [
  'Best Marketplace 2025',
  'Wedding Wire Choice',
  'Event Tech Innovator',
];
const PARTNERS = [
  'Taj Hotels',
  'WedMeGood',
  'BookMyShow',
  'Zomato',
  'MakeMyTrip',
];

export default function AboutPage() {
  const { t } = useTranslation();
  const { palette, stats } = useAboutPage();

  return (
    <StoreLayout>
    <PageWrap $palette={palette}>
      <Hero>
        <HeroMedia>
          <HeroImage
            src={photography.gallery[4]}
            alt=""
            aria-hidden
            loading="eager"
          />
          <HeroScrim />
        </HeroMedia>
        <HeroContent
          $palette={palette}
          as={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <HeroTitle>{t('marketplace.aboutHero')}</HeroTitle>
          <HeroLead $palette={palette}>
            {t('marketplace.aboutMissionText')}
          </HeroLead>
        </HeroContent>
      </Hero>

      <Section $bg="cool" $palette={palette}>
        <SectionInner>
          <Split>
            <SplitCopy>
              <h2>{t('marketplace.aboutVision')}</h2>
              <p>{t('marketplace.aboutVisionText')}</p>
            </SplitCopy>
            <SplitImageWrap>
              <SplitImage src={photography.weddings[2]} alt="" loading="lazy" />
            </SplitImageWrap>
          </Split>
        </SectionInner>
      </Section>

      <Section $bg="warm" $palette={palette}>
        <SectionInner>
          <Split>
            <SplitCopy>
              <h2>{t('marketplace.aboutMission')}</h2>
              <p>{t('marketplace.aboutMissionText')}</p>
            </SplitCopy>
            <SplitImageWrap>
              <SplitImage src={photography.weddings[0]} alt="" loading="lazy" />
            </SplitImageWrap>
          </Split>
        </SectionInner>
      </Section>

      <Section $palette={palette}>
        <SectionInner>
          <Split $reverse>
            <SplitCopy>
              <h2>{t('marketplace.aboutStory')}</h2>
              <p>{t('marketplace.aboutStoryText')}</p>
            </SplitCopy>
            <SplitImageWrap>
              <SplitImage src={photography.weddings[1]} alt="" loading="lazy" />
            </SplitImageWrap>
          </Split>
        </SectionInner>
      </Section>

      <Section $bg="cool" $palette={palette}>
        <SectionInner>
          <h2>{t('marketplace.aboutValues')}</h2>
          <ValuesGrid>
            <ValueCard $palette={palette}>
              <h3>{t('marketplace.aboutValueTrust')}</h3>
              <p>{t('marketplace.aboutValueTrustDesc')}</p>
            </ValueCard>
            <ValueCard $palette={palette}>
              <h3>{t('marketplace.aboutValueHuman')}</h3>
              <p>{t('marketplace.aboutValueHumanDesc')}</p>
            </ValueCard>
            <ValueCard $palette={palette}>
              <h3>{t('marketplace.aboutValueJoy')}</h3>
              <p>{t('marketplace.aboutValueJoyDesc')}</p>
            </ValueCard>
          </ValuesGrid>
        </SectionInner>
      </Section>

      <Section $palette={palette}>
        <SectionInner>
          <h2>{t('marketplace.aboutTimeline')}</h2>
          <Timeline $palette={palette}>
            {[
              '2020 — Founded in Mumbai',
              '2022 — 500+ events hosted',
              '2024 — Pan-India expansion',
              '2026 — 12,000+ happy hosts',
            ].map(item => (
              <TimelineItem
                key={item}
                $palette={palette}
                as={motion.div}
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -24 }}
                viewport={{ once: true }}
              >
                {item}
              </TimelineItem>
            ))}
          </Timeline>
        </SectionInner>
      </Section>

      <Section $bg="warm" $palette={palette}>
        <SectionInner>
          <h2>{t('marketplace.aboutTeam')}</h2>
          <TeamGrid>
            {TEAM.map(m => (
              <TeamCard key={m.name} $palette={palette}>
                <TeamPhotoWrap>
                  <TeamPhoto src={m.photo} alt={m.name} loading="lazy" />
                </TeamPhotoWrap>
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </TeamCard>
            ))}
          </TeamGrid>
        </SectionInner>
      </Section>

      <Section $palette={palette}>
        <SectionInner>
          <h2>{t('marketplace.aboutStats')}</h2>
          <StatsGrid>
            {stats.map(s => (
              <StatCard key={s.label} $palette={palette}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </StatCard>
            ))}
          </StatsGrid>
        </SectionInner>
      </Section>

      <Section $bg="cool" $palette={palette}>
        <SectionInner>
          <h2>{t('marketplace.aboutAwards')}</h2>
          <ValuesGrid>
            {AWARDS.map(a => (
              <ValueCard key={a} $palette={palette}>
                {a}
              </ValueCard>
            ))}
          </ValuesGrid>
        </SectionInner>
      </Section>

      <Section $palette={palette}>
        <SectionInner>
          <h2>{t('marketplace.aboutPartners')}</h2>
          <Partners>
            {PARTNERS.map(p => (
              <PartnerLogo key={p} $palette={palette}>
                {p}
              </PartnerLogo>
            ))}
          </Partners>
        </SectionInner>
      </Section>

      <CtaBand $palette={palette}>
        <h2>{t('marketplace.aboutCta')}</h2>
        <Link to={ROUTES.SHOP}>
          <Button variant="primary" size="lg">
            {t('landing.heroCta')}
          </Button>
        </Link>
      </CtaBand>
    </PageWrap>
    </StoreLayout>
  );
}
