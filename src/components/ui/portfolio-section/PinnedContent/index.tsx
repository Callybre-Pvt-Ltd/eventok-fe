import { ArrowUpRight, MapPin, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PortfolioProject } from '../types';
import { ProgressIndicator } from '../ProgressIndicator';
import {
  Cta,
  DecorativeRow,
  Description,
  Eyebrow,
  MetaChip,
  MetaLine,
  NumberRow,
  Ornament,
  Panel,
  ProjectNumber,
  StatBlock,
  StatLabel,
  StatNumber,
  StatRow,
  Title,
} from './styled';

export interface PinnedContentProps {
  eyebrowLabel: string;
  project: PortfolioProject;
  projects: PortfolioProject[];
  activeIndex: number;
  total: number;
  progress: number;
  onSelectProject?: (index: number) => void;
}

export function PinnedContent({
  eyebrowLabel,
  project,
  projects,
  activeIndex,
  total,
  progress,
  onSelectProject,
}: PinnedContentProps) {
  const { t } = useTranslation();

  return (
    <Panel aria-live="polite" aria-atomic="true">
      <Eyebrow>
        <Sparkles size={14} aria-hidden />
        {eyebrowLabel}
      </Eyebrow>

      <Title key={`${project.id}-title`}>{project.title}</Title>

      <Description key={`${project.id}-desc`}>{project.story}</Description>

      <MetaLine key={`${project.id}-meta`}>
        <MetaChip>
          <MapPin size={12} aria-hidden />
          {project.location}
        </MetaChip>
        <MetaChip>{project.category}</MetaChip>
        <MetaChip>
          <Star size={12} fill="currentColor" aria-hidden />
          {project.rating.toFixed(1)}
        </MetaChip>
      </MetaLine>

      <StatRow key={`${project.id}-stats`}>
        <StatBlock>
          <StatNumber>{project.guests}</StatNumber>
          <StatLabel>{t('landing.wedluxStoryStatGuests')}</StatLabel>
        </StatBlock>
        <StatBlock>
          <StatNumber>{project.year}</StatNumber>
          <StatLabel>{t('landing.wedluxStoryStatYear')}</StatLabel>
        </StatBlock>
        <StatBlock>
          <StatNumber>{project.stat.value.toLocaleString()}</StatNumber>
          <StatLabel>{project.stat.label}</StatLabel>
        </StatBlock>
      </StatRow>

      <Cta key={`${project.id}-cta`} to={project.ctaTo}>
        {project.ctaLabel}
        <ArrowUpRight size={18} aria-hidden />
      </Cta>

      <DecorativeRow>
        <NumberRow>
          <ProjectNumber key={`${project.id}-num`}>
            {String(activeIndex + 1).padStart(2, '0')}
            <span> / {String(total).padStart(2, '0')}</span>
          </ProjectNumber>
          <Ornament aria-hidden>
            <Sparkles size={18} />
          </Ornament>
        </NumberRow>
        <ProgressIndicator
          progress={progress}
          activeIndex={activeIndex}
          projects={projects}
          onSelect={onSelectProject}
        />
      </DecorativeRow>
    </Panel>
  );
}
