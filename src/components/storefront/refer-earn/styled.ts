import styled from 'styled-components';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Panel = styled.div`
  display: grid;
  gap: 2rem;
  align-items: center;
  padding: 2.5rem 1.5rem;
  border-radius: ${radii.xl};
  border: 1px solid #fed7aa;
  background: #ffffff;
  color: var(--color-text);
  position: relative;
  overflow: hidden;

  [data-theme='light'] & {
    background: #ffffff;
    border-color: #fed7aa;
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);
  }

  ${media.md} {
    padding: 3rem 2.5rem;
  }

  ${media.lg} {
    grid-template-columns: 1.25fr 1fr;
    padding: 3.5rem 4rem;
  }
`;

export const SparklesWrap = styled.div`
  display: none;
`;

export const Copy = styled.div`
  display: grid;
  gap: 0.875rem;
  justify-items: start;
  position: relative;
  z-index: 2;
`;

export const Pill = styled.span`
  padding: 0.35rem 0.95rem;
  border-radius: ${radii.full};
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(234, 88, 12, 0.2);
`;

export const Title = styled.h2`
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-text);
`;

export const Text = styled.p`
  font-size: ${fontSizes.md};
  font-weight: 500;
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 34rem;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 0.5rem;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);

  svg {
    color: var(--color-primary);
  }
`;

export const CodeCard = styled.div`
  display: grid;
  gap: 0.875rem;
  padding: 1.75rem;
  border-radius: ${radii.xl};
  position: relative;
  z-index: 2;

  [data-theme='light'] & {
    background: #ffffff;
    color: var(--color-text);
    border: 1px solid var(--color-border);
    box-shadow: 0 16px 40px rgba(60, 42, 25, 0.1);
  }

  [data-theme='dark'] & {
    background: var(--color-surface-elevated);
    color: #ffffff;
    border: 1px solid var(--color-border);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  }
`;

export const Label = styled.span`
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
`;

export const CodeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CodeValue = styled.span`
  flex: 1 1 auto;
  padding: 0.75rem 1rem;
  border-radius: ${radii.md};
  border: 1.5px dashed var(--color-primary);
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: ${fontSizes.sm};
  font-weight: 800;
  font-family: monospace;
  letter-spacing: 0.05em;
  text-align: center;
`;

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: ${radii.md};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px var(--button-primary-shadow);
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: ${radii.md};
  border: 1px solid var(--color-border);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  outline: none;

  [data-theme='light'] & {
    background: #fafafe;
    border-color: rgba(226, 232, 240, 0.9);
    color: #0f172a;
  }

  [data-theme='dark'] & {
    background: #0a0d18;
    border-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }

  &:focus {
    border-color: var(--color-primary);
  }
`;

export const ReferButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  border: none;
  border-radius: ${radii.md};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px var(--button-primary-shadow);
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }
`;

export const Helper = styled.p`
  margin: 0;
  font-size: ${fontSizes.xs};
  color: var(--color-text-secondary);

  [data-theme='dark'] & {
    color: rgba(255, 255, 255, 0.7);
  }
`;
