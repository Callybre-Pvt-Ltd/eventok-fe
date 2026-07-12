import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandGradients, luxuryColors } from '@/theme/brand';
import { fontFamily } from '@/theme';

export const HeroRoot = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  isolation: isolate;
`;

export const HeroBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
`;

export const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: ${brandGradients.heroScrim};
`;

export const HeroCopy = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: clamp(5rem, 14vw, 6.5rem) clamp(1.25rem, 4vw, 2.5rem)
    clamp(3rem, 8vw, 5rem);
`;

export const HeroTitle = styled.h1`
  margin: 0 0 1.25rem;
  max-width: 900px;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 7vw, 4.25rem);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${luxuryColors.textOnDark};
  white-space: pre-line;
`;

export const HeroLead = styled.p`
  margin: 0 0 2rem;
  max-width: 560px;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.85;
  letter-spacing: 0.02em;
  color: ${luxuryColors.textMutedOnDark};
`;

export const HeroCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2.25rem;
  border-radius: 4px;
  background: ${luxuryColors.taupe};
  color: ${luxuryColors.textOnDark};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${luxuryColors.brown};
    transform: translateY(-1px);
  }
`;
