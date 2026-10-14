import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Page = styled.div`
  max-width: 1360px;
  margin: 0 auto;
  padding: 1.25rem 1rem 2.5rem;

  ${media.lg} {
    padding: 1.75rem 2.5rem 3rem;
  }
`;

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.gray600};
  text-decoration: none;

  &:hover {
    color: ${brandColors.pink500};
  }
`;

export const Layout = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
  align-items: start;

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr) 21rem;
    gap: 2rem;
  }
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const VendorName = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${brandColors.accent500};
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 1.15;
  color: ${brandColors.chocolate};
`;

export const Description = styled.p`
  margin: 0;
  max-width: 44rem;
  font-size: ${fontSizes.md};
  line-height: 1.6;
  color: ${brandColors.gray600};
`;

export const SectionTitle = styled.h2`
  margin: 1.5rem 0 0.75rem;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xl};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const ServiceList = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.75rem;
`;

export const ServiceCard = styled.li`
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr);
  gap: 0.9rem;
  padding: 0.75rem;
  border: 1px solid ${brandColors.tan};
  border-radius: ${radii.md};
  background: ${brandColors.white};

  &:hover {
    border-color: ${brandColors.pink500};
  }
`;

export const ServiceThumb = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${radii.sm};
  background: ${brandColors.gray100};
`;

export const ThumbFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${radii.sm};
  background: linear-gradient(
    135deg,
    ${brandColors.pink100},
    ${brandColors.accent100}
  );
  color: ${brandColors.pink600};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
`;

export const ServiceBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

export const ServiceName = styled(Link)`
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: ${brandColors.chocolate};
  text-decoration: none;

  &:hover {
    color: ${brandColors.pink500};
  }
`;

export const ServiceMeta = styled.span`
  font-size: ${fontSizes.xs};
  color: ${brandColors.gray600};
  overflow-wrap: anywhere;
`;

export const ServicePrice = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const Inclusions = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.25rem;
`;

export const InclusionTag = styled.li`
  padding: 0.1rem 0.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink50};
  color: ${brandColors.pink600};
  font-size: ${fontSizes.xs};
  font-weight: 600;
`;

export const Aside = styled.aside`
  position: sticky;
  top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.25rem;
  border: 1px solid ${brandColors.tan};
  border-radius: ${radii.lg};
  background: ${brandColors.white};
  box-shadow: ${shadows.sm};
`;

export const PriceLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.gray400};
`;

export const PriceValue = styled.span`
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  font-size: ${fontSizes.sm};
  color: ${brandColors.gray600};
`;

export const Strike = styled.span`
  text-decoration: line-through;
`;

export const SavingsTag = styled.span`
  align-self: flex-start;
  padding: 0.2rem 0.6rem;
  border-radius: ${radii.full};
  background: ${brandColors.success50};
  color: ${brandColors.success500};
  font-size: ${fontSizes.xs};
  font-weight: 700;
`;

export const BookButton = styled.button`
  margin-top: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.md};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${brandColors.pink600};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Note = styled.p`
  margin: 0;
  font-size: ${fontSizes.xs};
  line-height: 1.5;
  color: ${brandColors.gray600};
`;

export const StateWrap = styled.div`
  padding: 3rem 1rem;
  text-align: center;
  color: ${brandColors.gray600};
`;
