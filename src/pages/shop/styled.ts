import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Page = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem clamp(1rem, 2vw, 1.75rem) 4rem;

  ${media.lg} {
    padding: 1.5rem clamp(1.25rem, 2.5vw, 2rem) 4.5rem;
  }
`;

export const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 1rem;

  ${media.lg} {
    margin-bottom: 1.5rem;
  }
`;

export const Crumb = styled(Link)`
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }
`;

export const CrumbCurrent = styled.span`
  color: var(--color-text);
  font-weight: 700;
`;

export const Layout = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.lg} {
    grid-template-columns: 19.5rem 1fr;
    gap: 2.25rem;
  }
`;

export const FiltersColumn = styled.aside`
  display: none;

  ${media.lg} {
    display: block;
    position: sticky;
    top: 5.5rem;
    align-self: start;
    max-height: calc(100vh - 6.75rem);
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ResultsColumn = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const MobileFilterBar = styled.div`
  position: sticky;
  top: 3.75rem;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0 -1rem 0.75rem;
  padding: 0.65rem 1rem;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  ${media.lg} {
    display: none;
  }
`;

export const MobileBarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
`;

export const MobileFilterBtn = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.9rem;
  min-height: 38px;
  border-radius: ${radii.full};
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $active }) =>
    $active ? 'rgba(234, 88, 12, 0.1)' : 'var(--color-bg-alt)'};
  color: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-text)'};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.18s ease;

  &:active {
    transform: scale(0.97);
  }
`;

export const MobileSortWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

export const MobileSortIcon = styled.span`
  position: absolute;
  left: 0.7rem;
  display: inline-flex;
  color: var(--color-text-secondary);
  pointer-events: none;
`;

export const MobileSortSelect = styled.select`
  padding: 0.5rem 0.85rem 0.5rem 1.95rem;
  min-height: 38px;
  border-radius: ${radii.full};
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  outline: none;
  max-width: 9.5rem;
  text-overflow: ellipsis;

  &:focus {
    border-color: var(--color-primary);
  }
`;

export const PillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 0.75rem;
  margin-bottom: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterPill = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: ${radii.full};
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-surface)'};
  color: ${({ $active }) => ($active ? '#ffffff' : 'var(--color-text)')};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: ${({ $active }) =>
    $active
      ? '0 4px 12px -2px rgba(234, 88, 12, 0.35)'
      : '0 1px 2px rgba(0, 0, 0, 0.03)'};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: var(--color-primary);
    ${({ $active }) => !$active && 'color: var(--color-primary);'}
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const Results = ResultsColumn;

export const ResultsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
export const ResultsHead = ResultsHeader;

export const TitleBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
`;

export const ResultsCount = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: var(--color-text-secondary);
`;
export const ResultCount = ResultsCount;

export const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ShopSearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 14rem;

  ${media.md} {
    flex: 0 0 16rem;
  }
`;

export const ShopSearchIcon = styled.span`
  position: absolute;
  left: 0.85rem;
  display: inline-flex;
  color: var(--color-text-muted);
  pointer-events: none;
`;

export const ShopSearchInput = styled.input`
  width: 100%;
  padding: 0.55rem 2.2rem 0.55rem 2.35rem;
  border-radius: ${radii.full};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 600;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: var(--color-text-muted);
    font-weight: 500;
  }

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.14);
  }
`;

export const ShopSearchClear = styled.button`
  position: absolute;
  right: 0.55rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  border: none;
  border-radius: 50%;
  background: var(--color-bg-alt);
  color: var(--color-text-muted);
  cursor: pointer;

  &:hover {
    color: var(--color-primary);
  }
