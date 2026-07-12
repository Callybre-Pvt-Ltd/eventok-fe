import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { fadeUp, MotionDiv, viewportOnce } from '@/utils/motion';
import { useFaqSection } from './helper';
import {
  ChevronIcon,
  FaqAnswer,
  FaqItem,
  FaqList,
  FaqQuestion,
  Section,
  SectionInner,
  SectionTitle,
} from './styled';

export function FaqSection() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { faqItems, openId, toggle } = useFaqSection();

  return (
    <Section $palette={palette}>
      <SectionInner>
        <MotionDiv
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <SectionTitle $palette={palette}>
            {t('landing.faqTitle')}
          </SectionTitle>
          <FaqList>
            {faqItems.map(item => (
              <FaqItem key={item.id} $palette={palette}>
                <FaqQuestion
                  $palette={palette}
                  $open={openId === item.id}
                  onClick={() => toggle(item.id)}
                >
                  {item.question}
                  <ChevronIcon $open={openId === item.id}>
                    <ChevronDown size={20} />
                  </ChevronIcon>
                </FaqQuestion>
                <FaqAnswer $palette={palette} $open={openId === item.id}>
                  {item.answer}
                </FaqAnswer>
              </FaqItem>
            ))}
          </FaqList>
        </MotionDiv>
      </SectionInner>
    </Section>
  );
}
