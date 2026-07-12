import { MobileStickyHeader } from './MobileStickyHeader';
import { PinnedContent } from './PinnedContent';
import { PortfolioCard } from './PortfolioCard';
import { useAnimationController } from './useAnimationController';
import type { PortfolioProject } from './types';
import {
  Atmosphere,
  Glow,
  PinnedViewport,
  SectionRoot,
  StageWrap,
  Track,
} from './styled';

export type { PortfolioProject, PortfolioStat } from './types';

export interface PortfolioSectionProps {
  eyebrowLabel: string;
  projects: PortfolioProject[];
}

/**
 * Desktop: pinned left panel + heavy card stack.
 * Mobile: independent image-first experience — compact sticky header,
 * photography-dominant cards, peek stacking, lighter motion.
 */
export function PortfolioSection({
  eyebrowLabel,
  projects,
}: PortfolioSectionProps) {
  const { sectionRef, trackRef, activeIndex, progress, scrollToIndex } =
    useAnimationController(projects.length);
  const activeProject = projects[activeIndex] ?? projects[0];

  return (
    <SectionRoot ref={sectionRef} id="portfolio" aria-label={eyebrowLabel}>
      <Atmosphere aria-hidden>
        <Glow data-portfolio-glow $x="-8%" $y="10%" $size="42vw" />
        <Glow data-portfolio-glow $x="70%" $y="55%" $size="36vw" />
        <Glow data-portfolio-glow $x="40%" $y="80%" $size="28vw" />
      </Atmosphere>

      <Track ref={trackRef}>
        <PinnedViewport>
          <MobileStickyHeader
            project={activeProject}
            projects={projects}
            activeIndex={activeIndex}
            total={projects.length}
            onSelect={scrollToIndex}
          />

          <PinnedContent
            eyebrowLabel={eyebrowLabel}
            project={activeProject}
            projects={projects}
            activeIndex={activeIndex}
            total={projects.length}
            progress={progress}
            onSelectProject={scrollToIndex}
          />

          <StageWrap data-portfolio-stage>
            {projects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                project={project}
                index={index}
                active={index === activeIndex}
                preload={index === activeIndex + 1}
              />
            ))}
          </StageWrap>
        </PinnedViewport>
      </Track>
    </SectionRoot>
  );
}
