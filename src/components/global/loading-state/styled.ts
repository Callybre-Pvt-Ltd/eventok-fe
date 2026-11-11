import styled, { keyframes } from 'styled-components';
import { fontFamily, fontSizes, radii, spacing } from '@/theme';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.95;
  }
  50% {
    opacity: 0.42;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingWrap = styled.div<{ $fullPage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: ${({ $fullPage }) => ($fullPage ? '100vh' : 'min(50vh, 420px)')};
  padding: ${spacing.xl};
  gap: ${spacing.lg};
  box-sizing: border-box;
`;

export const SkeletonGrid = styled.div<{ $single?: boolean }>`
  display: grid;
  grid-template-columns: ${({ $single }) =>
    $single ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))'};
  gap: 1.25rem;
  width: 100%;
  max-width: ${({ $single }) => ($single ? '440px' : '960px')};
`;

export const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: ${radii.lg};
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 4px 16px var(--color-shadow);
  box-sizing: border-box;
  width: 100%;
  animation: ${pulse} 1.6s ease-in-out infinite;
`;

export const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;

export const SkeletonAvatar = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
  flex-shrink: 0;
`;

export const SkeletonMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
  min-width: 0;
`;

export const SkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

export const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '0.75rem'};
  border-radius: ${radii.sm};
  background: var(--color-bg-alt);
`;

export const SkeletonFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  margin-top: 0.25rem;
  border-top: 1px solid var(--color-border);
`;

export const SkeletonPill = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width ?? '5.5rem'};
  height: 1.875rem;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
`;

export const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: ${spin} 0.75s linear infinite;
  flex-shrink: 0;
`;

export const LoadingText = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  color: var(--color-text-secondary);
  font-weight: 550;
  letter-spacing: -0.01em;
`;
