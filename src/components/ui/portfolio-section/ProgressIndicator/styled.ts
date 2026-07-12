import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { media } from '@/theme';

export const ProgressRoot = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: 100%;

  ${media.md} {
    gap: 0.85rem;
  }
`;

export const DotTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  min-width: 0;
`;

export const Dot = styled.button<{ $active?: boolean; $done?: boolean }>`
  appearance: none;
  flex: ${({ $active }) => ($active ? '1.4' : '1')};
  min-width: 0;
  height: 0.35rem;
  min-height: 0.35rem;
  padding: 0;
  border: none;
  border-radius: 9999px;
  background: ${({ $active, $done }) =>
    $active || $done ? brandColors.gold : `rgba(${brandRgb.chocolate}, 0.15)`};
  cursor: pointer;
  transition: flex 0.35s ease, background 0.35s ease, transform 0.25s ease;
  touch-action: manipulation;

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 3px;
  }

  ${media.md} {
    height: 0.28rem;
  }
`;

export const ThumbRow = styled.div`
  display: none;

  ${media.md} {
    display: flex;
    gap: 0.35rem;
    flex-shrink: 0;
  }
`;

export const Thumb = styled.button<{ $active?: boolean }>`
  appearance: none;
  padding: 0;
  border: 2px solid
    ${({ $active }) => ($active ? brandColors.gold : 'transparent')};
  border-radius: 8px;
  overflow: hidden;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  transform: scale(${({ $active }) => ($active ? 1.05 : 1)});
  transition: opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  background: ${brandColors.tan};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const ProgressLabel = styled.span`
  flex-shrink: 0;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.taupe};
`;
