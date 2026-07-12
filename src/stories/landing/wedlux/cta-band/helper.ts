import { useSectionMotion } from '@/hooks/gsap/useSectionMotion';

export const useWedluxCtaBand = () => {
  const scope = useSectionMotion<HTMLElement>();

  return { scope };
};
