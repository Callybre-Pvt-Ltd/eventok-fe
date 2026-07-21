import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const padX = `
  max(1rem, env(safe-area-inset-left, 0px))
  max(1rem, env(safe-area-inset-right, 0px))
`;

const hoverFine = `@media (hover: hover) and (pointer: fine)`;
const reduceMotion = `@media (prefers-reduced-motion: reduce)`;

export const PageWrap = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: ${brandColors.ivory};
  color: ${brandColors.chocolate};
  overflow-x: clip;
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  min-width: 0;
`;

export const HeroSection = styled.section`
  padding: clamp(1.25rem, 4vw, 2rem) ${padX} 0.5rem;
  background: linear-gradient(
    180deg,
    ${brandColors.cream} 0%,
    ${brandColors.ivory} 100%
  );

  ${media.md} {
    padding: clamp(4.5rem, 12vw, 5.75rem) ${padX} 0.85rem;
  }
`;

export const HeroInner = styled.div`
  max-width: 40rem;
`;

export const HeroEyebrow = styled.span`
  display: none;
  margin-bottom: 0.45rem;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${brandColors.gold};

  ${media.md} {
    display: block;
  }
`;

export const HeroTitle = styled.h1`
  margin: 0 0 0.35rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.35rem, 5.5vw, 2.35rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

export const HeroLead = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: clamp(0.8125rem, 2vw, 0.9875rem);
  font-weight: 500;
  line-height: 1.55;
  color: ${brandColors.taupe};

  ${media.belowMd} {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

/* ── Sticky discovery shell ────────────────────────────────── */

export const StickyCluster = styled.div<{ $compact?: boolean }>`
  position: sticky;
  top: var(--public-header-height, 4.25rem);
  z-index: 40;
  margin: 0;
  background: rgba(${brandRgb.ivory}, 0.98);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(${brandRgb.chocolate}, 0.06);
  will-change: transform;
  transition: box-shadow 0.3s ease;
  box-shadow: ${({ $compact }) =>
    $compact ? '0 8px 24px rgba(28, 25, 23, 0.06)' : 'none'};
`;

export const FilterShell = styled.div<{ $compact?: boolean }>`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ $compact }) => ($compact ? '0.5rem' : '0.75rem')} ${padX}
    ${({ $compact }) => ($compact ? '0.5rem' : '0.75rem')};

  ${media.md} {
    padding: ${({ $compact }) => ($compact ? '0.5rem' : '0.75rem')} ${padX}
      ${({ $compact }) => ($compact ? '0.45rem' : '0.55rem')};
  }
`;

export const MobileToolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 3rem 3rem;
  gap: 0.5rem;
  align-items: center;

  ${media.md} {
    display: none;
  }
`;

export const DesktopFilters = styled.div`
  display: none;

  ${media.md} {
    display: grid;
    grid-template-columns:
      minmax(0, 2fr)
      repeat(4, minmax(0, 1fr))
      auto;
    gap: 0.5rem;
    align-items: end;
  }

  ${media.lg} {
    grid-template-columns:
      minmax(0, 2.2fr)
      repeat(4, minmax(0, 1fr))
      auto;
    gap: 0.625rem;
  }
`;

export const FilterGrid = styled.div`
  display: none;
`;

export const SearchWrap = styled.div`
  position: relative;
  min-width: 0;
`;

export const SearchField = styled.label<{ $tall?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  min-height: ${({ $tall }) => ($tall ? '48px' : '44px')};
  height: ${({ $tall }) => ($tall ? '48px' : '44px')};
  padding: 0 0.75rem 0 2.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
  background: ${brandColors.white};
  box-shadow: 0 1px 2px rgba(${brandRgb.black}, 0.03);

  svg {
    position: absolute;
    left: 0.85rem;
    width: 16px;
    height: 16px;
    color: ${brandColors.taupe};
    pointer-events: none;
  }

  input {
    width: 100%;
    min-width: 0;
    border: none;
    background: transparent;
    font-family: ${fontFamily.body};
    font-size: 16px;
    font-weight: 500;
    color: ${brandColors.chocolate};
    outline: none;

    &::placeholder {
      color: ${brandColors.taupe};
      font-size: 0.875rem;
    }

    ${media.md} {
      font-size: 0.875rem;
    }
  }

  &:focus-within {
    border-color: rgba(201, 162, 39, 0.55);
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.16);
  }
`;

export const IconToolBtn = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  min-width: 3rem;
  height: 48px;
  min-height: 48px;
  padding: 0;
  border-radius: 0.75rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(${brandRgb.black}, 0.03);

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const SuggestList = styled.ul`
  position: absolute;
  z-index: 50;
  top: calc(100% + 0.35rem);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.35rem;
  list-style: none;
  max-height: 14rem;
  overflow: auto;
  border-radius: 0.85rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.1);
  background: ${brandColors.white};
  box-shadow: 0 16px 40px rgba(${brandRgb.black}, 0.12);
`;

export const SuggestItem = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  min-height: 40px;
  padding: 0.5rem 0.7rem;
  border: none;
  border-radius: 0.55rem;
  background: transparent;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: ${brandColors.cream};
  }
