import styled from 'styled-components';
import { fontSizes, media, radii } from '@/theme';

export const AdminTableCard = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.lg};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04),
    0 2px 8px -2px rgba(0, 0, 0, 0.05) !important;
  overflow: hidden;
  margin-top: 0.5rem;

  /* Reset table container */
  .ant-table-wrapper {
    overflow-x: auto;
  }

  .ant-table {
    background: transparent;
    font-size: ${fontSizes.sm};
  }

  /* Table Header */
  .ant-table-thead > tr > th {
    background: #f8fafc !important;
    color: #475569 !important;
    font-size: 0.72rem !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.06em !important;
    border-bottom: 1px solid var(--color-border) !important;
    padding: 12px 18px !important;
    white-space: nowrap;

    &::before {
      display: none !important; /* Hide AntD column dividers */
    }
  }

  /* Table Body */
  .ant-table-tbody > tr > td {
    padding: 14px 18px !important;
    border-bottom: 1px solid var(--color-border-light) !important;
    font-size: ${fontSizes.sm};
    color: var(--color-text);
    vertical-align: middle;
  }

  .ant-table-tbody > tr:last-child > td {
    border-bottom: none !important;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f8fafc !important;
  }

  /* Pagination Bar */
  .ant-pagination {
    margin: 0 !important;
    padding: 14px 18px !important;
    border-top: 1px solid var(--color-border-light);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;

    ${media.belowSm} {
      justify-content: center !important;
      padding: 12px 8px !important;
    }
  }

  .ant-pagination-item-active {
    border-color: var(--color-primary) !important;
    background: var(--color-primary-light) !important;
    a {
      color: var(--color-primary) !important;
      font-weight: 700;
    }
  }
`;

export const AdminToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;

  ${media.belowSm} {
    flex-direction: column;
    align-items: stretch;
    gap: 0.85rem;
  }
`;

export const AdminToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 280px;
  flex-wrap: wrap;

  ${media.belowSm} {
    min-width: 0;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0.6rem;

    .ant-input-affix-wrapper,
    .ant-select {
      width: 100% !important;
    }
  }
`;

export const AdminToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;

  ${media.belowSm} {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const FilterGroup = styled.div`
  display: inline-flex;
  align-items: center;
  background: #f1f5f9;
  padding: 3px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.belowSm} {
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
  }
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  color: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 3px rgba(0, 0, 0, 0.08)' : 'none'};
  border: none;
  padding: 0.4rem 0.85rem;
  border-radius: 6px;
  font-size: ${fontSizes.xs};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
  }
`;

export const StatusPill = styled.span<{
  $variant: 'success' | 'warning' | 'error' | 'neutral' | 'info';
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  white-space: nowrap;

  ${({ $variant }) => {
    switch ($variant) {
      case 'success':
        return `
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #10b981;
          }
        `;
      case 'warning':
        return `
          background: #fffbeb;
          color: #d97706;
          border: 1px solid #fde68a;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #f59e0b;
          }
        `;
      case 'error':
        return `
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #ef4444;
          }
        `;
      case 'info':
        return `
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
          &::before {
            content: '';
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #3b82f6;
          }
        `;
      case 'neutral':
      default:
        return `
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #cbd5e1;
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

export const CellStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const CellPrimary = styled.span`
  font-weight: 600;
  color: var(--color-text);
  font-size: ${fontSizes.sm};
  line-height: 1.35;
`;

export const CellSecondary = styled.span`
  font-size: ${fontSizes.xs};
  color: var(--color-text-secondary);
  line-height: 1.3;
`;

export const PriceCellText = styled.span<{ $accent?: boolean }>`
  font-weight: 700;
  font-size: ${fontSizes.sm};
  font-variant-numeric: tabular-nums;
  color: ${({ $accent }) => ($accent ? '#059669' : 'var(--color-text)')};
  text-align: right;
  display: block;
`;
