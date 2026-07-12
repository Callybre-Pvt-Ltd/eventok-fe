import { useSectionMotion } from '@/hooks/gsap/useSectionMotion';
import { photography } from '@/design-system/tokens/photography';

const STATS = [
  {
    valueKey: 'landing.wedluxStoryStat1Value',
    labelKey: 'landing.wedluxStoryStat1Label',
  },
  {
    valueKey: 'landing.wedluxStoryStat2Value',
    labelKey: 'landing.wedluxStoryStat2Label',
  },
  {
    valueKey: 'landing.wedluxStoryStat3Value',
    labelKey: 'landing.wedluxStoryStat3Label',
  },
  {
    valueKey: 'landing.wedluxStoryStat4Value',
    labelKey: 'landing.wedluxStoryStat4Label',
  },
] as const;

export const useWedluxStory = () => {
  const scope = useSectionMotion<HTMLElement>();

  return {
    scope,
    stats: STATS,
    image: photography.weddings[1],
  };
};
