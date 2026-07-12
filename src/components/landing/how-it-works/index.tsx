import { MessageCircle, PartyPopper, Search, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import {
  fadeUp,
  MotionDiv,
  staggerContainer,
  viewportOnce,
} from '@/utils/motion';
import { useHowItWorks } from './helper';
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
  Step,
  StepDesc,
  StepIcon,
  StepNumber,
  StepTitle,
  Timeline,
} from './styled';

const iconMap = {
  search: Search,
  message: MessageCircle,
  shield: Shield,
  party: PartyPopper,
} as const;

export function HowItWorks() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { steps } = useHowItWorks();

  return (
    <Section $palette={palette}>
      <SectionInner>
        <SectionHeader>
          <SectionTitle $palette={palette}>
            {t('landing.howItWorksTitle')}
          </SectionTitle>
          <SectionSubtitle $palette={palette}>
            {t('landing.howItWorksSubtitle')}
          </SectionSubtitle>
        </SectionHeader>
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Timeline>
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon];
              return (
                <MotionDiv key={step.key} variants={fadeUp}>
                  <Step $palette={palette}>
                    <StepIcon $palette={palette}>
                      <Icon size={24} />
                    </StepIcon>
                    <StepNumber $palette={palette}>
                      {String(i + 1).padStart(2, '0')}
                    </StepNumber>
                    <StepTitle $palette={palette}>{t(step.titleKey)}</StepTitle>
                    <StepDesc $palette={palette}>{t(step.descKey)}</StepDesc>
                  </Step>
                </MotionDiv>
              );
            })}
          </Timeline>
        </MotionDiv>
      </SectionInner>
    </Section>
  );
}
