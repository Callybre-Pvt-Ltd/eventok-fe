import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import {
  fadeUp,
  MotionDiv,
  staggerContainer,
  viewportOnce,
} from '@/utils/motion';
import { useBirthdayInspirations } from './helper';
import {
  ItemLabel,
  Masonry,
  MasonryItem,
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from './styled';

export function BirthdayInspirations() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { items } = useBirthdayInspirations();

  return (
    <Section $palette={palette}>
      <SectionInner>
        <SectionHeader>
          <SectionTitle $palette={palette}>
            {t('landing.birthdayTitle')}
          </SectionTitle>
          <SectionSubtitle $palette={palette}>
            {t('landing.birthdaySubtitle')}
          </SectionSubtitle>
        </SectionHeader>
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Masonry>
            {items.map(item => (
              <MotionDiv key={item.id} variants={fadeUp}>
                <MasonryItem
                  $palette={palette}
                  $url={item.image}
                  $size={item.size}
                >
                  <ItemLabel>{item.title}</ItemLabel>
                </MasonryItem>
              </MotionDiv>
            ))}
          </Masonry>
        </MotionDiv>
      </SectionInner>
    </Section>
  );
}
