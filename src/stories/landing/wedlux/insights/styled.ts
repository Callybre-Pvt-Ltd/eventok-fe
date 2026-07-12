import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.25rem, 3vw, 2rem);
  margin-top: clamp(2rem, 4vw, 3rem);

  ${media.belowLg} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.belowSm} {
    grid-template-columns: 1fr;
  }
`;

export const InsightMedia = styled.div`
  aspect-ratio: 3 / 2;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.125rem;
  background: ${brandColors.tan};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

export const InsightCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;

  &:hover ${InsightMedia} img {
    transform: scale(1.04);
  }
`;

export const InsightMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  color: rgba(${brandRgb.black}, 0.55);
`;

export const InsightAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const InsightDate = styled.span`
  margin-left: auto;
`;

export const InsightDivider = styled.hr`
  margin: 0.875rem 0;
  border: none;
  border-top: 1px solid rgba(${brandRgb.chocolate}, 0.15);
`;

export const InsightTitle = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.35;
  color: ${brandColors.black};
`;
