import { photography } from '@/design-system/tokens/photography';

export type ProcessStepId =
  | 'explore'
  | 'discover'
  | 'enquire'
  | 'admin'
  | 'booking'
  | 'celebrate';

export interface ProcessStep {
  id: ProcessStepId;
  number: string;
  titleKey: string;
  bodyKey: string;
  highlightKey: string;
}

export const processTrustBadges = [
  'landing.wedluxHowTrustVerified',
  'landing.wedluxHowTrustSecure',
  'landing.wedluxHowTrustAdmin',
  'landing.wedluxHowTrustPayment',
  'landing.wedluxHowTrustPrivacy',
] as const;

export const processFlowNodes = [
  'landing.wedluxHowFlowBrowse',
  'landing.wedluxHowFlowEnquire',
  'landing.wedluxHowFlowAdmin',
  'landing.wedluxHowFlowVendor',
  'landing.wedluxHowFlowQuote',
  'landing.wedluxHowFlowBook',
  'landing.wedluxHowFlowCelebrate',
] as const;

export const processSteps: ProcessStep[] = [
  {
    id: 'explore',
    number: '01',
    titleKey: 'landing.wedluxHow1Title',
    bodyKey: 'landing.wedluxHow1Body',
    highlightKey: 'landing.wedluxHow1Highlight',
  },
  {
    id: 'discover',
    number: '02',
    titleKey: 'landing.wedluxHow2Title',
    bodyKey: 'landing.wedluxHow2Body',
    highlightKey: 'landing.wedluxHow2Highlight',
  },
  {
    id: 'enquire',
    number: '03',
    titleKey: 'landing.wedluxHow3Title',
    bodyKey: 'landing.wedluxHow3Body',
    highlightKey: 'landing.wedluxHow3Highlight',
  },
  {
    id: 'admin',
    number: '04',
    titleKey: 'landing.wedluxHow4Title',
    bodyKey: 'landing.wedluxHow4Body',
    highlightKey: 'landing.wedluxHow4Highlight',
  },
  {
    id: 'booking',
    number: '05',
    titleKey: 'landing.wedluxHow5Title',
    bodyKey: 'landing.wedluxHow5Body',
    highlightKey: 'landing.wedluxHow5Highlight',
  },
  {
    id: 'celebrate',
    number: '06',
    titleKey: 'landing.wedluxHow6Title',
    bodyKey: 'landing.wedluxHow6Body',
    highlightKey: 'landing.wedluxHow6Highlight',
  },
];

export const processVendorTags = [
  'landing.wedluxHowTagPhoto',
  'landing.wedluxHowTagDecor',
  'landing.wedluxHowTagCatering',
  'landing.wedluxHowTagEntertainment',
  'landing.wedluxHowTagPlanners',
  'landing.wedluxHowTagCorporate',
] as const;

export const processVisualPhotos = {
  vendors: [
    photography.weddings[0],
    photography.birthdays[0],
    photography.corporate[0],
  ],
  portfolio: [
    photography.weddings[1],
    photography.gallery[0],
    photography.weddings[2],
    photography.gallery[2],
  ],
  celebrate: photography.weddings[3],
} as const;
