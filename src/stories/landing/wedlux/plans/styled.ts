import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: stretch;

  ${media.belowLg} {
    grid-template-columns: 1fr;
  }
`;

export const PlanCard = styled.div`
  position: relative;
  z-index: 1;
  align-self: center;
  margin: 0 0 2rem;
  padding: clamp(2rem, 4vw, 3.5rem);
  border-radius: 8px;
  background: ${brandColors.tan};
  box-shadow: 0 24px 64px rgba(${brandRgb.chocolate}, 0.14);
  overflow: hidden;

  ${media.lg} {
    margin: clamp(2rem, 4vw, 3rem) 0 clamp(2rem, 4vw, 3rem)
      clamp(-1.5rem, -2vw, -0.5rem);
    transform: translateX(-1.25rem);
  }
`;

export const CardStarburst = styled.span`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  color: rgba(${brandRgb.chocolate}, 0.14);

  ${media.belowLg} {
    display: none;
  }
`;

export const PlansSub = styled.p`
  margin: 0 0 1.75rem;
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  line-height: 1.7;
  color: ${brandColors.taupe};
`;

export const Divider = styled.hr`
  margin: 0;
  border: none;
  height: 1px;
  background: rgba(${brandRgb.black}, 0.15);
`;

export const PlanRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.375rem 0;
  border-bottom: 1px solid rgba(${brandRgb.black}, 0.12);

  ${media.belowSm} {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const PlanInfo = styled.div`
  min-width: 0;
`;

export const PlanName = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.25;
  color: ${brandColors.black};

  ${media.belowSm} {
    font-size: 1.375rem;
  }
`;

export const PlanBody = styled.p`
  margin: 0.375rem 0 0;
  max-width: 280px;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  line-height: 1.7;
  color: ${brandColors.taupe};
`;

export const PlanPrice = styled.span`
  font-family: ${fontFamily.display};
  font-size: 1.5rem;
  white-space: nowrap;
  color: ${brandColors.black};

  sup {
    margin-left: 0.125rem;
    font-size: 0.875rem;
  }

  ${media.belowSm} {
    font-size: 1.25rem;
  }
`;

export const PlanCtaRow = styled.div`
  margin-top: clamp(1.75rem, 3vw, 2.5rem);
`;

export const PhotoCol = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: ${brandColors.tan};
  min-height: clamp(280px, 40vw, 480px);

  ${media.belowLg} {
    aspect-ratio: 3 / 2;
    min-height: auto;
  }
`;

export const PhotoParallax = styled.div`
  position: absolute;
  inset: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.25);
  }
`;
