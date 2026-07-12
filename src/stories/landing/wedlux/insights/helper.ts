import { useSectionMotion } from '@/hooks/gsap/useSectionMotion';
import { photography } from '@/design-system/tokens/photography';

const AVATARS = [
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=64&q=80',
] as const;

const IMAGES = [
  photography.birthdays[0],
  photography.corporate[1],
  photography.weddings[3],
] as const;

export const useWedluxInsights = () => {
  const scope = useSectionMotion<HTMLElement>();

  return {
    scope,
    posts: IMAGES.map((image, i) => ({
      image,
      avatar: AVATARS[i],
      titleKey: `landing.wedluxInsight${i + 1}Title`,
      authorKey: `landing.wedluxInsight${i + 1}Author`,
      dateKey: `landing.wedluxInsight${i + 1}Date`,
    })),
  };
};
