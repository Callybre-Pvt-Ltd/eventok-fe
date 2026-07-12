import type { PortfolioProject } from '../types';
import {
  MobileCategory,
  MobileDot,
  MobileDots,
  MobileHeader,
  MobileNumber,
  MobileTitle,
  MobileTopRow,
} from './styled';

export interface MobileStickyHeaderProps {
  project: PortfolioProject;
  activeIndex: number;
  total: number;
  onSelect?: (index: number) => void;
  projects: PortfolioProject[];
}

export function MobileStickyHeader({
  project,
  activeIndex,
  total,
  onSelect,
  projects,
}: MobileStickyHeaderProps) {
  return (
    <MobileHeader aria-live="polite">
      <MobileTopRow>
        <MobileNumber>
          {String(activeIndex + 1).padStart(2, '0')}
          <span> / {String(total).padStart(2, '0')}</span>
        </MobileNumber>
        <MobileCategory key={`${project.id}-cat`}>
          {project.category}
        </MobileCategory>
      </MobileTopRow>
      <MobileTitle key={`${project.id}-title`}>{project.title}</MobileTitle>
      <MobileDots role="tablist" aria-label="Projects">
        {projects.map((item, index) => (
          <MobileDot
            key={item.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`${item.title} (${index + 1} of ${total})`}
            $active={index === activeIndex}
            $done={index < activeIndex}
            onClick={() => onSelect?.(index)}
          />
        ))}
      </MobileDots>
    </MobileHeader>
  );
}