`;

export const DesktopOnly = styled.div`
  display: none;
  min-width: 0;

  ${media.md} {
    display: block;
  }
`;

export const MobileOnly = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5rem;

  ${media.md} {
    display: none;
  }

  select {
    width: 8.5rem;
  }
`;

export const DesktopWide = styled.div`
  display: none;
  min-width: 0;
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: end;
  justify-self: end;
`;

export const GhostAction = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 44px;
  height: 44px;
  padding: 0 0.85rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const MoreFiltersBtn = styled(GhostAction)`
  display: inline-flex;
  align-self: end;
`;

export const FilterCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.15rem;
  height: 1.15rem;
  padding: 0 0.28rem;
  border-radius: 9999px;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
  font-size: 0.625rem;
  font-weight: 800;

  ${IconToolBtn} & {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
  }
`;

/* Multi select */

export const MultiWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  min-width: 0;

  > span {
    font-family: ${fontFamily.body};
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${brandColors.taupe};
  }
`;

export const MultiTrigger = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.35rem;
  width: 100%;
  min-height: 44px;
  height: 44px;
  padding: 0 0.7rem;
  border-radius: 0.85rem;
  border: 1px solid
    ${({ $active }) =>
      $active
        ? 'rgba(201, 162, 39, 0.55)'
        : `rgba(${brandRgb.chocolate}, 0.12)`};
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  min-width: 0;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const MultiMenu = styled.div`
  position: absolute;
  z-index: 60;
  top: calc(100% + 0.3rem);
  left: 0;
  right: 0;
  min-width: 11rem;
  max-width: min(100vw - 2rem, 18rem);
  max-height: min(14rem, 50vh);
  overflow: auto;
  padding: 0.35rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.1);
  background: ${brandColors.white};
  box-shadow: 0 16px 40px rgba(${brandRgb.black}, 0.12);

  ${media.md} {
    right: auto;
    width: max(100%, 13rem);
  }
`;

export const MultiOption = styled.button<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: 40px;
  padding: 0.45rem 0.65rem;
  border: none;
  border-radius: 0.55rem;
  background: ${({ $selected }) =>
    $selected ? brandColors.cream : 'transparent'};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  cursor: pointer;
  text-align: left;

  &:hover,
  &:focus-visible {
    background: ${brandColors.cream};
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  min-width: 0;
  font-family: ${fontFamily.body};
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.taupe};
`;

export const Select = styled.select`
  min-height: 44px;
  height: 44px;
  width: 100%;
  padding: 0 0.7rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;

  &:focus-visible {
    border-color: rgba(201, 162, 39, 0.55);
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.16);
  }
`;

export const FieldInput = styled.input`
  min-height: 44px;
  height: 44px;
  width: 100%;
  padding: 0 0.7rem;
  border-radius: 0.85rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  outline: none;

  &:focus-visible {
    border-color: rgba(201, 162, 39, 0.55);
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.16);
  }
`;

export const RangeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
`;

export const RangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.35rem;
  font-family: ${fontFamily.body};
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.taupe};

  strong {
    font-size: 0.75rem;
    letter-spacing: 0;
    text-transform: none;
    color: ${brandColors.chocolate};
    font-weight: 700;
  }
`;

export const DualRange = styled.div`
  position: relative;
  height: 28px;
  display: flex;
  align-items: center;

  input[type='range'] {
    position: absolute;
    inset: 0;
    width: 100%;
    appearance: none;
    background: transparent;
    pointer-events: none;
    margin: 0;

    &::-webkit-slider-runnable-track {
      height: 3px;
      border-radius: 9999px;
      background: ${brandColors.tan};
    }

    &::-webkit-slider-thumb {
      appearance: none;
      pointer-events: auto;
      width: 16px;
      height: 16px;
      margin-top: -6.5px;
      border-radius: 50%;
      border: 2px solid ${brandColors.white};
      background: ${brandColors.chocolate};
      box-shadow: 0 3px 10px rgba(${brandRgb.black}, 0.16);
      cursor: pointer;
    }
  }
