import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;

  ${media.belowLg} {
    grid-template-columns: 1fr;
  }
`;

export const TestimonialMedia = styled.div`
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  max-width: 320px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${media.belowLg} {
    max-width: min(100%, 360px);
    margin-inline: auto;
  }
`;

export const QuoteMark = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  font-family: ${fontFamily.display};
  font-size: 3rem;
  line-height: 1;
  color: ${brandColors.gold};
`;

export const QuoteText = styled.p`
  margin: 0 0 1.25rem;
  max-width: 560px;
  font-family: ${fontFamily.display};
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 700;
  line-height: 1.5;
  color: ${brandColors.black};
`;

export const StarRow = styled.div`
  display: flex;
  gap: 0.125rem;
  margin-bottom: 0.75rem;
  color: ${brandColors.gold};
`;

export const TestimonialName = styled.span`
  display: block;
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  color: ${brandColors.taupe};
`;
