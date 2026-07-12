import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const TaupeSection = styled.section`
  background: ${luxuryColors.taupe};
  color: ${luxuryColors.textOnDark};
`;

export const IvorySection = styled.section`
  background: ${luxuryColors.ivory};
  color: ${luxuryColors.chocolate};
`;

export const SectionShell = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 4vw, 2.5rem);
`;

export const CenteredIntro = styled.div`
  max-width: 720px;
  margin: 0 auto clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
`;

export const ScriptEyebrow = styled.span`
  display: block;
  margin-bottom: 0.75rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-style: italic;
  font-weight: 500;
  opacity: 0.9;
`;

export const DisplayTitle = styled.h2<{ $light?: boolean }>`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ $light }) =>
    $light ? luxuryColors.textOnDark : luxuryColors.chocolate};
  white-space: pre-line;
`;

export const SectionLead = styled.p<{ $light?: boolean }>`
  margin: 0 auto;
  max-width: 640px;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.85;
  letter-spacing: 0.02em;
  color: ${({ $light }) =>
    $light ? luxuryColors.textMutedOnDark : luxuryColors.brown};
  opacity: ${({ $light }) => ($light ? 1 : 0.78)};
`;

export const TaupeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
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

export const IvoryButton = styled(TaupeButton)`
  background: ${luxuryColors.chocolate};

  &:hover {
    background: ${luxuryColors.brown};
  }
`;

export const SliderArrow = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: ${luxuryColors.textOnDark};
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    border-color: rgba(255, 255, 255, 0.55);
  }

  ${media.belowMd} {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

export const DarkSliderArrow = styled(SliderArrow)`
  border-color: rgba(61, 43, 31, 0.2);
  background: ${luxuryColors.ivory};
  color: ${luxuryColors.chocolate};

  &:hover {
    background: ${luxuryColors.cream};
    border-color: rgba(61, 43, 31, 0.35);
  }
`;
