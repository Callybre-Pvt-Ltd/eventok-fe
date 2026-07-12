import { ArrowUpRight, MapPin, Star, Users } from 'lucide-react';
import type { PortfolioProject } from '../types';
import {
  ActiveDetails,
  Card,
  CardContent,
  CardCta,
  CardImage,
  CardTitle,
  Chip,
  ChipRow,
  EssentialMeta,
  FloatingButton,
  GlassOverlay,
  LocationChip,
  MetaGrid,
  MetaItem,
  Rating,
  StatValue,
  SweepLayer,
  Vendor,
  VendorAvatar,
} from './styled';

export interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
  active: boolean;
  preload?: boolean;
}

export function PortfolioCard({
  project,
  index,
  active,
  preload,
}: PortfolioCardProps) {
  return (
    <Card
      $index={index}
      data-portfolio-card
      data-active={active ? 'true' : 'false'}
      aria-hidden={!active}
    >
      <CardImage
        data-portfolio-image
        src={project.image}
        alt={project.title}
        loading={index === 0 || preload ? 'eager' : 'lazy'}
        decoding="async"
        sizes="(max-width: 767px) 100vw, 55vw"
      />
      <GlassOverlay data-portfolio-overlay aria-hidden />
      <SweepLayer
        data-portfolio-sweep
        data-active={active ? 'true' : 'false'}
      />

      <FloatingButton
        to={project.ctaTo}
        data-portfolio-cta
        aria-label={project.ctaLabel}
        tabIndex={active ? 0 : -1}
      >
        <ArrowUpRight size={20} aria-hidden />
      </FloatingButton>

      <CardContent data-portfolio-content>
        <ChipRow>
          <Chip>{project.category}</Chip>
          <LocationChip>
            <MapPin size={11} aria-hidden />
            {project.location}
          </LocationChip>
        </ChipRow>

        <CardTitle>{project.title}</CardTitle>

        <EssentialMeta>
          <Rating>
            <Star size={12} fill="currentColor" aria-hidden />
            {project.rating.toFixed(1)}
          </Rating>
          <MetaItem>{project.eventType}</MetaItem>
        </EssentialMeta>

        <ActiveDetails data-portfolio-active-details>
          <MetaGrid>
            <Vendor>
              <VendorAvatar aria-hidden>{project.vendorInitials}</VendorAvatar>
              {project.vendorName}
            </Vendor>
            <MetaItem>
              <Users size={12} aria-hidden />
              {project.guests}
            </MetaItem>
            <MetaItem>{project.year}</MetaItem>
            <MetaItem>
              <StatValue data-portfolio-count={project.stat.value}>0</StatValue>{' '}
              {project.stat.label}
            </MetaItem>
          </MetaGrid>
          <CardCta to={project.ctaTo} tabIndex={active ? 0 : -1}>
            {project.ctaLabel}
            <ArrowUpRight size={16} aria-hidden />
          </CardCta>
        </ActiveDetails>

        {/* Desktop-only full meta (kept for desktop hover/stack content) */}
        <MetaGrid data-portfolio-desktop-meta>
          <Vendor>
            <VendorAvatar aria-hidden>{project.vendorInitials}</VendorAvatar>
            {project.vendorName}
          </Vendor>
          <MetaItem>{project.year}</MetaItem>
          <MetaItem>{project.eventType}</MetaItem>
          <MetaItem>
            <Users size={12} aria-hidden />
            {project.guests}
          </MetaItem>
          <Rating>
            <Star size={12} fill="currentColor" aria-hidden />
            {project.rating.toFixed(1)}
          </Rating>
          <MetaItem>
            <StatValue data-portfolio-count={project.stat.value}>0</StatValue>{' '}
            {project.stat.label}
          </MetaItem>
        </MetaGrid>
      </CardContent>
    </Card>
  );
}
