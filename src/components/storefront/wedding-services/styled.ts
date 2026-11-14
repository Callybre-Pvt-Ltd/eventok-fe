import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2.5rem;

  ${media.belowMd} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
  }
`;

export const HeaderContent = styled.div`
  max-width: 44rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
  margin-bottom: 0.5rem;

  svg {
    color: var(--color-primary);
    flex-shrink: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${fontFamily.display};
  font-size: clamp(1.85rem, 3.2vw, 2.6rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 0;
`;

export const SectionSubtitle = styled.p`
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin-top: 0.65rem;
  margin-bottom: 0;
`;

export const HeaderAction = styled.div`
  flex-shrink: 0;

  ${media.belowMd} {
    width: 100%;
  }
`;

export const ExploreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.625rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: var(--color-primary-hover);
  }

  &:active {
    transform: translateY(0);
  }

  ${media.belowMd} {
    width: 100%;
  }
`;

export const WeddingGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.5rem;
  }
`;

export const WeddingCard = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: ${radii.lg};
  overflow: hidden;
  text-decoration: none;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  transition: transform 0.25s ease, border-color 0.25s ease;

  [data-theme='light'] & {
    background: #ffffff;
    border-color: rgba(225, 218, 205, 0.85);

    &:hover {
      transform: translateY(-4px);
      border-color: var(--color-primary);
    }
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: rgba(255, 255, 255, 0.1);

    &:hover {
      transform: translateY(-4px);
      border-color: var(--color-primary);
    }
  }
`;

export const CardMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-surface-hover);
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  transition: transform 0.35s ease;

  ${WeddingCard}:hover & {
    transform: scale(1.06);
  }
`;

export const MediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background 0.25s ease;

  [data-theme='light'] & {
    background: rgba(20, 16, 12, 0.04);
  }

  [data-theme='dark'] & {
    background: rgba(10, 14, 24, 0.18);
  }
`;

export const CardTag = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
  padding: 0.28rem 0.65rem;
  border-radius: ${radii.full};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  background: rgba(18, 14, 10, 0.78);
  backdrop-filter: blur(8px);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const CardBody = styled.div`
  padding: 1.15rem 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const CardTitle = styled.h3`
  font-family: ${fontFamily.body};
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
  margin: 0;
  transition: color 0.2s ease;

  ${WeddingCard}:hover & {
    color: var(--color-primary);
  }
`;

export const CardDescription = styled.p`
  font-size: 0.825rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  margin-top: 0.45rem;
  margin-bottom: 1.15rem;
  flex: 1;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--color-border);
`;

export const PriceTag = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const PricePrefix = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
`;

export const PriceValue = styled.span`
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-primary);
`;

export const ExploreLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--color-text);
  transition: gap 0.2s ease, color 0.2s ease;

  ${WeddingCard}:hover & {
    color: var(--color-primary);
    gap: 0.55rem;
  }
`;
