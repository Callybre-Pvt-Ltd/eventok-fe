import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const CtaBand = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 3.5rem;
  border-radius: 12px;
  background: ${brandColors.tan};
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);

  ${media.belowMd} {
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5rem 1.75rem;
  }

  ${media.belowSm} {
    padding: 2rem 1.25rem;
    gap: 1.5rem;
  }
`;

export const CtaText = styled.p`
  position: relative;
  z-index: 1;
  margin: 0;
  max-width: 560px;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.35;
  color: ${brandColors.black};
`;

export const CtaAction = styled.div`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`;

export const CtaStarburst = styled.span`
  position: absolute;
  top: -2.5rem;
  left: -2.5rem;
  color: rgba(${brandRgb.chocolate}, 0.1);
`;
