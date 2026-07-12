import { useTranslation } from 'react-i18next';
import { landingStoryArc, SectionShell } from '@/design-system';
import { useTrustStrip } from './helper';
import { StatItem, StatLabel, StatsRow, StatValue } from './styled';

const pattern = landingStoryArc[1];

export function TrustStrip() {
  const { t } = useTranslation();
  const { colors, stats } = useTrustStrip();

  return (
    <SectionShell pattern={pattern}>
      <StatsRow>
        {stats.map(s => (
          <StatItem key={s.key} $colors={colors}>
            <StatValue $colors={colors}>{s.value}</StatValue>
            <StatLabel $colors={colors}>{t(`landing.${s.key}`)}</StatLabel>
          </StatItem>
        ))}
      </StatsRow>
    </SectionShell>
  );
}