`;

export const SortRow = styled.div`
  display: none;

  ${media.lg} {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const SortLabel = styled.label`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: var(--color-text-muted);
  white-space: nowrap;
`;

export const SortSelect = styled.select`
  padding: 0.55rem 0.9rem;
  border-radius: ${radii.full};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease;

  &:hover,
  &:focus {
    border-color: var(--color-primary);
  }
`;

export const ActiveFiltersWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
`;

export const FilterChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  border-radius: ${radii.full};
  background: rgba(234, 88, 12, 0.08);
  border: 1px solid rgba(234, 88, 12, 0.24);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: var(--color-primary);
  cursor: pointer;
  transition: background 0.15s ease, transform 0.12s ease;

  &:hover {
    background: rgba(234, 88, 12, 0.14);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const ChipRemove = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
`;

export const ClearAllBtn = styled.button`
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  padding: 0.35rem 0.5rem;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: var(--color-primary);
  }
`;

export const UpdatingTrack = styled.div<{ $active: boolean }>`
  height: 2px;
  width: 100%;
  margin-bottom: 0.75rem;
  border-radius: ${radii.full};
  overflow: hidden;
  background: ${({ $active }) =>
    $active ? 'rgba(234, 88, 12, 0.15)' : 'transparent'};
  transition: background 0.2s ease;
`;

export const UpdatingBar = styled.div<{ $active: boolean }>`
  height: 100%;
  width: 35%;
  border-radius: ${radii.full};
  background: var(--color-primary);
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  animation: ${({ $active }) =>
    $active ? 'shopSlide 1.1s ease-in-out infinite' : 'none'};

  @keyframes shopSlide {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(320%);
    }
  }
`;

export const Grid = styled.div<{ $updating?: boolean }>`
  display: grid;
  gap: 1.35rem;
  grid-template-columns: 1fr;
  opacity: ${({ $updating }) => ($updating ? 0.68 : 1)};
  transition: opacity 0.2s ease;

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Empty = styled.div`
  display: grid;
  gap: 0.85rem;
  justify-items: center;
  padding: 3.5rem 1.25rem;
  border-radius: ${radii.xl};
  border: 1px dashed var(--color-border);
  background: var(--color-surface);
  text-align: center;
  color: var(--color-text-secondary);
  font-size: ${fontSizes.sm};
  font-weight: 600;
`;

export const EmptyAction = styled.button`
  padding: 0.6rem 1.35rem;
  border: none;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s ease, transform 0.12s ease;

  &:hover {
    background: var(--color-primary-dark, #c2410c);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const SkeletonCard = styled.div`
  height: 20rem;
  border-radius: ${radii.lg};
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  opacity: 0.7;
  animation: shopPulse 1.5s ease-in-out infinite alternate;

  @keyframes shopPulse {
    from {
      opacity: 0.45;
    }
    to {
      opacity: 0.85;
    }
  }
`;

export const FabCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 800;
`;

export const SheetOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 70;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity 0.25s ease, visibility 0.25s ease;

  ${media.lg} {
    display: none;
  }
`;

export const Sheet = styled.div<{ $open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 80;
  display: flex;
  flex-direction: column;
  max-height: 88dvh;
  border-radius: ${radii.xl} ${radii.xl} 0 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  box-shadow: ${shadows.xl};
  transform: translateY(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  ${media.lg} {
    display: none;
  }
`;

export const SheetGrip = styled.span`
  width: 2.5rem;
  height: 0.25rem;
  margin: 0.65rem auto 0.2rem;
  border-radius: ${radii.full};
  background: var(--color-border);
`;

export const SheetHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1.15rem 0.8rem;
  border-bottom: 1px solid var(--color-border);
`;

export const SheetTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SheetTitle = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: var(--color-text);
`;

export const SheetClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
  color: var(--color-text);
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }
`;

export const SheetBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.5rem 1.15rem 1rem;
`;

export const SheetFoot = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.85rem 1.15rem calc(0.85rem + env(safe-area-inset-bottom));
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
`;

export const SheetReset = styled.button`
  flex: 0 0 auto;
  padding: 0.8rem 1.15rem;
  min-height: 44px;
  border-radius: ${radii.full};
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;

  &:active {
    transform: scale(0.97);
  }
`;

export const SheetApply = styled.button`
  flex: 1;
  padding: 0.8rem 1.25rem;
  min-height: 44px;
  border: none;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 14px -2px rgba(234, 88, 12, 0.35);
  transition: background 0.18s ease, transform 0.15s ease;

  &:hover {
    background: var(--color-primary-dark, #c2410c);
  }

  &:active {
    transform: scale(0.98);
  }
`;
