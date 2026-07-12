import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { ColorTokens } from '@/design-system';
import { brandGradients } from '@/theme/brand';
import { radii, shadows, space } from '@/design-system';

export const CategoryTile = styled(Link)<{
  $colors: ColorTokens;
}>`
  flex: 0 0 260px;
  position: relative;
  border-radius: ${radii['2xl']};
  overflow: hidden;
  text-decoration: none;
  aspect-ratio: 3 / 4;
  box-shadow: ${shadows.sm};
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${brandGradients.card};
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.md};
  }
`;

export const TilePhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const TileMeta = styled.div`
  position: absolute;
  bottom: ${space[5]};
  left: ${space[5]};
  right: ${space[5]};
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TileLabel = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.02em;
`;

export const TileCount = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
`;
