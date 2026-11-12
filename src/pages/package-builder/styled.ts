import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 8rem;

  ${media.lg} {
    padding: 2rem 2.5rem 8rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: ${brandColors.chocolate};

  [data-theme='dark'] & {
    color: var(--color-text);
  }
`;

export const Subtitle = styled.p`
  margin-top: 0.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.gray600};

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const Steps = styled.ol`
  display: flex;
  gap: 0.5rem;
  margin: 1.5rem 0;
  list-style: none;
`;

export const StepItem = styled.li<{ $active: boolean }>`
  flex: 1 1 0;
  display: grid;
  gap: 0.375rem;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};

  &::before {
    content: '';
    height: 4px;
    border-radius: ${radii.full};
    background: ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  gap: 0.875rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const CategoryTile = styled.button<{ $active: boolean }>`
  display: grid;
  gap: 0.25rem;
  padding: 1rem 0.75rem;
  text-align: left;
  border-radius: ${radii.md};
  border: 1.5px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $active }) =>
    $active ? 'var(--color-primary-light)' : 'var(--color-surface)'};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--color-primary);
  }
`;

export const TileName = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};

  [data-theme='dark'] & {
    color: var(--color-text);
  }
`;

export const TileMeta = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;

export const ServiceList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const ServiceRow = styled.label<{ $active: boolean }>`
  display: grid;
  grid-template-columns: auto 4.5rem 1fr auto;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem;
  border-radius: ${radii.md};
  border: 1.5px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--color-primary);
  }
`;

export const Checkbox = styled.input`
  width: 1.125rem;
  height: 1.125rem;
  accent-color: var(--color-primary);
`;

export const RowImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: ${radii.md};
`;

export const RowTitle = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
`;

export const RowPrice = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: var(--color-primary);
`;

export const ReviewCard = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: ${radii.md};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
`;

export const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text-secondary);
`;

export const StickyBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 35;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: ${shadows.lg};

  ${media.lg} {
    padding: 1rem 2.5rem;
  }
`;

export const TotalBlock = styled.div`
  display: grid;
`;

export const TotalLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: var(--color-text-secondary);
`;

export const TotalValue = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xl};
  font-weight: 800;
  color: var(--color-primary);
`;

export const BarActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const GhostButton = styled.button`
  padding: 0.75rem 1.25rem;
  border-radius: ${radii.md};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--color-primary);
  }
`;

export const PrimaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${radii.md};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.92;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Hint = styled.p`
  margin-top: 0.75rem;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;