`;

export const SingleRange = styled.input`
  width: 100%;
  appearance: none;
  height: 3px;
  border-radius: 9999px;
  background: ${brandColors.tan};
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid ${brandColors.white};
    background: ${brandColors.chocolate};
    cursor: pointer;
  }
`;

export const ActivePills = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 0 0.25rem;
  max-width: 1440px;
  margin: 0 auto;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.md} {
    flex-wrap: wrap;
    overflow: visible;
  }
`;

export const Pill = styled.button`
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  min-height: 32px;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;

  ${hoverFine} {
    &:hover {
      transform: scale(1.04);
    }
  }

  svg {
    width: 12px;
    height: 12px;
    opacity: 0.7;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.5rem 0 0.25rem;
`;

export const MetaLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

export const ResultsCount = styled.p`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1rem;
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const SortHint = styled.span`
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 500;
  color: ${brandColors.taupe};
`;

export const ContextLine = styled.span`
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${brandColors.brown};
`;

export const ClearBtn = styled.button`
  margin-left: auto;
  min-height: 32px;
  padding: 0 0.65rem;
  border: none;
  border-radius: 9999px;
  background: transparent;
  color: ${brandColors.brown};
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

/* Chips */

export const ChipsSection = styled.div`
  padding: 0.5rem 0 0.1rem;
  margin: 0 -0.15rem;
`;

export const ChipRail = styled.div`
  display: flex;
  gap: 0.45rem;
  max-width: 1440px;
  margin: 0 auto;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  scroll-snap-type: x proximity;
  padding-bottom: 0.25rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Chip = styled.button<{ $active?: boolean }>`
  flex: 0 0 auto;
  scroll-snap-align: start;
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid
    ${({ $active }) =>
      $active ? brandColors.chocolate : `rgba(${brandRgb.chocolate}, 0.12)`};
  background: ${({ $active }) =>
    $active ? brandColors.chocolate : brandColors.white};
  color: ${({ $active }) => ($active ? brandColors.white : brandColors.brown)};
  box-shadow: ${({ $active }) =>
    $active ? '0 0 0 3px rgba(201, 162, 39, 0.18)' : 'none'};
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;

  ${hoverFine} {
    &:hover {
      transform: scale(1.05);
    }
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

/* Results */

export const ResultsSection = styled.section`
  padding: 1.5rem ${padX} clamp(2.5rem, 7vw, 4rem);

  ${media.md} {
    padding: 1rem ${padX} clamp(2.5rem, 7vw, 4rem);
  }
`;

export const TrustNote = styled.p`
  max-width: 1440px;
  margin: 0 auto 1rem;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.5;
  color: ${brandColors.taupe};

  ${media.belowMd} {
    display: none;
  }
`;

export const ResultsGrid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  ${media.sm} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.125rem;
  }

  ${media.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
  }
`;

export const VendorCard = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border-radius: 1rem;
  background: ${brandColors.white};
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  box-shadow: 0 8px 24px rgba(${brandRgb.black}, 0.04);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease;

  ${hoverFine} {
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 18px 40px rgba(${brandRgb.black}, 0.1);
    }
  }

  ${reduceMotion} {
    transition: none;
    ${hoverFine} {
      &:hover {
        transform: none;
      }
    }
  }
`;

export const CardMedia = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: ${brandColors.tan};

  ${media.md} {
    aspect-ratio: 16 / 9;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 45%,
      rgba(${brandRgb.chocolate}, 0.35) 100%
    );
    opacity: 0.55;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  ${hoverFine} {
    ${VendorCard}:hover &::after {
      opacity: 0.85;
    }
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);

  ${hoverFine} {
    ${VendorCard}:hover & {
      transform: scale(1.06);
    }
  }

  ${reduceMotion} {
    transition: none;
  }
