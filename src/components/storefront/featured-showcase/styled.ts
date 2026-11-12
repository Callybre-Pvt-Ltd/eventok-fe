import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const ShowcaseSection = styled.section`
  width: 100%;
  padding: 3.5rem clamp(1rem, 3.5vw, 2.5rem);
  background: var(--color-bg);

  ${media.md} {
    padding: 4.5rem clamp(1.5rem, 4vw, 3rem);
  }
`;

export const ShowcaseInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const Eyebrow = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
`;

export const Title = styled.h2`
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-text);
`;

export const Subtitle = styled.p`
  font-size: ${fontSizes.sm};
  color: var(--color-text-secondary);
  max-width: 38rem;
`;

export const HeaderLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;

  &:hover {
    color: var(--color-primary-hover);
    text-decoration: underline;
  }
`;

export const WeddingSplitGrid = styled.div`
  display: grid;
  gap: 1.75rem;
  grid-template-columns: 1fr;

  ${media.lg} {
    grid-template-columns: 1.25fr 1fr;
    align-items: stretch;
  }
`;

export const MasterFeatureCard = styled.div`
  position: relative;
  border-radius: ${radii.xl};
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 20px var(--color-shadow);
  display: flex;
  flex-direction: column;
`;

export const MasterMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${MasterFeatureCard}:hover img {
    transform: scale(1.03);
  }
`;

export const MasterBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.35rem 0.75rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const MasterBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  justify-content: space-between;
`;

export const MasterMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const MasterTitle = styled.h3`
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: var(--color-text);
`;

export const MasterDesc = styled.p`
  font-size: ${fontSizes.sm};
  color: var(--color-text-secondary);
  line-height: 1.5;
`;

export const MasterFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
`;

export const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PriceTag = styled.span`
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: var(--color-primary);
`;

export const BookCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.25rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  transition: background 0.18s ease;

  &:hover {
    background: var(--color-primary-hover);
  }
`;

export const MiniGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  ${media.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: 1fr;
  }
`;

export const MiniCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem;
  border-radius: ${radii.lg};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 2px 8px var(--color-shadow);
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
  }
`;

export const MiniThumb = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: ${radii.md};
  object-fit: cover;
  flex-shrink: 0;
`;

export const MiniDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

export const MiniTitle = styled.h4`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MiniTag = styled.span`
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
`;

export const MiniPrice = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: var(--color-primary);
`;

export const BirthdayTrioGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TrioCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: ${radii.xl};
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 16px var(--color-shadow);
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--color-primary);
  }
`;

export const TrioMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  ${TrioCard}:hover img {
    transform: scale(1.04);
  }
`;

export const TrioBody = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const TrioTag = styled.span`
  font-size: 0.6875rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-primary);
  letter-spacing: 0.05em;
`;

export const TrioTitle = styled.h4`
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: var(--color-text);
`;

export const TrioPrice = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: var(--color-text);
  margin-top: auto;
  padding-top: 0.5rem;
`;
