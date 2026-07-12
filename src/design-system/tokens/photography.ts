/**
 * EVENTOK DESIGN SYSTEM — Photography
 *
 * Photography over illustration. Real events. Real emotion.
 * Every image treatment defined here — never ad-hoc overlays.
 */

export const aspectRatios = {
  hero: '16 / 10',
  card: '4 / 5',
  cardWide: '3 / 2',
  gallery: '1 / 1',
  galleryTall: '3 / 4',
  banner: '21 / 9',
  portrait: '2 / 3',
} as const;

export type AspectRatio = keyof typeof aspectRatios;

export const photoTreatment = {
  /** Standard card — subtle zoom on hover */
  card: { objectFit: 'cover' as const, objectPosition: 'center' },
  /** Hero — show atmosphere */
  hero: { objectFit: 'cover' as const, objectPosition: 'center 30%' },
  /** Faces — weddings, portraits */
  portrait: { objectFit: 'cover' as const, objectPosition: 'center 20%' },
  /** Food, decor detail */
  detail: { objectFit: 'cover' as const, objectPosition: 'center' },
} as const;

/** Curated Unsplash — real event photography */
export const photography = {
  hero: {
    wedding:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85',
    corporate:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=85',
    birthday:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=85',
  },
  weddings: [
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=85',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=85',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=85',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=85',
  ],
  birthdays: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=85',
    'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=85',
    'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=85',
  ],
  corporate: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=85',
    'https://images.unsplash.com/photo-1505373877841-8d25f39d466c?w=800&q=85',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=85',
  ],
  gallery: [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=85',
    'https://images.unsplash.com/photo-1520854221256-17451b9916eb?w=600&q=85',
    'https://images.unsplash.com/photo-1519167758481-83f29da8c2c3?w=600&q=85',
    'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=85',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=85',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=85',
  ],
} as const;