`;

export const CardBadge = styled.span`
  position: absolute;
  top: 0.55rem;
  left: 0.55rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  min-height: 24px;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.9);
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
`;

export const CardFeatured = styled.span`
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  z-index: 1;
  min-height: 24px;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
  background: rgba(${brandRgb.chocolate}, 0.75);
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.625rem;
  font-weight: 700;
  backdrop-filter: blur(8px);
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 1rem 1rem;
  min-width: 0;

  ${media.md} {
    gap: 0.45rem;
    padding: 0.65rem 0.75rem 0.75rem;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  min-width: 0;

  ${media.belowMd} {
    /* logo hidden on mobile — name is enough */
  }
`;

export const Logo = styled.div`
  flex: 0 0 auto;
  display: none;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  border-radius: 0.65rem;
  background: ${brandColors.cream};
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  font-family: ${fontFamily.display};
  font-size: 0.75rem;
  font-weight: 700;

  ${media.md} {
    display: inline-flex;
  }
`;

export const NameBlock = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

export const VendorName = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.md} {
    font-size: 0.9875rem;
  }
`;

export const VendorMeta = styled.p`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.75rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${brandColors.taupe};

  ${media.md} {
    font-size: 0.6875rem;
    gap: 0.25rem 0.55rem;
  }
`;

export const Stats = styled.div`
  display: none;

  ${media.md} {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.35rem;
  }
`;

export const Stat = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-family: ${fontFamily.display};
    font-size: 0.8125rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-family: ${fontFamily.body};
    font-size: 0.5625rem;
    font-weight: 500;
    color: ${brandColors.taupe};
  }
`;

export const TagRow = styled.div`
  display: none;

  ${media.md} {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }
`;

export const Tag = styled.span`
  display: inline-flex;
  min-height: 22px;
  align-items: center;
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  background: ${brandColors.cream};
  color: ${brandColors.brown};
  font-family: ${fontFamily.body};
  font-size: 0.625rem;
  font-weight: 600;
`;

export const CtaRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 0.25rem;
  transition: transform 0.3s ease;

  ${media.md} {
    display: flex;
    gap: 0.4rem;
    margin-top: auto;
  }

  ${hoverFine} {
    ${VendorCard}:hover & {
      transform: translateY(-2px);
    }
  }
`;

export const PrimaryCta = styled.button`
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  min-height: 44px;
  padding: 0.5rem 0.5rem;
  border: none;
  border-radius: 0.75rem;
  background: ${brandColors.chocolate};
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
  text-align: center;

  ${media.md} {
    min-height: 40px;
    border-radius: 9999px;
    font-size: 0.75rem;
    padding: 0.45rem 0.65rem;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.25s ease;
  }

  ${hoverFine} {
    ${VendorCard}:hover & svg {
      transform: rotate(45deg);
    }
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const GhostCta = styled(Link)`
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.5rem 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.14);
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  line-height: 1.2;

  ${media.md} {
    min-height: 40px;
    border-radius: 9999px;
    font-size: 0.75rem;
    padding: 0.45rem 0.65rem;
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const GhostCtaButton = styled.button`
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.5rem 0.5rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.14);
  background: transparent;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  cursor: pointer;

  ${media.md} {
    min-height: 40px;
    border-radius: 9999px;
    font-size: 0.75rem;
    padding: 0.45rem 0.65rem;
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;

export const LoadMoreWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.25rem;
`;

export const LoadMoreBtn = styled.button`
  min-height: 44px;
  padding: 0.65rem 1.25rem;
  border-radius: 9999px;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.14);
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
`;

export const SkeletonCard = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.06);
  background: ${brandColors.white};
