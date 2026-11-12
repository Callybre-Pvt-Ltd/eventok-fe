import styled from 'styled-components';
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
  background: rgba(14, 16, 23, 0.35);
`;

export const Caption = styled.span`
  position: absolute;
  top: 0.875rem;
  left: 0.875rem;
  right: 0.875rem;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: #ffffff;
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
  background: #ffffff;
  color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    color: #ffffff;
    transform: scale(1.08);
  }
`;
