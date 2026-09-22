import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Page = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 1.25rem 1rem 3rem;

  ${media.lg} {
    padding: 1.5rem 2.5rem 4rem;
  }
`;

export const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.gray400};
  margin-bottom: 1.25rem;
`;

export const Crumb = styled(Link)`
  color: ${brandColors.gray600};
  text-decoration: none;

  &:hover {
    color: ${brandColors.pink500};
  }
`;

export const CrumbCurrent = styled.span`
  color: ${brandColors.chocolate};
  font-weight: 700;
`;

export const Layout = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.lg} {
    grid-template-columns: 16.5rem 1fr;
    gap: 2rem;
  }
`;

export const Results = styled.div`
  min-width: 0;
`;

export const PillRow = styled.div`
  display: flex;
  gap: 0.625rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.25rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterPill = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1.125rem;
  white-space: nowrap;
  border-radius: ${radii.full};
  border: 1px solid
    ${({ $active }) => ($active ? brandColors.pink500 : brandColors.tan)};
  background: ${({ $active }) =>
    $active ? brandColors.pink100 : brandColors.white};
  color: ${({ $active }) =>
    $active ? brandColors.pink500 : brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${brandColors.pink500};
  }
`;

export const ResultsHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const PageTitle = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.375rem, 3vw, 1.75rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const ResultCount = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.gray600};
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${media.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Empty = styled.div`
  display: grid;
  gap: 0.75rem;
  justify-items: center;
  padding: 3rem 1rem;
  border-radius: ${radii.lg};
  border: 1px dashed ${brandColors.tan};
  text-align: center;
  color: ${brandColors.gray600};
  font-size: ${fontSizes.sm};
  font-weight: 600;
`;

export const EmptyAction = styled.button`
  padding: 0.5rem 1.25rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
`;

export const SkeletonCard = styled.div`
  height: 20rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: linear-gradient(
    90deg,
    ${brandColors.gray100} 25%,
    ${brandColors.cream} 50%,
    ${brandColors.gray100} 75%
  );
  background-size: 200% 100%;
  animation: shopShimmer 1.4s ease-in-out infinite;

  @keyframes shopShimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;

export const FiltersColumn = styled.div`
  display: none;

  ${media.lg} {
    display: block;
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
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.ink900};
  color: ${brandColors.white};
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
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: 0.65rem;
  font-weight: 800;
`;

export const SheetOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 70;
  background: rgba(${brandRgb.ink}, 0.5);
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
  background: ${brandColors.white};
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
  background: ${brandColors.tan};
`;

export const SheetHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem 0.75rem;
  border-bottom: 1px solid ${brandColors.tan};
`;

export const SheetTitle = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const SheetClose = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.gray100};
  color: ${brandColors.chocolate};
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
  border-top: 1px solid ${brandColors.tan};
`;

export const SheetReset = styled.button`
  flex: 0 0 auto;
  padding: 0.8rem 1.1rem;
  border-radius: ${radii.full};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
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
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 800;
  cursor: pointer;
`;
