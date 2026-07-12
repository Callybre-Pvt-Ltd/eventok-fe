import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, spacing } from '@/theme';

export const Footer = styled.footer`
  position: relative;
  overflow: hidden;
  background: radial-gradient(
      ellipse 60% 40% at 10% 0%,
      rgba(255, 255, 255, 0.7),
      transparent 55%
    ),
    ${brandColors.cream};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  margin-top: auto;
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

export const FooterWatermark = styled.div`
  position: absolute;
  right: -4%;
  bottom: 8%;
  font-family: ${fontFamily.display};
  font-size: clamp(4rem, 18vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: rgba(${brandRgb.chocolate}, 0.04);
  pointer-events: none;
  user-select: none;
  line-height: 1;
`;

export const FooterInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem)
    clamp(2rem, 4vw, 3rem);
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.xl};
  margin-bottom: ${spacing.xxl};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }

  ${media.lg} {
    grid-template-columns: 1.4fr repeat(4, minmax(0, 1fr)) 1.3fr;
  }
`;

export const FooterBrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  align-items: flex-start;
`;

export const FooterLogo = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xxl};
  letter-spacing: 0.02em;
  color: ${brandColors.chocolate};
`;

export const FooterLogoMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
`;

export const SocialRow = styled.div`
  display: flex;
  gap: 0.625rem;
`;

export const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  border-radius: 0.65rem;
  background: ${brandColors.tan};
  color: ${brandColors.chocolate};
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${brandColors.gold};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.chocolate};
    outline-offset: 2px;
  }
`;

export const FooterCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  align-items: flex-start;
`;

export const FooterTitle = styled.h4`
  margin: 0 0 ${spacing.sm};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 400;
  color: ${brandColors.chocolate};
  letter-spacing: 0.02em;
`;

export const FooterLink = styled(Link)`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  color: ${brandColors.taupe};
  text-decoration: none;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${brandColors.chocolate};
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.gold};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const NewsletterSub = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  color: ${brandColors.taupe};
`;

export const NewsletterForm = styled.form`
  position: relative;
  width: 100%;
  max-width: 320px;
  margin-top: ${spacing.sm};
`;

export const NewsletterInput = styled.input`
  width: 100%;
  min-height: 48px;
  padding: 0.875rem 3.5rem 0.875rem 1.25rem;
  border: 1px solid ${brandColors.tan};
  border-radius: 9999px;
  background: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  color: ${brandColors.chocolate};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${brandColors.taupe};
  }

  &:focus-visible {
    border-color: ${brandColors.gold};
    box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.25);
  }
`;

export const NewsletterSubmit = styled.button`
  position: absolute;
  top: 50%;
  right: 0.375rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  border: none;
  border-radius: 50%;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${brandColors.sand};
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.chocolate};
    outline-offset: 2px;
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  border-top: 1px solid rgba(${brandRgb.chocolate}, 0.15);
  padding-top: ${spacing.xl};
  text-align: center;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.sm};
  color: ${brandColors.chocolate};

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

export const BackToTop = styled.button`
  position: absolute;
  right: max(1rem, env(safe-area-inset-right, 0px));
  bottom: max(1rem, env(safe-area-inset-bottom, 0px));
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.12);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  color: ${brandColors.chocolate};
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(${brandRgb.black}, 0.08);
  transition: transform 0.25s ease, background 0.25s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    background: ${brandColors.gold};
  }

  &:focus-visible {
    outline: 2px solid ${brandColors.chocolate};
    outline-offset: 2px;
  }
`;
