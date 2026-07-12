export const birthdayItems = [
  {
    id: 'b1',
    title: 'Neon Glow Party',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600',
    size: 'tall' as const,
  },
  {
    id: 'b2',
    title: 'Garden Celebration',
    image: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c16?w=600',
    size: 'wide' as const,
  },
  {
    id: 'b3',
    title: 'Kids Theme Party',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600',
    size: 'normal' as const,
  },
  {
    id: 'b4',
    title: 'Elegant Soirée',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
    size: 'normal' as const,
  },
  {
    id: 'b5',
    title: 'Poolside Bash',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600',
    size: 'tall' as const,
  },
  {
    id: 'b6',
    title: 'Vintage Charm',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600',
    size: 'wide' as const,
  },
] as const;

export function useBirthdayInspirations() {
  return { items: birthdayItems };
}