`;

export const SkeletonBlock = styled.div<{ $h?: string }>`
  height: ${({ $h }) => $h ?? '1rem'};
  background: linear-gradient(
    90deg,
    ${brandColors.tan} 20%,
    ${brandColors.cream} 50%,
    ${brandColors.tan} 80%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.35s linear infinite;

  ${reduceMotion} {
    animation: none;
  }
`;

export const EmptyState = styled.div`
  max-width: 26rem;
  margin: 2rem auto;
  text-align: center;
  padding: 0 0.5rem;
`;

export const EmptyArt = styled.div`
  width: min(100%, 10rem);
  height: 6.5rem;
  margin: 0 auto 1rem;
  border-radius: 1.25rem;
  background: radial-gradient(
      circle at 30% 40%,
      rgba(201, 162, 39, 0.3),
      transparent 55%
    ),
    ${brandColors.cream};
`;

export const EmptyTitle = styled.h2`
  margin: 0 0 0.4rem;
  font-family: ${fontFamily.display};
  font-size: 1.25rem;
  font-weight: 700;
`;

export const EmptyLead = styled.p`
  margin: 0 0 0.85rem;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  color: ${brandColors.taupe};
  line-height: 1.55;
`;

export const EmptyTips = styled.ul`
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.25rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${brandColors.brown};
`;

/* Floating + drawers */

export const FloatingFilter = styled.button`
  position: fixed;
  right: max(0.85rem, env(safe-area-inset-right, 0px));
  bottom: max(1rem, env(safe-area-inset-bottom, 0px));
  z-index: 45;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 48px;
  padding: 0 1rem;
  border: none;
  border-radius: 9999px;
  background: ${brandColors.chocolate};
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 700;
  box-shadow: 0 14px 32px rgba(${brandRgb.black}, 0.22);
  cursor: pointer;

  ${media.md} {
    display: none;
  }
`;

export const DrawerOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(${brandRgb.chocolate}, 0.45);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity 0.25s ease, visibility 0.25s ease;
  backdrop-filter: blur(4px);
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
`;

export const Drawer = styled.div<{ $open: boolean; $sheet?: boolean }>`
  position: fixed;
  z-index: 201;
  display: flex;
  flex-direction: column;
  background: ${brandColors.ivory};
  will-change: transform;

  /* Mobile: Airbnb-style bottom sheet (near full screen) */
  left: 0;
  right: 0;
  bottom: 0;
  top: max(0.75rem, env(safe-area-inset-top, 0px));
  max-height: calc(100dvh - 0.75rem);
  border-radius: 1.25rem 1.25rem 0 0;
  transform: translate3d(0, ${({ $open }) => ($open ? '0' : '100%')}, 0);
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  box-shadow: 0 -12px 40px rgba(${brandRgb.black}, 0.18);

  ${media.md} {
    inset: auto;
    left: 50%;
    top: 50%;
    bottom: auto;
    right: auto;
    width: min(92vw, 34rem);
    max-height: min(88dvh, 720px);
    border-radius: 1.25rem;
    transform: ${({ $open }) =>
      $open
        ? 'translate3d(-50%, -50%, 0) scale(1)'
        : 'translate3d(-50%, -46%, 0) scale(0.98)'};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
    box-shadow: 0 24px 64px rgba(${brandRgb.black}, 0.22);
    padding-bottom: 0;
  }
`;

export const DrawerHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.5rem 1rem 0.75rem;
  border-bottom: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  flex-shrink: 0;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 0;
  }

  .handle {
    display: block;
    width: 2.5rem;
    height: 0.25rem;
    margin: 0.25rem auto 0.75rem;
    border-radius: 9999px;
    background: rgba(${brandRgb.chocolate}, 0.18);
  }

  h2 {
    margin: 0;
    width: 100%;
    text-align: left;
    font-family: ${fontFamily.display};
    font-size: 1.25rem;
    font-weight: 700;
  }

  ${media.md} {
    align-items: center;
    padding: 1rem 1.1rem;

    > div {
      align-items: flex-start;
    }

    .handle {
      display: none;
    }
  }
`;

export const DrawerBody = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.25rem 1rem 1.5rem;
  -webkit-overflow-scrolling: touch;
`;

export const Accordion = styled.details`
  border-bottom: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  padding: 0.25rem 0;

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 52px;
    cursor: pointer;
    font-family: ${fontFamily.body};
    font-size: 1rem;
    font-weight: 700;
    color: ${brandColors.chocolate};
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }

    svg {
      transition: transform 0.2s ease;
      color: ${brandColors.taupe};
    }
  }

  &[open] summary svg {
    transform: rotate(180deg);
  }
`;

export const AccordionBody = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 0 0 1rem;
`;

export const ToggleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Toggle = styled.button<{ $on?: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid
    ${({ $on }) =>
      $on ? brandColors.chocolate : `rgba(${brandRgb.chocolate}, 0.12)`};
  background: ${({ $on }) => ($on ? brandColors.chocolate : brandColors.white)};
  color: ${({ $on }) => ($on ? brandColors.white : brandColors.brown)};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
`;

export const DrawerFoot = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1rem max(0.75rem, env(safe-area-inset-bottom, 0px));
  border-top: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  flex-shrink: 0;
`;

export const DrawerPrimary = styled.button`
  flex: 1;
  min-height: 52px;
  border: none;
  border-radius: 0.75rem;
  background: ${brandColors.chocolate};
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  font-weight: 700;
  cursor: pointer;
`;

export const DrawerGhost = styled.button`
  flex: 0 0 auto;
  min-height: 52px;
  min-width: 52px;
  padding: 0 1.1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.14);
  background: transparent;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
