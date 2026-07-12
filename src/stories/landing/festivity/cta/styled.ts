import styled from 'styled-components';
import { luxuryColors } from '@/theme/brand';
import { fontFamily } from '@/theme';

export const CtaShell = styled.div`
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
`;

export const CtaTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${luxuryColors.chocolate};
  white-space: pre-line;
`;

export const CtaLead = styled.p`
  margin: 0 0 2rem;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.85;
  color: ${luxuryColors.brown};
  opacity: 0.78;
`;
