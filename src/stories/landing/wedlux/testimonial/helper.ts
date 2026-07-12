import { useSectionMotion } from '@/hooks/gsap/useSectionMotion';
import { photography } from '@/design-system/tokens/photography';

export const useWedluxTestimonial = () => {
  const scope = useSectionMotion<HTMLElement>();

  return {
    scope,
    image: photography.weddings[3],
    rating: 4,
  };
};
