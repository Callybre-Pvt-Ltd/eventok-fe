import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Page = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.5rem clamp(1rem, 3.5vw, 2.5rem) 4rem;
`;

export const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
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
  gap: 2rem;
  grid-template-columns: 1fr;

  ${media.lg} {
    grid-template-columns: 18rem 1fr;
    gap: 2.5rem;
  }
`;

export const FiltersColumn = styled.aside`
  display: none;

  ${media.lg} {
    display: block;
    position: sticky;
    top: 5.5rem;
    align-self: start;
    max-height: calc(100vh - 7rem);
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

export const PillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterPill = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 1rem;
  border-radius: ${radii.full};
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-bg-alt)'};
  color: ${({ $active }) => ($active ? '#ffffff' : 'var(--color-text)')};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    ${({ $active }) => !$active && 'color: var(--color-primary);'}
  }
`;

export const Results = ResultsColumn;

export const ResultsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;

  ${media.sm} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
export const ResultsHead = ResultsHeader;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PageTitle = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
`;

export const ResultsCount = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text-secondary);
`;
export const ResultCount = ResultsCount;

export const SortRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: ${radii.md};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 600;
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
  margin-bottom: 1.5rem;
`;

export const FilterChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text);
`;

export const ChipRemove = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0;

  &:hover {
    color: var(--color-primary);
  }
`;

export const ClearAllBtn = styled.button`
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  padding: 0.3rem 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const Empty = styled.div`
  display: grid;
  gap: 0.75rem;
  justify-items: center;
  padding: 3rem 1rem;
  border-radius: ${radii.lg};
  border: 1px dashed var(--color-border);
  text-align: center;
  color: var(--color-text-secondary);
  font-size: ${fontSizes.sm};
  font-weight: 600;
`;

export const EmptyAction = styled.button`
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s ease;

  &:hover {
    background: var(--color-primary-dark, #c2410c);
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

export const FilterFab = styled.button`
  position: fixed;
  left: 50%;
  bottom: 1.1rem;
  z-index: 60;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.4rem;
  border: 1px solid var(--color-border);
  border-radius: ${radii.full};
  background: var(--color-surface);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  box-shadow: ${shadows.xl};
  cursor: pointer;

  ${media.lg} {
    display: none;
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
  background: rgba(15, 23, 42, 0.6);
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
  max-height: 85dvh;
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
  margin: 0.6rem auto 0.2rem;
  border-radius: ${radii.full};
  background: var(--color-border);
`;

export const SheetHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
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
`;

export const SheetBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.75rem 1rem 0;
`;

export const SheetFoot = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.85rem 1rem calc(0.85rem + env(safe-area-inset-bottom));
  border-top: 1px solid var(--color-border);
`;

export const SheetReset = styled.button`
  flex: 0 0 auto;
  padding: 0.8rem 1.1rem;
  border-radius: ${radii.full};
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
`;

export const SheetApply = styled.button`
  flex: 1;
  padding: 0.8rem 1.1rem;
  border: none;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 800;
  cursor: pointer;
  transition: background 0.18s ease;

  &:hover {
    background: var(--color-primary-dark, #c2410c);
  }
`;