`;

export const CheckGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
`;

export const CheckChip = styled.button<{ $on?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.5rem 0.65rem;
  border-radius: 0.75rem;
  border: 1px solid
    ${({ $on }) =>
      $on ? brandColors.chocolate : `rgba(${brandRgb.chocolate}, 0.12)`};
  background: ${({ $on }) => ($on ? brandColors.chocolate : brandColors.white)};
  color: ${({ $on }) => ($on ? brandColors.white : brandColors.brown)};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
`;

export const Segmented = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SegmentedBtn = styled.button<{ $on?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.5rem 0.9rem;
  border-radius: 0.75rem;
  border: 1px solid
    ${({ $on }) =>
      $on ? brandColors.chocolate : `rgba(${brandRgb.chocolate}, 0.12)`};
  background: ${({ $on }) => ($on ? brandColors.chocolate : brandColors.white)};
  color: ${({ $on }) => ($on ? brandColors.white : brandColors.brown)};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
`;

export const FieldLabel = styled.span`
  display: block;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.taupe};
`;

export const SortSheet = styled.div<{ $open: boolean }>`
  position: fixed;
  z-index: 201;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  max-height: min(70dvh, 28rem);
  border-radius: 1.25rem 1.25rem 0 0;
  background: ${brandColors.ivory};
  box-shadow: 0 -12px 40px rgba(${brandRgb.black}, 0.18);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  transform: translate3d(0, ${({ $open }) => ($open ? '0' : '100%')}, 0);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
`;

export const SortSheetHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1rem 0.75rem;
  border-bottom: 1px solid rgba(${brandRgb.chocolate}, 0.08);

  h2 {
    margin: 0;
    font-family: ${fontFamily.display};
    font-size: 1.15rem;
    font-weight: 700;
  }
`;

export const SortSheetBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  overflow-y: auto;
`;

export const SortOptionBtn = styled.button<{ $on?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 52px;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid
    ${({ $on }) =>
      $on ? brandColors.chocolate : `rgba(${brandRgb.chocolate}, 0.1)`};
  background: ${({ $on }) => ($on ? brandColors.chocolate : brandColors.white)};
  color: ${({ $on }) => ($on ? brandColors.white : brandColors.chocolate)};
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  font-weight: ${({ $on }) => ($on ? 700 : 600)};
  cursor: pointer;
  text-align: left;
`;

export const MobileBudget = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 700;
  color: ${brandColors.chocolate};

  span {
    font-weight: 500;
    color: ${brandColors.taupe};
  }

  ${media.md} {
    display: none;
  }
`;

/* Modal shared (consultation) */

export const ModalOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 220;
  display: grid;
  place-items: end center;
  background: rgba(${brandRgb.chocolate}, 0.48);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transition: opacity 0.25s ease, visibility 0.25s ease;
  backdrop-filter: blur(6px);

  ${media.md} {
    place-items: center;
    padding: 1rem;
  }
`;

export const Modal = styled.div<{ $open: boolean }>`
  width: min(100%, 32rem);
  max-height: min(92dvh, 720px);
  overflow-y: auto;
  border-radius: 1.25rem 1.25rem 0 0;
  background: ${brandColors.ivory};
  transform: translateY(${({ $open }) => ($open ? '0' : '20px')});
  transition: transform 0.28s ease;
  padding: 1.15rem 1.15rem max(1.15rem, env(safe-area-inset-bottom, 0px));

  ${media.md} {
    border-radius: 1.25rem;
  }
`;

export const ModalTitle = styled.h2`
  margin: 0 0 0.4rem;
  font-family: ${fontFamily.display};
  font-size: 1.35rem;
  font-weight: 700;
`;

export const ModalLead = styled.p`
  margin: 0 0 1rem;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${brandColors.taupe};
`;

export const FormGrid = styled.div`
  display: grid;
  gap: 0.65rem;
`;

export const FormField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${brandColors.taupe};

  input,
  select,
  textarea {
    min-height: 44px;
    padding: 0.6rem 0.75rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
    background: ${brandColors.white};
    color: ${brandColors.chocolate};
    font-family: ${fontFamily.body};
    font-size: 0.9rem;
    font-weight: 500;
    outline: none;
  }

  textarea {
    min-height: 88px;
    resize: vertical;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.9rem;
`;

export const ModalNote = styled.p`
  margin: 0.75rem 0 0;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  color: ${brandColors.taupe};
`;
