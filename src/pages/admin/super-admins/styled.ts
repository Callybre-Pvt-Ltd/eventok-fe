import styled from 'styled-components';
import { fontFamily, fontSizes, radii } from '@/theme';
export * from '@/components/ui/portal-primitives/styled';

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const UserAvatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.full};
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  flex-shrink: 0;
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const UserName = styled.span`
  font-weight: 600;
  font-size: ${fontSizes.sm};
  color: var(--color-text);
`;

export const UserEmail = styled.span`
  font-size: ${fontSizes.xs};
  color: var(--color-text-secondary);
`;

export const NoticeBanner = styled.div<{ $variant?: 'warning' | 'info' }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem;
  border-radius: ${radii.md};
  margin-bottom: 1.25rem;
  font-size: ${fontSizes.sm};
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'warning' ? '#f59e0b' : 'var(--color-border)'};
  background: ${({ $variant }) =>
    $variant === 'warning' ? 'rgba(245, 158, 11, 0.08)' : 'var(--color-bg-secondary)'};
  color: var(--color-text);
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem 0 0.5rem;
`;

export const ModalLabel = styled.label`
  display: block;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.5rem;
`;

export const OptionLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
`;
