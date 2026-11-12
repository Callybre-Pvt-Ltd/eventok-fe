import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeaderWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  ${media.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const Tile = styled(Link)`
  display: flex;
  flex-direction: column;
  border-radius: ${radii.lg};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--color-shadow);
  transition: border-color 0.25s ease, box-shadow 0.25s ease,
    transform 0.25s ease;

  [data-theme='light'] & {
    background: #ffffff;
    border-color: rgba(225, 218, 205, 0.85);
    box-shadow: 0 2px 10px rgba(60, 42, 25, 0.06);

    &:hover {
      border-color: var(--color-primary);
      box-shadow: 0 10px 26px rgba(60, 42, 25, 0.14);
      transform: translateY(-4px);
    }
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

    &:hover {
      border-color: var(--color-primary);
      box-shadow: 0 10px 26px rgba(0, 0, 0, 0.6);
      transform: translateY(-4px);
    }
  }
`;

export const TileMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background: var(--color-surface-hover);
`;

export const TileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
  transition: transform 0.35s ease;

  ${Tile}:hover & {
    transform: scale(1.06);
  }
`;

export const TileOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  transition: background 0.25s ease;

  [data-theme='light'] & {
    background: rgba(20, 15, 10, 0.03);
  }

  [data-theme='dark'] & {
    background: rgba(10, 14, 24, 0.15);
  }
`;

export const TileBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.95rem 0.85rem 1.1rem;
  text-align: center;
`;

export const TileName = styled.span`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
  transition: color 0.2s ease;

  ${Tile}:hover & {
    color: var(--color-primary);
  }
`;

export const TileMeta = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const IconCircle = styled.span`
  display: none;
`;
