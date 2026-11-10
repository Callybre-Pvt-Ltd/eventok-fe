import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontSizes, media, radii } from '@/theme';

export const BarWrap = styled.div`
  width: 100%;
  padding: 0.5rem clamp(1rem, 3.5vw, 2.5rem);
  box-sizing: border-box;
`;

export const BarInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  border-radius: ${radii.xl};
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 20px var(--color-shadow);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  [data-theme='light'] & {
    background: #ffffff;
    border-color: #e2e8f0;
  }

  [data-theme='dark'] & {
    background: #131f37;
    border-color: #1e293b;
  }
`;

export const GridButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border: none;
  border-radius: ${radii.lg};
  background: var(--color-bg-alt);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-primary);
    color: #ffffff;
  }

  [data-theme='dark'] & {
    background: #141a32;
    color: var(--color-primary);
  }
`;

export const ItemsScroller = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1.5rem;

  ${media.lg} {
    gap: 2rem;
  }
`;

export const CategoryItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  text-decoration: none;
  flex-shrink: 0;
  color: var(--color-text);
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    color: var(--color-primary);
  }
`;

export const IconBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
  color: var(--color-primary);
  transition: all 0.2s ease;

  ${CategoryItem}:hover & {
    background: var(--color-primary);
    color: #ffffff;
    box-shadow: 0 4px 12px var(--button-primary-shadow);
  }

  [data-theme='dark'] & {
    background: #141a32;
    color: var(--color-primary);
  }
`;

export const CategoryLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: 0.01em;

  [data-theme='dark'] & {
    color: #94a3b8;
  }
`;
