import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);

  ${media.belowLg} {
    grid-template-columns: 1fr;
  }
`;

export const StoryBody = styled.p`
  margin: 0;
  max-width: 480px;
  font-family: ${fontFamily.body};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.9;
  color: ${brandColors.taupe};
`;

export const StoryMedia = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 21 / 9;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  background: ${brandColors.tan};

  ${media.belowMd} {
    aspect-ratio: 4 / 3;
  }
`;

export const StoryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.25);
`;

export const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border: none;
  border-radius: 50%;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(${brandRgb.black}, 0.35);
  transition: transform 0.25s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.08);
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  text-align: center;

  ${media.belowMd} {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
`;

export const StatValue = styled.span`
  display: block;
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  color: ${brandColors.black};
`;

export const StatLabel = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  color: ${brandColors.taupe};
`;
