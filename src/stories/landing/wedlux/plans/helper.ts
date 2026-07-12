import { useSectionMotion } from '@/hooks/gsap/useSectionMotion';
import { photography } from '@/design-system/tokens/photography';

interface WedluxPlan {
  titleKey: string;
  priceKey: string;
  bodyKey: string;
}

const PLANS: WedluxPlan[] = [
  {
    titleKey: 'landing.wedluxPlan1Title',
    priceKey: 'landing.wedluxPlan1Price',
    bodyKey: 'landing.wedluxPlan1Body',
  },
  {
    titleKey: 'landing.wedluxPlan2Title',
    priceKey: 'landing.wedluxPlan2Price',
    bodyKey: 'landing.wedluxPlan2Body',
  },
  {
    titleKey: 'landing.wedluxPlan3Title',
    priceKey: 'landing.wedluxPlan3Price',
    bodyKey: 'landing.wedluxPlan3Body',
  },
];

export const useWedluxPlans = () => {
  const scope = useSectionMotion<HTMLElement>();

  return {
    scope,
    plans: PLANS,
    planImage: photography.weddings[2],
  };
};
