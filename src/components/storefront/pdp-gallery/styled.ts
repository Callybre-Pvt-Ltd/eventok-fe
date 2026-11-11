import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontSizes, radii } from '@/theme';

export const Frame = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${radii.xl};
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  aspect-ratio: 4 / 3;
  box-shadow: 0 4px 20px var(--color-shadow);
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
  transition: filter 0.3s ease;

  [data-theme='light'] & {
    filter: brightness(0.99) contrast(1.03) saturate(1.04);
  }

  [data-theme='dark'] & {
    filter: brightness(0.94) contrast(1.06) saturate(1.02);
  }
`;

export const EmptyFrame = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  min-height: 12rem;
  color: var(--color-text-muted);
  font-size: ${fontSizes.sm};
  font-weight: 650;
  background: var(--color-bg-alt);
`;

export const BadgeRow = styled.div`
  position: absolute;
  left: 0.875rem;
  bottom: 0.875rem;
  display: flex;
  gap: 0.5rem;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3125rem 0.6875rem;
  border-radius: ${radii.full};
  background: rgba(${brandRgb.white}, 0.94);
  color: ${brandColors.chocolate};
  font-size: ${fontSizes.xs};
  font-weight: 700;
`;

export const VerifiedBadge = styled(Badge)`
  color: ${brandColors.success500};
`;

export const RatingBadge = styled(Badge)`
  position: absolute;
  right: 0.875rem;
  bottom: 0.875rem;
  color: ${brandColors.chocolate};
`;

export const Thumbs = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-top: 0.75rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Thumb = styled.button<{ $active: boolean }>`
  width: 5.5rem;
  height: 4.25rem;
  flex: 0 0 auto;
  padding: 0;
  overflow: hidden;
  border-radius: ${radii.md};
  border: 2px solid
    ${({ $active }) => ($active ? 'var(--color-primary)' : 'var(--color-border)')};
  background: var(--color-surface);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3125rem 0.75rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink100};
  color: ${brandColors.pink500};
  font-size: ${fontSizes.xs};
  font-weight: 700;
`;
