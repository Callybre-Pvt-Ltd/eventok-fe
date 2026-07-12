export function useCorporateEvents() {
  return {
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    features: [
      'landing.step1Title',
      'landing.step3Title',
      'landing.step4Title',
    ] as const,
  };
}
