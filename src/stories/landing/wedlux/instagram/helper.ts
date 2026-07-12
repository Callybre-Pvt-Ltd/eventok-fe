import { useSectionMotion } from '@/hooks/gsap/useSectionMotion';
import { photography } from '@/design-system/tokens/photography';

export const useWedluxInstagram = () => {
  const scope = useSectionMotion<HTMLElement>();

  return {
    scope,
    photos: [
      photography.corporate[1],
      photography.gallery[4],
      photography.weddings[0],
    ],
  };
};
