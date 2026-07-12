import { quickChips } from '../filters';
import { Chip, ChipRail, ChipsSection } from '../styled';

interface QuickChipsProps {
  active: string[];
  onToggle: (id: string) => void;
}

export function DiscoveryQuickChips({ active, onToggle }: QuickChipsProps) {
  return (
    <ChipsSection>
      <ChipRail role="toolbar" aria-label="Quick filters">
        {quickChips.map(chip => (
          <Chip
            key={chip.id}
            type="button"
            $active={active.includes(chip.id)}
            aria-pressed={active.includes(chip.id)}
            onClick={() => onToggle(chip.id)}
          >
            {chip.label}
          </Chip>
        ))}
      </ChipRail>
    </ChipsSection>
  );
}
