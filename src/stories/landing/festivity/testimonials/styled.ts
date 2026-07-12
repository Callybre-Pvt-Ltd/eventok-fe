import styled from 'styled-components';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TestimonialCard = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  border-radius: 1.25rem;
  background: ${luxuryColors.cream};
  box-shadow: 0 12px 36px rgba(61, 43, 31, 0.08);
`;

export const TestimonialAvatar = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  margin-bottom: 1.25rem;
  border-radius: 50%;
  object-fit: cover;
`;

export const TestimonialName = styled.h3`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: 1.375rem;
  font-style: italic;
  font-weight: 600;
  color: ${luxuryColors.chocolate};
`;

export const TestimonialQuote = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.8;
  color: ${luxuryColors.brown};
  opacity: 0.82;
`;
