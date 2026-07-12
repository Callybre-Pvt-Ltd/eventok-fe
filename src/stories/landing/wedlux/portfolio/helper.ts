import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { photography } from '@/design-system/tokens/photography';
import type { PortfolioProject } from '@/components/ui/portfolio-section';

const CARD_SOURCES = [
  {
    image: photography.weddings[0],
    statValue: 400,
    accent: '#2A2522',
    year: '2025',
    guests: '180–250',
    rating: 4.9,
    initials: 'EC',
  },
  {
    image: photography.corporate[0],
    statValue: 18,
    accent: '#5C534C',
    year: '2025',
    guests: '300–450',
    rating: 4.8,
    initials: 'LX',
  },
  {
    image: photography.weddings[2],
    statValue: 32,
    accent: '#2A2522',
    year: '2024',
    guests: '120–180',
    rating: 5.0,
    initials: 'DS',
  },
  {
    image: photography.birthdays[0],
    statValue: 120,
    accent: '#5C534C',
    year: '2025',
    guests: '60–90',
    rating: 4.9,
    initials: 'MS',
  },
  {
    image: photography.corporate[1],
    statValue: 850,
    accent: '#2A2522',
    year: '2024',
    guests: '500+',
    rating: 4.8,
    initials: 'CV',
  },
  {
    image: photography.weddings[1],
    statValue: 96,
    accent: '#5C534C',
    year: '2025',
    guests: '150–200',
    rating: 4.9,
    initials: 'GL',
  },
  {
    image: photography.birthdays[1],
    statValue: 60,
    accent: '#2A2522',
    year: '2024',
    guests: '40–70',
    rating: 4.7,
    initials: 'RH',
  },
  {
    image: photography.weddings[3],
    statValue: 4,
    accent: '#5C534C',
    year: '2025',
    guests: '100–140',
    rating: 5.0,
    initials: 'UP',
  },
] as const;

export const useWedluxPortfolio = () => {
  const { t } = useTranslation();

  const projects: PortfolioProject[] = CARD_SOURCES.map((source, i) => {
    const n = i + 1;
    return {
      id: `story-card-${n}`,
      image: source.image,
      title: t(`landing.wedluxStoryCard${n}Title`),
      location: t(`landing.wedluxStoryCard${n}Location`),
      category: t(`landing.wedluxStoryCard${n}Category`),
      story: t(`landing.wedluxStoryCard${n}Description`),
      metadata: t('landing.wedluxStoryCardMetadata'),
      eventType: t(`landing.wedluxStoryCard${n}EventType`),
      year: source.year,
      guests: source.guests,
      rating: source.rating,
      vendorName: t('landing.wedluxStoryCardPartner'),
      vendorInitials: source.initials,
      stat: {
        value: source.statValue,
        label: t(`landing.wedluxStoryCard${n}StatLabel`),
      },
      ctaLabel: t('landing.wedluxStoryCardCta'),
      ctaTo: ROUTES.VENDORS,
      accent: source.accent,
    };
  });

  return {
    eyebrowLabel: t('landing.wedluxStoryEyebrow'),
    projects,
  };
};
