import styled from 'styled-components';
import { fontSizes } from '@/theme';
import { brandColors } from '@/theme/brand';

export * from '@/components/ui/portal-primitives/styled';

export const KycGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 1.5rem;
  margin-bottom: 1.25rem;
`;

export const KycRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const KycLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${brandColors.gray600};

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const KycValue = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 600;
`;

export const DocList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

export const DocThumb = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.6rem;
  font-size: ${fontSizes.xs};
  text-decoration: none;
  color: var(--color-primary);
  background: var(--color-surface);
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--color-primary);
    background: var(--color-bg-alt);
  }
`;
