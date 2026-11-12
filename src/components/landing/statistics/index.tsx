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
  variant = 'secondary',
}: {
  value: number;
  suffix: string;
  labelKey: string;
  active: boolean;
  palette: ReturnType<typeof useTheme>['palette'];
  variant?: 'primary' | 'secondary';
}) {
  const { t } = useTranslation();
  const count = useStatCount(value, active);
  const display =
    value % 1 !== 0 ? count.toFixed(1) : Math.round(count).toLocaleString();

  return (
    <StatCard $palette={palette} $variant={variant}>
      <StatValue $palette={palette} $variant={variant}>
        {display}
        {suffix}
      </StatValue>
      <StatLabel $palette={palette} $variant={variant}>
        {t(labelKey)}
      </StatLabel>
    </StatCard>
  );
}

export function Statistics() {
  const { palette } = useTheme();
  const { ref, active, stats } = useStatistics();
  const visibleStats = stats.slice(0, 2);

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
            {visibleStats.map((stat, idx) => (
              <MotionDiv key={stat.key} variants={fadeUp}>
                <StatItem
                  value={stat.value}
                  suffix={stat.suffix}
                  labelKey={stat.labelKey}
                  active={active}
                  palette={palette}
                  variant={idx === 0 ? 'primary' : 'secondary'}
                />
              </MotionDiv>
            ))}
          </Grid>
        </MotionDiv>
      </Inner>
    </Section>
  );
}
