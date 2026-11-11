import styled from 'styled-components';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Banner = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 1.5rem;
  align-items: center;
  padding: 2.25rem 1.75rem;
  border-radius: ${radii.xl};
  background: #0d5c75;
  border: 1px solid #0f766e;
  box-shadow: 0 4px 16px rgba(13, 92, 117, 0.15);
  margin-bottom: 2.5rem;

  [data-theme='dark'] & {
    background: #0a3f50;
    border-color: #115e59;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  }

  ${media.lg} {
    grid-template-columns: 1.2fr 1fr;
    padding: 3rem 3.5rem;
  }
`;

export const BannerCopy = styled.div``;

export const BannerEyebrow = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-gold);
`;

export const BannerTitle = styled.h2`
  margin-top: 0.625rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
`;

export const BannerCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding: 0.75rem 1.75rem;
  border-radius: ${radii.sm};
  background: #ffffff;
  color: #0d5c75;
  font-size: ${fontSizes.sm};
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #f0fdfa;
  }
`;

export const BannerCollage = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 8.5rem;
  object-fit: cover;
  border-radius: ${radii.lg};
`;

export const BannerGlow = styled.div`
  display: none;
`;

export const ListHead = styled.div`
  margin-bottom: 1.5rem;
`;

export const VenueGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const VenueCard = styled.article`
  border-radius: ${radii.lg};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  overflow: hidden;
  box-shadow: 0 2px 10px var(--color-shadow);
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.25s ease, transform 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    box-shadow: 0 16px 36px -8px var(--color-shadow-strong);
    border-color: var(--color-primary);
    transform: translateY(-3px);
  }

  [data-theme='light'] & {
    background: #ffffff;
    border-color: rgba(226, 232, 240, 0.85);
    box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.07),
      0 2px 6px rgba(0, 0, 0, 0.02);
  }

  [data-theme='dark'] & {
    background: #141a32;
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  }
`;

export const VenueImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
`;

export const VenueBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.15rem;
  flex: 1 1 auto;
`;

export const VenueName = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
`;

export const VenueMeta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const VenueTag = styled.span`
  display: inline-block;
  align-self: flex-start;
  padding: 0.2rem 0.6rem;
  border-radius: ${radii.full};
  background: var(--color-bg-tint);
  color: var(--color-primary);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const VenueFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border-light);
`;

export const VenuePrice = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: var(--color-primary);
`;

export const VenueUnit = styled.span`
  margin-left: 0.25rem;
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
`;

export const VenueButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: ${radii.full};
  background: var(--button-primary-gradient);
  color: #ffffff;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 4px 12px var(--button-primary-shadow);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;
