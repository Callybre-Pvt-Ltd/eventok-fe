import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, radii } from '@/theme';

export const BarSection = styled.section`
  position: relative;
  width: 100%;
  padding: 0.875rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
`;

export const BarContainer = styled.div`
  position: relative;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  min-width: 0;
  overflow: hidden;
`;

export const ScrollTrack = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.625rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x proximity;
  scroll-padding: 0 3rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  padding: 0.25rem 3rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowWrapper = styled.div<{
  $direction: 'left' | 'right';
  $visible: boolean;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${({ $direction }) => ($direction === 'left' ? 'left: 0;' : 'right: 0;')}
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  background: var(--color-surface);
  border-left: ${({ $direction }) =>
    $direction === 'right' ? '1px solid var(--color-border)' : 'none'};
  border-right: ${({ $direction }) =>
    $direction === 'left' ? '1px solid var(--color-border)' : 'none'};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
`;

export const NavArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${radii.full};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: #ffffff;
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CategoryChip = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.875rem;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  text-decoration: none;
  white-space: nowrap;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  transition: all 0.2s ease;
  flex-shrink: 0;
  scroll-snap-align: start;

  &:hover {
    background: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary);
    transform: translateY(-1px);
  }
`;

export const ViewAllChip = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.875rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  border: 1px solid var(--color-primary);
  color: #ffffff;
  text-decoration: none;
  white-space: nowrap;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  transition: all 0.2s ease;
  flex-shrink: 0;
  scroll-snap-align: start;

  &:hover {
    background: var(--color-primary-dark, #c2410c);
    border-color: var(--color-primary-dark, #c2410c);
    color: #ffffff;
    transform: translateY(-1px);
  }
`;

export const ChipIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
`;

export const ChipCount = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.4rem;
  border-radius: ${radii.full};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-muted);
`;

/** Export alias for backwards compatibility */
export const BarInner = BarContainer;
