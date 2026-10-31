import styled, { keyframes } from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes } from '@/theme';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  animation: ${fadeUp} 0.35s ease-out both;
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
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;
`;

export const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: #64748b;
  max-width: 32rem;
  line-height: 1.5;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const FilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 260px;

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
    flex-wrap: wrap;

    .ant-input-affix-wrapper {
      max-width: 100% !important;
      width: 100%;
      min-height: 42px;
      font-size: 15px;
    }
  }
`;

export const StatusPillGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: #f1f5f9;
  padding: 0.25rem;
  border-radius: 8px;
  flex-wrap: nowrap;
  flex-shrink: 0;
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

  @media (max-width: 768px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.7rem;
  }
`;

export const CountText = styled.span`
  font-size: ${fontSizes.xs};
  color: #64748b;
  font-weight: 500;
`;

export const ServiceTableWrap = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow-x: auto;
  max-width: 100%;
`;

export const ServiceRow = styled.div`
  display: grid;
  grid-template-columns: 64px 2.5fr 1.2fr 1.5fr 1.3fr 1fr 1fr 50px;
  min-width: 900px;
  align-items: center;
  padding: 1rem 1.25rem;
  gap: 1rem;
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s ease;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f8fafc;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 56px 2fr 1.2fr 1.5fr 1fr 40px;
    min-width: 0;
    .hide-tablet {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    padding: 1rem;
    min-width: 0;
    position: relative;
  }
`;

export const ServiceTableHeader = styled.div`
  display: grid;
  grid-template-columns: 64px 2.5fr 1.2fr 1.5fr 1.3fr 1fr 1fr 50px;
  min-width: 900px;
  padding: 0.75rem 1.25rem;
  gap: 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;

  & > div {
    white-space: nowrap;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 56px 2fr 1.2fr 1.5fr 1fr 40px;
    .hide-tablet {
      display: none;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Thumbnail = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  overflow: hidden;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ServiceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

export const ServiceTitleText = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ServiceSubtext = styled.span`
  font-size: ${fontSizes.xs};
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CategoryTag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.55rem;
  background: #f1f5f9;
  color: #334155;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  width: fit-content;
`;

export const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const PriceMain = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: #0f172a;
`;

export const PriceCustomer = styled.span`
  font-size: 0.72rem;
  color: #16a34a;
  font-weight: 600;
`;

export const AreaText = styled.span`
  font-size: ${fontSizes.xs};
  color: #475569;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatusIndicator = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ $status }) =>
    $status === 'PUBLISHED'
      ? brandColors.success500
      : $status === 'ARCHIVED'
      ? brandColors.danger500
      : brandColors.gray600};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const DateText = styled.span`
  font-size: ${fontSizes.xs};
  color: #94a3b8;
`;

export const ActionCell = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 0.75rem;
    right: 0.5rem;

    .ant-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: #f1f5f9;
    }
  }
`;

export const EmptyWorkspace = styled.div`
  padding: 4rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: #ffffff;
  border: 1px dashed #cbd5e1;
  border-radius: 12px;

  h3 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
  }

  p {
    margin: 0;
    max-width: 28rem;
    font-size: ${fontSizes.sm};
    color: #64748b;
    line-height: 1.5;
  }
`;

export const DrawerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

export const DrawerSectionTitle = styled.h4`
  margin: 0;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
`;

export const DrawerImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const DrawerThumb = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
`;
