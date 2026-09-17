import styled from 'styled-components';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Banner = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  gap: 1.5rem;
  align-items: center;
  padding: 2rem 1.5rem;
  border-radius: ${radii.xxl};
  background: ${brandGradients.venueBanner};

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    padding: 2.75rem;
  }
`;

export const BannerCopy = styled.div``;

export const BannerEyebrow = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${brandColors.pink400};
`;

export const BannerTitle = styled.h2`
  margin-top: 0.625rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  line-height: 1.15;
  color: ${brandColors.white};
`;

export const BannerCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding: 0.625rem 1.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: ${brandColors.pink100};
  }
`;

export const BannerCollage = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 8rem;
  object-fit: cover;
  border-radius: ${radii.lg};
`;

export const VenueGrid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const VenueCard = styled.article`
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  overflow: hidden;
  box-shadow: ${shadows.sm};

  &:hover {
    box-shadow: ${shadows.md};
  }
`;

export const VenueImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

export const VenueBody = styled.div`
  display: grid;
  gap: 0.375rem;
  padding: 0.875rem;
`;

export const VenueName = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const VenueMeta = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray600};
`;

export const VenueTag = styled.span`
  justify-self: start;
  padding: 0.1875rem 0.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.success50};
  color: ${brandColors.success500};
  font-size: ${fontSizes.xs};
  font-weight: 700;
`;

export const VenueFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.25rem;
`;

export const VenuePrice = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const VenueUnit = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray400};
`;

export const VenueButton = styled.a`
  padding: 0.4375rem 1.125rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: ${brandColors.pink600};
  }
`;

export const BannerGlow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
    50% 60% at 15% 20%,
    rgba(${brandRgb.pink}, 0.35) 0%,
    rgba(${brandRgb.pink}, 0) 70%
  );
  pointer-events: none;
`;

export const ListHead = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
`;
