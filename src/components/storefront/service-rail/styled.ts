import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const AsymmetricLayout = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  align-items: stretch;

  ${media.lg} {
    grid-template-columns: 24rem 1fr;
    gap: 2rem;
  }
`;

export const SpotlightCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.xl};
  overflow: hidden;
  box-shadow: 0 4px 16px var(--color-shadow);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  [data-theme='light'] & {
    background: #ffffff;
    box-shadow: 0 4px 20px rgba(60, 42, 25, 0.08);
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
  }

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
  }
`;

export const SpotlightMedia = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background: var(--color-bg-alt);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
    transition: transform 0.4s ease, filter 0.4s ease;

    [data-theme='light'] & {
      filter: brightness(0.99) contrast(1.03) saturate(1.04);
    }

    [data-theme='dark'] & {
      filter: brightness(0.94) contrast(1.06) saturate(1.02);
    }
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

export const SpotlightBadge = styled.span`
  position: absolute;
  top: 0.875rem;
  left: 0.875rem;
  padding: 0.35rem 0.75rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
`;

export const SpotlightBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  flex: 1;
`;

export const SpotlightCategory = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-primary);
  margin-bottom: 0.35rem;
`;

export const SpotlightTitle = styled(Link)`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  line-height: 1.3;
  color: var(--color-text);
  text-decoration: none;
  margin-bottom: 0.5rem;

  &:hover {
    color: var(--color-primary);
  }
`;

export const SpotlightDesc = styled.p`
  font-size: ${fontSizes.xs};
  color: var(--color-text-secondary);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const SpotlightFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.875rem;
  border-top: 1px solid var(--color-border);
`;

export const SpotlightPrice = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SpotlightFrom = styled.span`
  font-size: 0.6875rem;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-text-muted);
`;

export const SpotlightValue = styled.span`
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: var(--color-primary);
`;

export const SpotlightBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 1.15rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  text-decoration: none;
  transition: background 0.18s ease;

  &:hover {
    background: var(--color-primary-dark, #c2410c);
  }
`;

export const RailSlot = styled.div`
  position: relative;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

export const Rail = styled.div`
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.75rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    scroll-snap-align: start;
    flex: 0 0 auto;
  }
`;

export const CardSlot = styled.div`
  width: 17.5rem;

  ${media.md} {
    width: 18.5rem;
  }

  ${media.lg} {
    width: 19.5rem;
  }
`;
