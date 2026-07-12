import styled, { keyframes } from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontSizes, radii, spacing } from '@/theme';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const LoadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxxl};
  gap: ${spacing.lg};
`;

export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 800px;
`;

export const SkeletonCard = styled.div<{ $palette: ThemePalette }>`
  height: 100px;
  border-radius: ${radii.lg};
  background: linear-gradient(
    90deg,
    ${({ $palette }) => $palette.border} 25%,
    ${({ $palette }) => $palette.backgroundAlt} 50%,
    ${({ $palette }) => $palette.border} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const LoadingText = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
  font-weight: 500;
`;
