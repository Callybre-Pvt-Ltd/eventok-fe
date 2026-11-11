import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeroSection = styled.section`
  width: 100%;
  padding: 2rem clamp(1rem, 3.5vw, 2.5rem) 3.5rem;
  background: var(--color-bg);
  position: relative;
  overflow: hidden;

  ${media.md} {
    padding: 3rem clamp(1.5rem, 4vw, 3rem) 4.5rem;
  }
`;

export const HeroInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 3.5rem;
  }

  ${media.xl} {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 4.5rem;
  }
`;

export const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 2;
`;

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: ${radii.full};
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  border: 1px solid rgba(234, 88, 12, 0.2);
`;

export const Headline = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(2.25rem, 4.5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--color-text);
  margin-bottom: 1.25rem;

  span {
    color: var(--color-primary);
  }
`;

export const Subheadline = styled.p`
  font-size: clamp(1rem, 1.4vw, 1.125rem);
  font-weight: 500;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 36rem;
  margin-bottom: 2rem;
`;

export const SearchWidget = styled.div`
  width: 100%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.xl};
  padding: 1rem;
  box-shadow: 0 8px 30px var(--color-shadow);
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;

  ${media.md} {
    grid-template-columns: 1.2fr 1fr 1fr auto;
    align-items: center;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
    border-radius: ${radii.full};
  }

  [data-theme='light'] & {
    box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  }
`;

export const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.35rem 0.75rem;

  ${media.md} {
    border-right: 1px solid var(--color-border);
  }
`;

export const FieldLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
`;

export const FieldSelect = styled.select`
  border: none;
  background: transparent;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  outline: none;
  cursor: pointer;
  padding: 0;

  option {
    background: var(--color-surface);
    color: var(--color-text);
  }
`;

export const FieldInput = styled.input`
  border: none;
  background: transparent;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
  outline: none;
  padding: 0;
  width: 100%;

  &::placeholder {
    color: var(--color-text-muted);
    font-weight: 500;
  }
`;

export const SearchAction = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px var(--button-primary-shadow);
  transition: transform 0.18s ease, background 0.18s ease;
  white-space: nowrap;

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }
`;

export const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.75rem;
`;

export const TrustItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text-secondary);

  svg {
    color: var(--color-primary);
  }
`;

export const VisualShowcase = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MainCard = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${radii.xl};
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 30px var(--color-shadow);
`;

export const CardMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${MainCard}:hover img {
    transform: scale(1.03);
  }
`;

export const CardTag = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.35rem 0.75rem;
  border-radius: ${radii.full};
  background: rgba(15, 23, 42, 0.85);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
`;

export const CardBody = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--color-surface);
`;

export const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CardTitle = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: var(--color-text);
`;

export const CardVendor = styled.span`
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
  font-weight: 500;
`;

export const CardPricing = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const PriceFrom = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-text-muted);
`;

export const PriceValue = styled.span`
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: var(--color-primary);
`;

export const FloatingPill = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-radius: ${radii.lg};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 16px var(--color-shadow);
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
  }
`;

export const PillInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const PillIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.md};
  background: var(--color-primary-light);
  color: var(--color-primary);
`;

export const PillText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PillTitle = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
`;

export const PillSubtitle = styled.span`
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
`;
