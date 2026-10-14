import styled from 'styled-components';
import { fontSizes } from '@/theme';

export * from '@/components/ui/portal-primitives/styled';

export const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

export const FilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex: 1;
`;

export const MetaRow = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.15rem;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const DrawerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

export const DrawerLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
`;

export const DrawerValue = styled.span`
  font-size: ${fontSizes.sm};
  color: #0f172a;
`;

export const ContactNotice = styled.div<{ $revealed?: boolean }>`
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  background: ${({ $revealed }) => ($revealed ? '#f0fdf4' : '#f8fafc')};
  border: 1px solid ${({ $revealed }) => ($revealed ? '#bbf7d0' : '#e2e8f0')};
  font-size: ${fontSizes.xs};
  color: ${({ $revealed }) => ($revealed ? '#166534' : '#64748b')};
`;

export const RefundNotice = styled.div`
  padding: 0.75rem 0.9rem;
  border-radius: 8px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  font-size: ${fontSizes.xs};
  color: #991b1b;
  line-height: 1.4;
`;
