import styled from 'styled-components';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const ServiceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

export const ServiceTextCol = styled.div`
  max-width: 520px;
`;

export const ServicesLead = styled.p`
  margin: 0 0 2rem;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.85;
  color: ${luxuryColors.brown};
  opacity: 0.78;
`;

export const ServiceList = styled.ul`
  margin: 0 0 2rem;
  padding: 0;
  list-style: none;
`;

export const ServiceItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid rgba(61, 43, 31, 0.12);
  font-family: ${fontFamily.display};
  font-size: clamp(1rem, 1.8vw, 1.125rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${luxuryColors.chocolate};

  &:first-child {
    border-top: 1px solid rgba(61, 43, 31, 0.12);
  }
`;

export const ServiceImageCol = styled.div`
  width: 100%;
`;

export const ServiceImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  object-position: center;
  border-radius: 2px;
`;
