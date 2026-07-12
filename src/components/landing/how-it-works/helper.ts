export const howItWorksSteps = [
  {
    key: 'step1',
    titleKey: 'landing.step1Title',
    descKey: 'landing.step1Desc',
    icon: 'search',
  },
  {
    key: 'step2',
    titleKey: 'landing.step2Title',
    descKey: 'landing.step2Desc',
    icon: 'message',
  },
  {
    key: 'step3',
    titleKey: 'landing.step3Title',
    descKey: 'landing.step3Desc',
    icon: 'shield',
  },
  {
    key: 'step4',
    titleKey: 'landing.step4Title',
    descKey: 'landing.step4Desc',
    icon: 'party',
  },
] as const;

export function useHowItWorks() {
  return { steps: howItWorksSteps };
}
