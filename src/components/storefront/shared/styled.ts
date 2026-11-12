import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Section = styled.section<{ $tint?: boolean; $dark?: boolean }>`
  width: 100%;
  padding: 2.5rem clamp(1rem, 3.5vw, 2.5rem);
  background: ${({ $tint, $dark }) =>
    $dark
      ? 'var(--color-bg-alt)'
      : $tint
      ? 'var(--color-bg-alt)'
      : 'var(--color-bg)'};
  color: var(--color-text);
  transition: background 0.25s ease, color 0.25s ease;

  ${media.md} {
    padding: 3rem clamp(1.25rem, 3.5vw, 2.5rem);
  }

  ${media.lg} {
    padding: 3.5rem clamp(1.5rem, 4vw, 3rem);
  }
`;

export const SectionInner = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const SectionHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const Eyebrow = styled.span<{ $onDark?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);

  &::before {
    content: '';
    width: 1.75rem;
    height: 2px;
    border-radius: ${radii.full};
    background: currentColor;
  }
`;

export const SectionTitle = styled.h2<{ $onDark?: boolean }>`
  font-family: ${fontFamily.display};
  font-size: clamp(1.625rem, 3.4vw, 2.25rem);
  font-weight: 800;
  line-height: 1.15;
  margin-top: 0.25rem;
  color: var(--color-text);
`;

export const SectionSubtitle = styled.p<{ $onDark?: boolean }>`
  margin-top: 0.35rem;
  max-width: 44rem;
  font-size: ${fontSizes.md};
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const PillLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  border: none;
  cursor: pointer;
  text-decoration: none;
  box-shadow: ${shadows.sm};
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: ${shadows.md};
  }
`;

export const OutlinePill = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  border-radius: ${radii.full};
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

export const RailControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const RoundButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.full};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Rail = styled.div`
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 0.75rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    scroll-snap-align: start;
    flex: 0 0 auto;
  }
`;

export const TabRow = styled.div`
  display: flex;
  gap: 0.625rem;
  overflow-x: auto;
  margin-bottom: 1.75rem;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabItem = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1.25rem;
  border-radius: ${radii.full};
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-surface)'};
  color: ${({ $active }) =>
    $active ? '#ffffff' : 'var(--color-text-secondary)'};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: ${({ $active }) =>
    $active ? '0 2px 8px var(--button-primary-shadow)' : 'none'};
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-primary);
    color: ${({ $active }) => ($active ? '#ffffff' : 'var(--color-primary)')};
  }
`;
