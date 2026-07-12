import styled from 'styled-components';
import type { ColorTokens } from '../../tokens/colors';
import { space } from '../../tokens/spacing';

export const Rail = styled.div<{ $colors: ColorTokens }>`
  position: relative;
`;

export const Track = styled.div`
  display: flex;
  gap: ${space[5]};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-block: ${space[2]};
  margin-inline: calc(-1 * ${space[4]});
  padding-inline: ${space[4]};

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    scroll-snap-align: start;
    flex-shrink: 0;
  }
`;

export const FadeLeft = styled.div<{ $colors: ColorTokens }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(
    90deg,
    ${({ $colors }) => $colors.bg} 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 2;
`;

export const FadeRight = styled.div<{ $colors: ColorTokens }>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 48px;
  background: linear-gradient(
    270deg,
    ${({ $colors }) => $colors.bg} 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 2;
`;
