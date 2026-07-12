import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import type { ColorTokens } from '../../tokens/colors';
import type { SectionPattern } from '../../tokens/sections';
import { container, sectionSpacing, space } from '../../tokens/spacing';
import { media } from '../../tokens/layout';

const bgMap = (colors: ColorTokens, bg: SectionPattern['bg']) => {
  switch (bg) {
    case 'warm':
      return colors.bgWarm;
    case 'cool':
      return colors.bgCool;
    case 'dark':
      return colors.neutral[900];
    case 'photo':
      return colors.bg;
    default:
      return colors.bg;
  }
};

export const Shell = styled(motion.section)<{
  $pattern: SectionPattern;
  $colors: ColorTokens;
}>`
  position: relative;
  padding-block: ${sectionSpacing.default};
  background: ${({ $pattern, $colors }) => bgMap($colors, $pattern.bg)};
  color: ${({ $pattern, $colors }) =>
    $pattern.bg === 'dark' ? $colors.textInverse : $colors.textPrimary};
  overflow: hidden;

  ${({ $pattern }) =>
    $pattern.flowOut === 'overlap' &&
    css`
      margin-bottom: -${sectionSpacing.heroOverlap};
      z-index: 2;
    `}
`;

export const BackgroundPhoto = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

export const Inner = styled.div<{ $pattern: SectionPattern }>`
  position: relative;
  z-index: 1;
  max-width: ${container.max};
  margin-inline: auto;
  padding-inline: ${container.padding};
`;

export const Content = styled.div<{ $pattern: SectionPattern }>`
  ${({ $pattern }) => {
    switch ($pattern.alignment) {
      case 'center':
        return css`
          max-width: ${container.narrow};
          margin-inline: auto;
          text-align: center;
        `;
      case 'split':
        return css`
          display: grid;
          gap: ${space[10]};
          ${media.lg} {
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: ${space[16]};
          }
        `;
      default:
        return css``;
    }
  }}
`;

export const FlowTail = styled.div<{
  $flow: SectionPattern['flowOut'];
  $colors: ColorTokens;
}>`
  ${({ $flow, $colors }) =>
    $flow === 'fade' &&
    css`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: linear-gradient(180deg, transparent 0%, ${$colors.bg} 100%);
      pointer-events: none;
    `}

  ${({ $flow, $colors }) =>
    $flow === 'divider' &&
    css`
      &::after {
        content: '';
        display: block;
        width: 48px;
        height: 3px;
        background: ${$colors.brand[500]};
        border-radius: 999px;
        margin: ${space[8]} auto 0;
        opacity: 0.6;
      }
    `}
`;
