import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Grid = styled.div`
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

export const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: ${radii.lg};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 2px 10px var(--color-shadow);
  text-decoration: none;
  transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease;

  &:hover {
    box-shadow: 0 16px 36px -8px var(--color-shadow-strong);
    border-color: var(--color-primary);
    transform: translateY(-3px);
  }

  [data-theme='light'] & {
    background: #FFFFFF;
    border-color: rgba(226, 232, 240, 0.85);
    box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.07), 0 2px 6px rgba(0, 0, 0, 0.02);
  }

  [data-theme='dark'] & {
    background: #141A32;
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  }
`;

export const Image = styled.img`
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  background: var(--color-bg-alt);
`;

export const ImageFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 16 / 10;
  background: linear-gradient(
    135deg,
    var(--color-primary-light),
    var(--color-accent-soft)
  );
  color: var(--color-primary);
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xxl};
  font-weight: 800;
  letter-spacing: 0.02em;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.15rem;
  flex: 1 1 auto;
`;

export const VendorLine = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const Name = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
`;

export const Description = styled.p`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: var(--color-text-secondary);
  line-height: 1.5;
`;

export const SavingsTag = styled.span`
  align-self: flex-start;
  padding: 0.2rem 0.55rem;
  border-radius: ${radii.full};
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
  font-size: ${fontSizes.xs};
  font-weight: 700;

  [data-theme='dark'] & {
    color: #4ade80;
    background: rgba(74, 222, 128, 0.2);
  }
`;

export const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border-light);
`;

export const PriceLabel = styled.span`
  display: block;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text-muted);
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
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${radii.full};
  background: var(--color-primary-light);
  color: var(--color-primary);
  transition: transform 0.2s ease, background 0.2s ease;

  ${Card}:hover & {
    transform: translateX(3px);
    background: var(--color-primary);
    color: #ffffff;
  }
`;

export const ViewAllRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;
