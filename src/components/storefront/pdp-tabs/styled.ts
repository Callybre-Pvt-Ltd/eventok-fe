import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontSizes, radii } from '@/theme';

export const Panel = styled.section`
  margin-top: 1.5rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  overflow: hidden;

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);
  }
`;

export const TabBar = styled.div`
  display: flex;
  gap: 1.25rem;
  padding: 0 1.125rem;
  border-bottom: 1px solid ${brandColors.tan};
  overflow-x: auto;
  scrollbar-width: none;

  [data-theme='dark'] & {
    border-bottom-color: var(--color-border);
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Tab = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 0.875rem 0;
  border: none;
  background: transparent;
  white-space: nowrap;
  cursor: pointer;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${({ $active }) =>
    $active ? brandColors.pink500 : brandColors.gray600};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${({ $active }) =>
      $active ? brandColors.pink500 : 'transparent'};
  }

  [data-theme='dark'] & {
    color: ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};

    &::after {
      background: ${({ $active }) =>
        $active ? 'var(--color-primary)' : 'transparent'};
    }
  }
`;

export const Body = styled.div`
  padding: 1.125rem;
`;

export const Intro = styled.p`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.gray600};
  margin-bottom: 0.75rem;

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const FeatureRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${brandColors.tan};

  &:last-child {
    border-bottom: none;
  }

  [data-theme='dark'] & {
    border-bottom-color: var(--color-border);
  }
`;

export const FeatureName = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};

  [data-theme='dark'] & {
    color: var(--color-text);
  }
`;

export const IncludedChip = styled.span`
  padding: 0.1875rem 0.625rem;
  border-radius: ${radii.full};
  background: ${brandColors.success50};
  color: ${brandColors.success500};
  font-size: ${fontSizes.xs};
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  [data-theme='dark'] & {
    background: rgba(16, 185, 129, 0.15);
    color: #34d399;
  }
`;

export const List = styled.ul`
  display: grid;
  gap: 0.625rem;
  padding-left: 1.125rem;
`;

export const ListItem = styled.li`
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.gray600};

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const Paragraph = styled.p`
  font-size: ${fontSizes.sm};
  font-weight: 500;
  line-height: 1.7;
  color: ${brandColors.gray600};

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;
