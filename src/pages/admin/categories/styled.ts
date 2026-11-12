import styled from 'styled-components';
import { brandColors, fontSizes, fontWeight, media, radii } from '@/theme';

export * from '@/components/ui/portal-primitives/styled';

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;

  ${media.belowSm} {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ToolbarSearch = styled.div`
  flex: 1;
  max-width: 24rem;

  ${media.belowSm} {
    max-width: none;
  }
`;

export const NameText = styled.span`
  font-weight: ${fontWeight.bold};
  color: var(--color-text);
`;

export const StatusTag = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.6rem;
  border-radius: ${radii.full};
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.medium};
  color: ${({ $active }) =>
    $active ? brandColors.success500 : brandColors.gray600};
  background: ${({ $active }) =>
    $active ? brandColors.success50 : brandColors.gray100};

  [data-theme='dark'] & {
    background: ${({ $active }) =>
      $active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.2)'};
    color: ${({ $active }) =>
      $active ? '#34d399' : 'var(--color-text-secondary)'};
  }
`;

export const RowActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const FormLabel = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeight.medium};
  color: var(--color-text);
`;
