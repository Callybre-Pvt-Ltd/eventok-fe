import styled, { keyframes } from 'styled-components';
import { fontFamily, fontSizes, media, radii } from '@/theme';

const floatSparkle = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-4px) scale(1.1);
    opacity: 1;
  }
`;

export const Panel = styled.div`
  display: grid;
  gap: 2rem;
  align-items: center;
  padding: 2.5rem 1.5rem;
  border-radius: ${radii.xxl};
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #8b5cf6 100%);
  color: #ffffff;
  box-shadow: 0 20px 50px -12px rgba(124, 58, 237, 0.38);
  position: relative;
  overflow: hidden;

  [data-theme='light'] & {
    background: linear-gradient(135deg, #6366f1 0%, #7c3aed 52%, #8b5cf6 100%);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 50px -10px rgba(124, 58, 237, 0.38);
  }

  [data-theme='dark'] & {
    background: linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #3b0764 100%);
    border-color: rgba(167, 139, 250, 0.3);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
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
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  pointer-events: none;
  display: flex;
  gap: 0.75rem;
  animation: ${floatSparkle} 4s ease-in-out infinite;

  ${media.belowMd} {
    display: none;
  }
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
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(8px);
  color: #ffffff;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.35);
`;

export const Title = styled.h2`
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
`;

export const Text = styled.p`
  font-size: ${fontSizes.md};
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 34rem;
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: 0.5rem;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.85rem;
  border-radius: ${radii.full};
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: #ffffff;
`;

export const CodeCard = styled.div`
  display: grid;
  gap: 0.875rem;
  padding: 1.75rem;
  border-radius: ${radii.xl};
  background: #ffffff;
  color: #0f172a;
  border: 1px solid rgba(226, 232, 240, 0.85);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
  position: relative;
  z-index: 2;

  [data-theme='dark'] & {
    background: #141a32;
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.1);
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
  background: var(--button-primary-gradient);
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
  background: var(--button-primary-gradient);
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
