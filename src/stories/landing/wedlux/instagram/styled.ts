import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { media } from '@/theme';

export const InstaStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;

  ${media.belowMd} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.belowSm} {
    grid-template-columns: 1fr;
  }
`;

export const InstaCell = styled.a`
  position: relative;
  display: block;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: ${brandColors.tan};

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 3px;
  }
`;

export const InstaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.2);
  transition: transform 0.4s ease;

  ${InstaCell}:hover & {
    transform: scale(1.28);
  }
`;

export const InstaBadge = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: ${brandColors.chocolate};
  opacity: 0.92;
  transition: opacity 0.25s ease, transform 0.25s ease;

  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
  }

  ${InstaCell}:hover &,
  ${InstaCell}:focus-visible & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.05);
  }
`;
