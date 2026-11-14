import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Grid = styled.div`
  display: grid;
  gap: 1.75rem;
  grid-template-columns: 1fr;

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: ${radii.xl};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  transition: transform 0.25s ease, border-color 0.25s ease;

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-3px);
  }

  ${media.lg} {
    flex-direction: row;
    align-items: stretch;
  }
`;

export const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-bg-alt);
  flex-shrink: 0;

  ${media.lg} {
    width: 42%;
    aspect-ratio: auto;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const ImageFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--color-bg-alt);
  color: var(--color-primary);
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xxl};
  font-weight: 800;
  letter-spacing: 0.02em;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  flex: 1;
`;

export const VendorLine = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.25rem;
`;

export const Name = styled.h3`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.35;
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: var(--color-text-secondary);
  line-height: 1.55;
  margin-bottom: 0.875rem;
`;

export const IncludesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
`;

export const IncludeTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: ${radii.sm};
  background: var(--color-bg-alt);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
`;

export const SavingsTag = styled.span`
  align-self: flex-start;
  padding: 0.25rem 0.625rem;
  border-radius: ${radii.full};
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  margin-bottom: 1rem;
`;

export const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
`;

export const PriceLabel = styled.span`
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const Price = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: var(--color-primary);
`;

export const GoButton = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  transition: background 0.18s ease;

  ${Card}:hover & {
    background: var(--color-primary-dark, #c2410c);
  }
`;

export const ViewAllRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
