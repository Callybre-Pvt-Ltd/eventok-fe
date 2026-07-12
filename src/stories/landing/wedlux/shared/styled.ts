import styled from 'styled-components';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const ForestSection = styled.section`
  position: relative;
  overflow: hidden;
  background: ${brandGradients.forestRadial};
  color: ${brandColors.black};
`;

export const CreamSection = styled.section`
  position: relative;
  overflow: hidden;
  background: ${brandColors.cream};
  color: ${brandColors.black};
`;

export const WhiteSection = styled.section`
  position: relative;
  overflow: hidden;
  background: ${brandColors.white};
  color: ${brandColors.black};
`;

export const SectionShell = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vw, 6rem) max(1rem, env(safe-area-inset-right, 0px))
    clamp(2.5rem, 7vw, 6rem) max(1rem, env(safe-area-inset-left, 0px));

  ${media.belowSm} {
    padding-block: clamp(2rem, 8vw, 3rem);
  }
`;

/** Thin vertical column rules — Wedlux background texture */
export const ColumnRules = styled.div<{ $light?: boolean }>`
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-evenly;

  &::before,
  &::after {
    content: '';
    width: 1px;
    background: ${({ $light }) =>
      $light
        ? `rgba(${brandRgb.white}, 0.08)`
        : `rgba(${brandRgb.chocolate}, 0.08)`};
  }

  ${media.belowMd} {
    display: none;
  }
`;

export const SerifTitle = styled.h2<{ $light?: boolean }>`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.2;
  color: ${({ $light }) => ($light ? brandColors.white : brandColors.black)};
  white-space: pre-line;

  ${media.belowSm} {
    font-size: clamp(1.75rem, 8vw, 2rem);
  }
`;

export const SectionLead = styled.p<{ $light?: boolean }>`
  margin: 0;
  max-width: 640px;
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.85;
  letter-spacing: 0.01em;
  color: ${({ $light }) =>
    $light ? 'rgba(255, 255, 255, 0.78)' : brandColors.taupe};
`;

export const StarburstSlot = styled.span<{ $gold?: boolean }>`
  position: absolute;
  color: ${({ $gold }) => ($gold ? brandColors.gold : brandColors.white)};
`;

export const LearnMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 44px;
  font-family: ${fontFamily.display};
  font-size: 0.9375rem;
  color: ${brandColors.black};
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${brandColors.brown};
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 3px;
    border-radius: 4px;
  }
`;
