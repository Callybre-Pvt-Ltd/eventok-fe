import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, radii } from '@/theme';

export const Card = styled.article<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width ?? '100%'};
  height: 100%;
  overflow: hidden;
  border-radius: ${radii.xl};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 4px 14px var(--color-shadow);
  transition: box-shadow 0.25s ease, transform 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    box-shadow: 0 10px 28px var(--color-shadow-strong);
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  [data-theme='light'] & {
    background: #ffffff;
    border-color: rgba(226, 232, 240, 0.85);
    box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.07),
      0 2px 8px rgba(0, 0, 0, 0.02);
  }

  [data-theme='dark'] & {
    background: #141a32;
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  }
`;

export const Media = styled(Link)`
  position: relative;
  display: block;
  margin: 0.625rem;
  border-radius: ${radii.lg};
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: var(--color-bg-alt);
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`;

export const EmptyMedia = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: var(--color-bg-alt);
  color: var(--color-text-secondary);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 650;
`;

export const Ribbon = styled.span`
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  padding: 0.25rem 0.625rem;
  border-radius: ${radii.full};
  background: rgba(11, 17, 32, 0.75);
  backdrop-filter: blur(8px);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.6875rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const NewChip = styled.span`
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  padding: 0.25rem 0.625rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.6875rem;
  font-weight: 700;
`;

export const WishButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.125rem;
  height: 2.125rem;
  border: none;
  border-radius: ${radii.full};
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  color: ${({ $active }) => ($active ? '#e11d48' : '#0f172a')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease, background 0.2s ease;

  &:hover {
    color: #e11d48;
    transform: scale(1.08);
  }

  [data-theme='dark'] & {
    background: rgba(19, 31, 55, 0.85);
    color: ${({ $active }) => ($active ? '#ef4444' : '#94a3b8')};
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 1rem 1rem;
  flex: 1 1 auto;
`;

export const TitleLink = styled(Link)`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 700;
  line-height: 1.35;
  color: var(--color-text);
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: var(--color-primary);
  }
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: auto;
`;

export const Price = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: var(--color-primary);
`;

export const RatingText = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: var(--color-text-secondary);
`;

export const Strike = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text-muted);
  text-decoration: line-through;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const SaveText = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: var(--color-text-secondary);
`;

export const OffChip = styled.span`
  padding: 0.1875rem 0.5rem;
  border-radius: ${radii.full};
  background: rgba(34, 197, 94, 0.15);
  color: #16a34a;
  font-size: ${fontSizes.xs};
  font-weight: 800;

  [data-theme='dark'] & {
    color: #4ade80;
    background: rgba(74, 222, 128, 0.2);
  }
`;

export const BookButton = styled.button`
  display: none;
`;
