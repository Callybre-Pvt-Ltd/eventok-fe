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

export const ControlsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 0.25rem;
`;

export const ControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 280px;
  flex-wrap: wrap;
`;

export const StatusPillGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #f1f5f9;
  padding: 0.25rem;
  border-radius: 8px;
  overflow-x: auto;
`;

export const StatusFilterBtn = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#0f172a' : '#64748b')};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'};
  border: none;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    color: #0f172a;
  }
`;

export const TableWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;

  .ant-table-thead > tr > th {
    background: #f8fafc;
    color: #475569;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e2e8f0;
    padding: 0.75rem 1rem;
  }

  .ant-table-tbody > tr > td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid #f1f5f9;
    font-size: ${fontSizes.sm};
    color: #1e293b;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f8fafc;
  }
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;

  ${({ $status }) => {
    switch ($status.toLowerCase()) {
      case 'published':
      case 'live':
        return `
          background: #ecfdf5;
          color: #059669;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #10b981;
          }
        `;
      case 'paused':
        return `
          background: #fffbeb;
          color: #d97706;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #f59e0b;
          }
        `;
      case 'rejected':
        return `
          background: #fef2f2;
          color: #dc2626;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #ef4444;
          }
        `;
      case 'under_review':
        return `
          background: #eff6ff;
          color: #2563eb;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #3b82f6;
          }
        `;
      default:
        return `
          background: #f1f5f9;
          color: #64748b;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #94a3b8;
          }
        `;
    }
  }}
`;

export const ServiceCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const ServiceTitleText = styled.span`
  font-weight: 600;
  color: #0f172a;
  font-size: ${fontSizes.sm};
`;

export const ServiceSubtext = styled.span`
  font-size: ${fontSizes.xs};
  color: #64748b;
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DrawerHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #f1f5f9;
`;

export const DrawerCategory = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${brandColors.pink500};
`;

export const DrawerTitle = styled.h2`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
`;

export const DrawerDescription = styled.p`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: #475569;
  line-height: 1.6;
`;

export const GalleryStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
`;

export const GalleryThumb = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const SectionBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
`;

export const PricingBreakdownTable = styled.div`
  background: #f8fafc;
  border-radius: 10px;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const PricingRow = styled.div<{ $highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${fontSizes.sm};
  color: ${({ $highlight }) => ($highlight ? '#0f172a' : '#64748b')};
  font-weight: ${({ $highlight }) => ($highlight ? '700' : '500')};

  ${({ $highlight }) =>
    $highlight &&
    `
    padding-top: 0.5rem;
    border-top: 1px dashed #cbd5e1;
  `}
`;

export const BulletList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: ${fontSizes.sm};
  color: #334155;
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
  padding: 0.5rem 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  font-size: ${fontSizes.sm};
`;

export const DrawerActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
`;
