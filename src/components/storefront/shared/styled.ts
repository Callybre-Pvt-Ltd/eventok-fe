import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Section = styled.section<{ $tint?: boolean; $dark?: boolean }>`
  width: 100%;
  padding: 2.5rem 1rem;
  background: ${({ $tint, $dark }) =>
    $dark
      ? brandColors.ink900
      : $tint
      ? brandColors.pink50
      : brandColors.white};

  ${media.md} {
    padding: 3rem 1.5rem;
  }

  ${media.lg} {
    padding: 4rem 2.5rem;
  }
`;

export const SectionInner = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Eyebrow = styled.span<{ $onDark?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $onDark }) =>
    $onDark ? brandColors.pink400 : brandColors.pink500};

  &::before {
    content: '';
    width: 1.75rem;
    height: 2px;
    border-radius: ${radii.full};
    background: currentColor;
  }
`;

export const SectionTitle = styled.h2<{ $onDark?: boolean }>`
  font-family: ${fontFamily.display};
  font-size: clamp(1.625rem, 3.4vw, 2.25rem);
  font-weight: 800;
  line-height: 1.15;
  margin-top: 0.5rem;
  color: ${({ $onDark }) =>
    $onDark ? brandColors.white : brandColors.chocolate};
`;

export const SectionSubtitle = styled.p<{ $onDark?: boolean }>`
  margin-top: 0.5rem;
  max-width: 44rem;
  font-size: ${fontSizes.md};
  font-weight: 500;
  color: ${({ $onDark }) =>
    $onDark ? brandColors.gray400 : brandColors.gray600};
`;

export const PillLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-decoration: none;
  box-shadow: ${shadows.sm};
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${brandColors.pink600};
    transform: translateY(-1px);
  }
`;

export const OutlinePill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  border: 1px solid ${brandColors.tan};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${brandColors.pink500};
    color: ${brandColors.pink500};
  }
`;

export const RailControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const RoundButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.full};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover:not(:disabled) {
    background: ${brandColors.pink500};
    border-color: ${brandColors.pink500};
    color: ${brandColors.white};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Rail = styled.div`
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.5rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    scroll-snap-align: start;
    flex: 0 0 auto;
  }
`;

export const TabRow = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  border-bottom: 1px solid ${brandColors.tan};
  margin-bottom: 1.5rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabItem = styled.button<{ $active: boolean }>`
  position: relative;
  padding: 0.75rem 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${({ $active }) =>
    $active ? brandColors.pink500 : brandColors.gray600};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    border-radius: ${radii.full};
    background: ${({ $active }) =>
      $active ? brandColors.pink500 : 'transparent'};
  }
`;
