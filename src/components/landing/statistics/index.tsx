import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import {
  fadeUp,
  MotionDiv,
  staggerContainer,
  viewportOnce,
} from '@/utils/motion';
import { useStatistics, useStatCount } from './helper';
import { Grid, Inner, Section, StatCard, StatLabel, StatValue } from './styled';

function StatItem({
  value,
  suffix,
  labelKey,
  active,
  palette,
}: {
  value: number;
  suffix: string;
  labelKey: string;
  active: boolean;
  palette: ReturnType<typeof useTheme>['palette'];
}) {
  const { t } = useTranslation();
  const count = useStatCount(value, active);
  const display =
    value % 1 !== 0 ? count.toFixed(1) : Math.round(count).toLocaleString();

  return (
    <StatCard $palette={palette}>
      <StatValue $palette={palette}>
        {display}
        {suffix}
      </StatValue>
      <StatLabel $palette={palette}>{t(labelKey)}</StatLabel>
    </StatCard>
  );
}

export function Statistics() {
  const { palette } = useTheme();
  const { ref, active, stats } = useStatistics();

  return (
    <Section $palette={palette} ref={ref}>
      <Inner>
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Grid>
            {stats.map(stat => (
              <MotionDiv key={stat.key} variants={fadeUp}>
                <StatItem
                  value={stat.value}
                  suffix={stat.suffix}
                  labelKey={stat.labelKey}
                  active={active}
                  palette={palette}
                />
              </MotionDiv>
            ))}
          </Grid>
        </MotionDiv>
      </Inner>
    </Section>
  );
}
