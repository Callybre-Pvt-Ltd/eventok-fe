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
  border-radius: ${radii.md};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  box-shadow: 0 2px 8px var(--color-shadow);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  [data-theme='light'] & {
    background: #ffffff;
    border-color: var(--color-border);
    box-shadow: 0 2px 10px rgba(60, 42, 25, 0.05);

    &:hover {
      border-color: var(--color-primary);
      box-shadow: 0 6px 20px rgba(60, 42, 25, 0.12);
      transform: translateY(-2px);
    }
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

    &:hover {
      border-color: var(--color-primary);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
      transform: translateY(-2px);
    }
  }
`;

export const Thumb = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: ${radii.full};
  object-fit: cover;
  object-position: center 30%;
  border: 2px solid rgba(234, 88, 12, 0.25);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, border-color 0.2s ease;

  [data-theme='light'] & {
    box-shadow: 0 2px 8px rgba(60, 42, 25, 0.08);
  }

  [data-theme='dark'] & {
    border-color: rgba(249, 115, 22, 0.35);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  ${Tile}:hover & {
    transform: scale(1.06);
    border-color: var(--color-primary);
  }
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
  height: ${({ $tall }) => ($tall ? '15rem' : '11rem')};
  object-fit: cover;
  border-radius: ${radii.lg};
  box-shadow: 0 4px 16px var(--color-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  [data-theme='light'] & {
    border: 1px solid rgba(232, 226, 213, 0.7);
    box-shadow: 0 6px 20px rgba(60, 42, 25, 0.1);
  }

  [data-theme='dark'] & {
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px var(--color-shadow-strong);
  }
`;
