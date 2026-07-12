import styled, { keyframes } from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const fadeUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
`;

export const MobileHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex-shrink: 0;
  padding-bottom: 0.35rem;

  ${media.md} {
    display: none;
  }
`;

export const MobileTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const MobileNumber = styled.span`
  font-family: ${fontFamily.display};
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: ${brandColors.gold};
  white-space: nowrap;

  span {
    color: rgba(${brandRgb.black}, 0.35);
    font-weight: 600;
  }
`;

export const MobileCategory = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 1.5rem;
  padding: 0.2rem 0.55rem;
  border-radius: 9999px;
  background: rgba(${brandRgb.chocolate}, 0.06);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${brandColors.brown};
  animation: ${fadeUp} 0.35s ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MobileTitle = styled.h2`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.15rem, 5.2vw, 1.45rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: ${brandColors.black};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  animation: ${fadeUp} 0.4s ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MobileDots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.15rem;
`;

export const MobileDot = styled.button<{ $active?: boolean; $done?: boolean }>`
  appearance: none;
  width: ${({ $active }) => ($active ? '1.15rem' : '0.4rem')};
  height: 0.4rem;
  padding: 0;
  border: none;
  border-radius: 9999px;
  background: ${({ $active, $done }) =>
    $active || $done ? brandColors.gold : `rgba(${brandRgb.chocolate}, 0.18)`};
  cursor: pointer;
  transition: width 0.3s ease, background 0.3s ease;
  touch-action: manipulation;

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
  }
`;
