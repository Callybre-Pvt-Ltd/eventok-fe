import styled from 'styled-components';
import { media } from '@/theme';
import { SliderArrow } from '../shared/styled';

export const IntroSliderFrame = styled.div`
  width: 100%;
`;

export const IntroSliderRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;

  ${media.belowMd} {
    grid-template-columns: 1fr;
    position: relative;
    gap: 0;
  }
`;

export const IntroSliderTrack = styled.div`
  overflow: hidden;
  border-radius: 2px;

  ${media.belowMd} {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const IntroSlide = styled.div`
  width: 100%;
`;

export const IntroSlideImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  object-position: center;

  ${media.belowMd} {
    aspect-ratio: 4 / 3;
  }
`;

export const IntroArrowLeft = styled(SliderArrow)`
  ${media.belowMd} {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }
`;

export const IntroArrowRight = styled(SliderArrow)`
  ${media.belowMd} {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
  }
`;
