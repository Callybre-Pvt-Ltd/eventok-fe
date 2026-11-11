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
  gap: 1.15rem;
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
  display: grid;
  gap: 0.65rem;
  justify-items: center;
  text-align: center;
  padding: 1.35rem 1rem;
  border-radius: ${radii.md};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  box-shadow: 0 2px 8px var(--color-shadow);
  transition: border-color 0.25s ease, box-shadow 0.25s ease,
    transform 0.25s ease;

  [data-theme='light'] & {
    background: #ffffff;
    border-color: var(--color-border);
    box-shadow: 0 2px 10px rgba(60, 42, 25, 0.05);

    &:hover {
      border-color: var(--color-primary);
      box-shadow: 0 8px 24px rgba(60, 42, 25, 0.12);
      transform: translateY(-3px);
    }
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

    &:hover {
      border-color: var(--color-primary);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
      transform: translateY(-3px);
    }
  }
`;

export const IconCircle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: ${radii.full};
  background: rgba(249, 115, 22, 0.08);
  color: var(--color-primary);
  border: 1px solid rgba(249, 115, 22, 0.2);
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;

  ${Tile}:hover & {
    transform: scale(1.08);
    background: var(--color-primary);
    color: #ffffff;
  }

  [data-theme='dark'] & {
    background: rgba(249, 115, 22, 0.15);
    border-color: rgba(249, 115, 22, 0.3);
    color: #fdba74;
  }

  [data-theme='dark'] ${Tile}:hover & {
    background: var(--color-primary);
    color: #ffffff;
  }
`;

export const TileName = styled.span`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
`;

export const TileMeta = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text-muted);
`;
