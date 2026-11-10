import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontSizes, media, radii } from '@/theme';

export const Layout = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1fr 1fr;
    gap: 3.5rem;
  }
`;

export const Left = styled.div``;

export const ChooseLabel = styled.p`
  margin: 1rem 0 0.5rem;
  text-align: right;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text-muted);
`;

export const TileGrid = styled.div`
  display: grid;
  gap: 0.875rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.sm} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const Tile = styled(Link)`
  display: grid;
  gap: 0.5rem;
  justify-items: center;
  text-align: center;
  padding: 0.875rem 0.5rem;
  border-radius: ${radii.lg};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  box-shadow: 0 2px 8px var(--color-shadow);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 8px 24px var(--color-shadow-strong);
    transform: translateY(-2px);
  }

  [data-theme='light'] & {
    background: #ffffff;
    border-color: rgba(226, 232, 240, 0.85);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.04);
  }

  [data-theme='dark'] & {
    background: #141a32;
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  }
`;

export const Thumb = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${radii.full};
  object-fit: cover;
`;

export const TileLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: var(--color-text);
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const Collage = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`;

export const CollageImage = styled.img<{ $tall?: boolean }>`
  width: 100%;
  height: ${({ $tall }) => ($tall ? '14rem' : '10rem')};
  object-fit: cover;
  border-radius: ${radii.lg};
  box-shadow: 0 4px 16px var(--color-shadow);
`;
