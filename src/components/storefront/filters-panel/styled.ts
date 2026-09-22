import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Panel = styled.aside`
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  padding: 1rem;
  align-self: start;

  ${media.lg} {
    position: sticky;
    top: 10rem;
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${brandColors.tan};
`;

export const HeadTitle = styled.h2`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.chocolate};
`;

export const ResetButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: ${radii.full};
  background: transparent;
  color: ${brandColors.gray600};
  cursor: pointer;

  &:hover {
    background: ${brandColors.pink100};
    color: ${brandColors.pink500};
  }
`;

export const Group = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid ${brandColors.tan};

  &:last-child {
    border-bottom: none;
  }
`;

export const GroupHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const GroupTitle = styled.h3`
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

export const GroupValue = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: ${brandColors.pink500};
`;

export const Slider = styled.input<{ $fill: number }>`
  width: 100%;
  appearance: none;
  height: 6px;
  border-radius: ${radii.full};
  background: ${({ $fill }) =>
    `linear-gradient(to right, ${brandColors.pink500} 0%, ${brandColors.accent500} ${$fill}%, ${brandColors.tan} ${$fill}%, ${brandColors.tan} 100%)`};
  outline: none;
  cursor: pointer;

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(${brandRgb.pink}, 0.25);
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: ${radii.full};
    background: ${brandColors.white};
    border: 4px solid ${brandColors.pink500};
    box-shadow: 0 2px 6px rgba(${brandRgb.ink}, 0.18);
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.12);
  }

  &::-moz-range-thumb {
    width: 1.125rem;
    height: 1.125rem;
    border-radius: ${radii.full};
    background: ${brandColors.white};
    border: 4px solid ${brandColors.pink500};
    box-shadow: 0 2px 6px rgba(${brandRgb.ink}, 0.18);
    cursor: pointer;
  }
`;

export const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;

export const TagList = styled.div`
  display: grid;
  gap: 0.125rem;
  max-height: 18rem;
  overflow-y: auto;
  padding-right: 0.35rem;
  scrollbar-width: thin;
  scrollbar-color: ${brandColors.tan} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: ${radii.full};
    background: ${brandColors.tan};
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${brandColors.gray400};
  }
`;

export const TagRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.5rem;
  border-radius: ${radii.md};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.chocolate};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${brandColors.pink50};
  }
`;

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${brandColors.pink500};
  cursor: pointer;
`;
