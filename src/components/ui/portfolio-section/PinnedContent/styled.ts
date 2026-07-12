import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const Panel = styled.aside`
  position: relative;
  display: none;
  flex-direction: column;
  gap: 0.65rem;
  flex-shrink: 0;
  color: ${brandColors.black};
  padding-bottom: 0.15rem;

  ${media.md} {
    display: flex;
    gap: 1.25rem;
    max-width: 26rem;
  }
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${brandColors.gold};

  ${media.md} {
    font-size: 0.75rem;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.35rem, 5.8vw, 1.85rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: ${brandColors.black};
  animation: ${fadeUp} 0.45s ease both;

  ${media.md} {
    font-size: clamp(2rem, 3.5vw, 3rem);
    animation-duration: 0.55s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Description = styled.p`
  margin: 0;
  max-width: 40rem;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.55;
  color: ${brandColors.taupe};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  animation: ${fadeUp} 0.5s ease 0.05s both;

  ${media.md} {
    max-width: 380px;
    font-size: 0.9375rem;
    line-height: 1.75;
    -webkit-line-clamp: unset;
    display: block;
    overflow: visible;
    animation-duration: 0.6s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MetaLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.75rem;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${brandColors.brown};
  animation: ${fadeUp} 0.5s ease 0.08s both;

  ${media.md} {
    font-size: 0.8125rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MetaChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.55rem;
  border-radius: 9999px;
  background: rgba(${brandRgb.chocolate}, 0.06);
`;

export const StatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  animation: ${fadeUp} 0.5s ease 0.1s both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const StatNumber = styled.span`
  font-family: ${fontFamily.display};
  font-size: 1.15rem;
  font-weight: 700;
  color: ${brandColors.chocolate};
  line-height: 1.1;

  ${media.md} {
    font-size: 1.35rem;
  }
`;

export const StatLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${brandColors.taupe};
`;

export const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  align-self: stretch;
  min-height: 44px;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.display};
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  touch-action: manipulation;
  animation: ${fadeUp} 0.55s ease 0.12s both;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  svg {
    transition: transform 0.25s ease;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 28px rgba(${brandRgb.black}, 0.14);

    svg {
      transform: translate(2px, -2px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.chocolate};
    outline-offset: 3px;
  }

  ${media.md} {
    align-self: flex-start;
    padding: 0.8125rem 1.75rem;
    font-size: 0.9375rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const DecorativeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.15rem;

  ${media.md} {
    gap: 0.85rem;
    margin-top: 0.35rem;
  }
`;

export const NumberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const ProjectNumber = styled.span`
  font-family: ${fontFamily.display};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${brandColors.gold};
  animation: ${fadeUp} 0.4s ease both;

  span {
    color: rgba(${brandRgb.black}, 0.35);
    font-size: 0.875rem;
    font-weight: 600;
  }

  ${media.md} {
    font-size: 1.5rem;

    span {
      font-size: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Ornament = styled.span`
  display: none;
  color: ${brandColors.gold};
  opacity: 0.5;

  ${media.md} {
    display: inline-flex;
    animation: spin 18s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
