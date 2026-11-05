import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, media, spacing } from '@/theme';

export const Layout = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  background: ${({ $palette }) => $palette.backgroundAlt};
  color: ${({ $palette }) => $palette.text};
  font-family: ${fontFamily.body};
  transition: background 0.25s ease, color 0.25s ease;
`;

export const Main = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
  padding: ${spacing.xl};
  max-width: 1200px;
  width: 100%;
  min-width: 0;
  margin: 0 auto;

  .ant-table-wrapper,
  .ant-table,
  .ant-table-container {
    max-width: 100%;
  }

  .ant-table-content,
  .ant-table-body {
    overflow-x: auto !important;
  }

  .ant-table-content > table,
  .ant-table-body > table {
    min-width: 720px;
  }

  .ant-pagination {
    flex-wrap: wrap;
    row-gap: 0.5rem;
  }

  ${media.belowMd} {
    padding: ${spacing.md};

    .ant-select,
    .ant-picker,
    .ant-input-affix-wrapper {
      max-width: 100%;
    }
  }
`;

export const TopBar = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.md} ${spacing.xl};
  border-bottom: 1px solid ${({ $palette }) => $palette.border};
  background: ${({ $palette }) => $palette.surface};
  position: sticky;
  top: 0;
  z-index: 50;
  transition: background 0.25s ease, border-color 0.25s ease;

  ${media.belowMd} {
    padding: ${spacing.md};
  }
`;

export const MenuBtn = styled.button<{ $palette: ThemePalette }>`
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: 10px;
  background: ${({ $palette }) => $palette.surface};
  color: ${({ $palette }) => $palette.text};
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${({ $palette }) => $palette.primary};
    color: #ffffff;
    border-color: ${({ $palette }) => $palette.primary};
  }

  ${media.belowLg} {
    display: inline-flex;
  }
`;

export const TopBarCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
`;

export const TopBarEyebrow = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
`;

export const TopBarTitle = styled.h2<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.02em;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RolePill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  background: var(--color-bg-tint);
  border: 1px solid var(--color-border);
  flex-shrink: 0;

  ${media.belowSm} {
    display: none;
  }
`;

export const TopBarTrailing = styled.div`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;
