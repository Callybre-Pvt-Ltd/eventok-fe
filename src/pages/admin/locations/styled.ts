import styled, { keyframes } from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes } from '@/theme';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  animation: ${fadeUp} 0.3s ease-out both;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HeaderSection = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const HeaderEyebrow = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.pink500};
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;
`;

export const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: #64748b;
  max-width: 38rem;
  line-height: 1.5;
`;

export const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const MetricTile = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const MetricLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
`;

export const MetricValue = styled.span`
  font-family: ${fontFamily.display};
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
`;

export const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const StateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StateItem = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
  }
`;

export const StateHeader = styled.div<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  cursor: pointer;
  background: ${({ $expanded }) => ($expanded ? '#f8fafc' : '#ffffff')};
  user-select: none;
  transition: background 0.15s ease;

  &:hover {
    background: #f8fafc;
  }
`;

export const StateHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StateName = styled.span`
  font-weight: 700;
  font-size: ${fontSizes.sm};
  color: #0f172a;
`;

export const StateHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CityGrid = styled.div`
  padding: 1rem 1.25rem;
  border-top: 1px solid #f1f5f9;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
  background: #ffffff;
`;

export const CityCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.85rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: ${fontSizes.sm};
  color: #334155;
`;

export const CityName = styled.span`
  font-weight: 500;
`;

export const VendorBadge = styled.span<{ $count: number }>`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  background: ${({ $count }) => ($count > 0 ? '#ecfdf5' : '#f1f5f9')};
  color: ${({ $count }) => ($count > 0 ? '#059669' : '#94a3b8')};
`;
