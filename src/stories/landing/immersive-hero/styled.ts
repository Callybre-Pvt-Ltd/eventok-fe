import styled from 'styled-components';
import type { ColorTokens } from '@/design-system';
import { sectionSpacing, space } from '@/design-system';
import { media } from '@/design-system';

export const HeroContent = styled.div<{ $colors: ColorTokens }>`
  position: relative;
  z-index: 2;
  min-height: clamp(520px, 85vh, 760px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-block: ${sectionSpacing.chapter};
  color: ${({ $colors }) => $colors.textInverse};
`;

export const HeroOverlay = styled.div<{ $colors: ColorTokens }>`
  position: absolute;
  inset: 0;
  background: ${({ $colors }) => $colors.photoScrim};
  z-index: 1;
`;

export const ParallaxPhoto = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
`;

export const ParallaxImg = styled.img`
  width: 110%;
  height: 110%;
  object-fit: cover;
  object-position: center 30%;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${space[4]};
  margin-block: ${space[8]};
`;

export const SearchWrap = styled.div`
  max-width: 960px;
`;

export const TextBlock = styled.div`
  max-width: 640px;
  ${media.lg} {
    padding-bottom: ${space[12]};
  }
`;
