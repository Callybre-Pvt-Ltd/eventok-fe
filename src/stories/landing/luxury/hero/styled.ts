import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandGradients, luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

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
  object-position: center 20%;
`;

export const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: ${brandGradients.heroScrim};
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 6.5rem clamp(1.25rem, 4vw, 2.5rem) clamp(2rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: 1fr;
  align-items: end;

  ${media.lg} {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    padding-top: 7rem;
  }
`;

export const HeroCopy = styled.div`
  max-width: 560px;
`;

export const HeroTitle = styled.h1`
  margin: 0 0 1.75rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: 0.01em;
  color: ${luxuryColors.textOnDark};
  white-space: pre-line;
`;

export const HeroCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1.75rem;
  border-radius: 999px;
  background: ${luxuryColors.textOnDark};
  color: ${luxuryColors.chocolate};
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(61, 43, 31, 0.2);
  }
`;

export const HeroTagline = styled.p`
  margin: 1.5rem 0 0;
  max-width: 380px;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: ${luxuryColors.textMutedOnDark};
`;

export const HeroTag = styled.span`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.85);
`;

export const HeroCards = styled.div`
  display: none;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  ${media.lg} {
    display: flex;
  }
`;

export const SocialProofCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  background: ${luxuryColors.glass};
  border: 1px solid ${luxuryColors.glassBorder};
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(61, 43, 31, 0.12);
`;

export const AvatarStack = styled.div`
  display: flex;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-left: -0.5rem;
    object-fit: cover;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const SocialProofText = styled.div`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${luxuryColors.chocolate};
  white-space: nowrap;
`;

export const FeatureCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: min(100%, 320px);
  padding: 0.875rem;
  border-radius: 1.25rem;
  background: ${luxuryColors.glass};
  border: 1px solid ${luxuryColors.glassBorder};
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 40px rgba(61, 43, 31, 0.14);
`;

export const FeatureThumb = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.875rem;
  object-fit: cover;
  flex-shrink: 0;
`;

export const FeatureBody = styled.div`
  min-width: 0;
`;

export const FeatureTitle = styled.p`
  margin: 0 0 0.375rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${luxuryColors.chocolate};
`;

export const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${luxuryColors.brown};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
