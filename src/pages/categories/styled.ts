import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandGradients, luxuryColors } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

export const PageWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${luxuryColors.ivory};
  overflow-x: hidden;
`;

export const Main = styled.main`
  flex: 1;
`;

export const HeroSection = styled.section`
  position: relative;
  min-height: clamp(420px, 58vh, 560px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

export const HeroBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
`;

export const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: ${brandGradients.heroScrim};
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 7rem clamp(1.25rem, 4vw, 2.5rem) clamp(5rem, 10vw, 7rem);
`;

export const HeroEyebrow = styled.span`
  display: block;
  margin-bottom: 0.875rem;
  font-family: ${fontFamily.display};
  font-size: 1.125rem;
  font-style: italic;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.82);
`;

export const HeroTitle = styled.h1`
  margin: 0 0 1.25rem;
  max-width: 720px;
  font-family: ${fontFamily.display};
  font-size: clamp(2.75rem, 6vw, 4.25rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 0.01em;
  color: ${luxuryColors.textOnDark};
  white-space: pre-line;
`;

export const HeroLead = styled.p`
  margin: 0;
  max-width: 560px;
  font-family: ${fontFamily.body};
  font-size: clamp(1rem, 1.8vw, 1.125rem);
  font-weight: 600;
  line-height: 1.75;
  color: ${luxuryColors.textMutedOnDark};
`;

export const HeroWaveSlot = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;

export const CatalogSection = styled.section`
  padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem)
    clamp(3.5rem, 7vw, 6rem);
  background: ${luxuryColors.ivory};
`;

export const SectionIntro = styled.div`
  max-width: 1280px;
  margin: 0 auto clamp(2.5rem, 5vw, 3.5rem);
  text-align: center;
`;

export const SectionEyebrow = styled.span`
  display: block;
  margin-bottom: 0.75rem;
  font-family: ${fontFamily.display};
  font-size: 1.125rem;
  font-style: italic;
  font-weight: 600;
  color: ${luxuryColors.brown};
  opacity: 0.85;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.15;
  color: ${luxuryColors.chocolate};
`;

export const SectionLead = styled.p`
  margin: 0 auto;
  max-width: 620px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.75;
  color: ${luxuryColors.brown};
  opacity: 0.78;
`;

export const CategoryGrid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
  }
`;

export const CategoryCard = styled(Link)<{ $featured?: boolean }>`
  position: relative;
  display: block;
  min-height: ${({ $featured }) => ($featured ? '420px' : '360px')};
  border-radius: 1.5rem;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 12px 40px rgba(61, 43, 31, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  ${media.lg} {
    grid-column: ${({ $featured }) => ($featured ? 'span 2' : 'span 1')};
    min-height: ${({ $featured }) => ($featured ? '380px' : '360px')};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${brandGradients.card};
    pointer-events: none;
    z-index: 1;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 48px rgba(61, 43, 31, 0.16);
  }
`;

export const CardPhotoWrap = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

export const CardPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${CategoryCard}:hover & {
    transform: scale(1.04);
  }
`;

export const CardBody = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
`;

export const CardTop = styled.div`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: ${luxuryColors.chocolate};
`;

export const CardTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 500;
  line-height: 1.1;
  color: ${luxuryColors.textOnDark};
`;

export const CardDesc = styled.p`
  margin: 0 0 1rem;
  max-width: 420px;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.82);
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const CardCount = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
`;

export const CardLink = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${luxuryColors.textOnDark};
  opacity: 0.9;
`;

export const HighlightsSection = styled.section`
  padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem);
  background: ${luxuryColors.cream};
`;

export const HighlightsGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
`;

export const HighlightItem = styled.div`
  text-align: center;
  padding: 0 0.5rem;
`;

export const HighlightIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  margin-bottom: 1.25rem;
  border-radius: 50%;
  background: ${luxuryColors.ivory};
  color: ${luxuryColors.brown};
`;

export const HighlightTitle = styled.h3`
  margin: 0 0 0.625rem;
  font-family: ${fontFamily.display};
  font-size: 1.5rem;
  font-weight: 500;
  color: ${luxuryColors.chocolate};
`;

export const HighlightDesc = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.7;
  color: ${luxuryColors.brown};
  opacity: 0.78;
`;

export const CtaSection = styled.section`
  margin: 0 clamp(1.25rem, 4vw, 2.5rem) clamp(3rem, 6vw, 5rem);
  padding: clamp(2.5rem, 5vw, 4rem);
  border-radius: 2rem;
  background: ${luxuryColors.taupe};
  text-align: center;
`;

export const CtaTitle = styled.h2`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  color: ${luxuryColors.textOnDark};
`;

export const CtaLead = styled.p`
  margin: 0 auto 1.75rem;
  max-width: 520px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.7;
  color: ${luxuryColors.textMutedOnDark};
`;

export const CtaActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.875rem;
`;

export const CtaPrimary = styled(Link)`
  display: inline-flex;
  padding: 0.875rem 1.75rem;
  border-radius: 999px;
  background: ${luxuryColors.textOnDark};
  color: ${luxuryColors.chocolate};
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const CtaSecondary = styled(Link)`
  display: inline-flex;
  padding: 0.875rem 1.75rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  color: ${luxuryColors.textOnDark};
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const StateWrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;
