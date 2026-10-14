import styled from 'styled-components';
import { fontSizes } from '@/theme';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ControlsRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SelectionToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  font-size: ${fontSizes.xs};
  color: #64748b;
`;

export const CityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.5rem;
  max-height: 240px;
  overflow-y: auto;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const EmptyCities = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: #94a3b8;
  font-size: ${fontSizes.xs};
`;

export const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #f1f5f9;
`;

export const SummaryTitle = styled.div`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #475569;
`;

export const StateCoverageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const StateCoverageItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  background: #fafafa;
  border-radius: 6px;
`;

export const StateCoverageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: #1e293b;
`;

export const StateCityCount = styled.span`
  font-size: ${fontSizes.xs};
  color: #64748b;
  font-weight: 400;
  margin-left: 0.4rem;
`;

export const CityPillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

export const CityPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: #f1f5f9;
  color: #334155;
  font-size: ${fontSizes.xs};
  font-weight: 500;

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #94a3b8;
    display: inline-flex;
    align-items: center;
    &:hover {
      color: #ef4444;
    }
  }
`;

export const RemoveStateBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${fontSizes.xs};
  color: #94a3b8;
  cursor: pointer;
  &:hover {
    color: #ef4444;
  }
`;
