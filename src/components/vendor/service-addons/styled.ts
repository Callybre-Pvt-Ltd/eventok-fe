import styled from 'styled-components';
import { fontSizes } from '@/theme';
import { brandColors } from '@/theme/brand';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CommissionNotice = styled.div`
  padding: 0.75rem 1rem;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  font-size: ${fontSizes.xs};
  color: #166534;
  line-height: 1.5;

  strong {
    color: #14532d;
  }
`;

export const AddonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AddonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
  gap: 0.75rem;
`;

export const AddonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex: 1;
`;

export const AddonName = styled.span<{ $inactive?: boolean }>`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${({ $inactive }) => ($inactive ? '#94a3b8' : '#1e293b')};
  text-decoration: ${({ $inactive }) => ($inactive ? 'line-through' : 'none')};
`;

export const AddonDesc = styled.span`
  font-size: ${fontSizes.xs};
  color: #64748b;
`;

export const AddonPrice = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.pink600};
`;

export const AddonActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const RemoveBtn = styled.button`
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  color: #94a3b8;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;

  &:hover {
    color: #ef4444;
    background: #fee2e2;
  }
`;

export const AddForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.85rem;
  background: #ffffff;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
`;

export const AddFormRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const EmptyAddons = styled.div`
  padding: 1.25rem;
  text-align: center;
  color: #94a3b8;
  font-size: ${fontSizes.xs};
  background: #f8fafc;
  border-radius: 8px;
`;
