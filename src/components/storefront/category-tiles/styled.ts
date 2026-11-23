import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const HeaderWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const EyebrowBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  margin-bottom: 0.85rem;
  border-radius: 9999px;
  background: rgba(234, 88, 12, 0.08);
  border: 1px solid rgba(234, 88, 12, 0.2);
  color: var(--color-primary);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  [data-theme='dark'] & {
    background: rgba(234, 88, 12, 0.15);
    border-color: rgba(234, 88, 12, 0.3);
  }
`;

export const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2.5rem;
`;

export const FilterScroll = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  max-width: 100%;
  padding: 0.25rem 0.5rem 0.5rem;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.md} {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.625rem;
  }
`;

export const FilterPill = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.15rem;
  border-radius: 9999px;
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-surface)'};
  color: ${({ $active }) =>
    $active ? '#ffffff' : 'var(--color-text-secondary)'};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: ${({ $active }) => ($active ? '700' : '600')};
  cursor: pointer;
  white-space: nowrap;
  box-shadow: ${({ $active }) =>
    $active
      ? '0 4px 14px -2px rgba(234, 88, 12, 0.38)'
      : '0 1px 3px rgba(0, 0, 0, 0.03)'};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  [data-theme='light'] & {
    background: ${({ $active }) =>
      $active ? 'var(--color-primary)' : '#ffffff'};
  }

  &:hover {
    color: ${({ $active }) => ($active ? '#ffffff' : 'var(--color-text)')};
    border-color: var(--color-primary);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const Grid = styled.div`
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }

  ${media.lg} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.75rem;
  }
`;

export const Tile = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${radii.xl};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.04),
    0 2px 8px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;

  [data-theme='light'] & {
    background: #ffffff;
    border-color: rgba(226, 220, 210, 0.85);

    &:hover {
      border-color: var(--color-primary);
      transform: translateY(-6px);
      box-shadow: 0 16px 32px -8px rgba(234, 88, 12, 0.16),
        0 4px 14px -2px rgba(0, 0, 0, 0.06);
    }
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);

    &:hover {
      border-color: var(--color-primary);
      transform: translateY(-6px);
      box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.45),
        0 0 0 1px rgba(234, 88, 12, 0.3);
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
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);

  ${Tile}:hover & {
    transform: scale(1.07);
  }
`;

export const TileOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0) 35%,
    rgba(0, 0, 0, 0.2) 100%
  );
  transition: opacity 0.3s ease;

  [data-theme='dark'] & {
    background: linear-gradient(
      180deg,
      rgba(10, 14, 24, 0.25) 0%,
      rgba(10, 14, 24, 0) 35%,
      rgba(10, 14, 24, 0.45) 100%
    );
  }
`;

export const TileBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-primary);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.8);
  pointer-events: none;

  [data-theme='dark'] & {
    background: rgba(22, 27, 40, 0.88);
    color: #fed7aa;
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

export const TileBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.15rem;
  min-height: 4rem;
`;

export const TileTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

export const TileName = styled.span`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.md};
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text);
  transition: color 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${Tile}:hover & {
    color: var(--color-primary);
  }
`;

export const TileSubtitle = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const TileAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  flex-shrink: 0;
  background: rgba(234, 88, 12, 0.08);
  color: var(--color-primary);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  [data-theme='dark'] & {
    background: rgba(234, 88, 12, 0.16);
    color: #fb923c;
  }

  ${Tile}:hover & {
    background: var(--color-primary);
    color: #ffffff;
    transform: translateX(3px);
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
