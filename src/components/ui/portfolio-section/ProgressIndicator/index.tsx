import type { PortfolioProject } from '../types';
import {
  Dot,
  DotTrack,
  ProgressLabel,
  ProgressRoot,
  Thumb,
  ThumbRow,
} from './styled';

export interface ProgressIndicatorProps {
  progress: number;
  activeIndex: number;
  projects: PortfolioProject[];
  onSelect?: (index: number) => void;
}

export function ProgressIndicator({
  progress,
  activeIndex,
  projects,
  onSelect,
}: ProgressIndicatorProps) {
  const percent = Math.round(progress * 100);

  return (
    <ProgressRoot role="group" aria-label={`Portfolio progress ${percent}%`}>
      <ProgressLabel aria-hidden>{percent}%</ProgressLabel>
      <DotTrack role="tablist" aria-label="Projects">
        {projects.map((project, index) => {
          const active = index === activeIndex;
          const done = index < activeIndex;
          return (
            <Dot
              key={project.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`${project.title} (${index + 1} of ${
                projects.length
              })`}
              $active={active}
              $done={done}
              onClick={() => onSelect?.(index)}
            />
          );
        })}
      </DotTrack>
      <ThumbRow aria-hidden>
        {projects.slice(0, 5).map((project, index) => (
          <Thumb
            key={project.id}
            type="button"
            $active={index === activeIndex}
            onClick={() => onSelect?.(index)}
            tabIndex={-1}
          >
            <img src={project.image} alt="" loading="lazy" />
          </Thumb>
        ))}
      </ThumbRow>
    </ProgressRoot>
  );
}
