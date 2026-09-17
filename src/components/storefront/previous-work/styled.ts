import styled from 'styled-components';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';
import { fontSizes, media, radii } from '@/theme';

export const Card = styled.article`
  position: relative;
  width: 14rem;
  aspect-ratio: 9 / 16;
  overflow: hidden;
  border-radius: ${radii.xl};

  ${media.lg} {
    width: 16rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${brandGradients.cardDark};
`;

export const Caption = styled.span`
  position: absolute;
  top: 0.875rem;
  left: 0.875rem;
  right: 0.875rem;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.white};
`;

export const Play = styled.button`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 3.25rem;
  height: 3.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${radii.full};
  background: rgba(${brandRgb.white}, 0.92);
  color: ${brandColors.pink500};
  cursor: pointer;

  &:hover {
    background: ${brandColors.white};
  }
`;
