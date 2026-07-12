import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, media, spacing } from '@/theme';

export const Section = styled.section<{ $palette: ThemePalette }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ $palette }) => $palette.background};
  overflow: hidden;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 5rem clamp(1.25rem, 4vw, 2.5rem) clamp(1.25rem, 3vw, 2rem);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  gap: clamp(1rem, 2.5vw, 1.75rem);
  min-height: 0;
  box-sizing: border-box;

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    grid-template-rows: 1fr;
    align-items: center;
    gap: clamp(1.5rem, 4vw, 3rem);
  }
`;

export const CopyColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  min-width: 0;
`;

export const Header = styled.div`
  max-width: 680px;
  margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
`;

export const Eyebrow = styled.span`
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #a1a1aa;
  margin-bottom: ${spacing.md};
`;

export const Title = styled.h1<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.md};
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 5.5vw, 3.75rem);
  font-weight: 700;
  letter-spacing: -0.048em;
  line-height: 1.02;
  color: ${({ $palette }) => $palette.text};
`;

export const Lead = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: clamp(${fontSizes.md}, 1.75vw, ${fontSizes.lg});
  line-height: 1.6;
  color: ${({ $palette }) => $palette.textSecondary};
  max-width: 520px;
`;

export const CategoryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin-top: clamp(0.75rem, 2vw, 1.25rem);
`;

export const CategoryPill = styled.button`
  padding: 0.5rem 1.125rem;
  border-radius: 999px;
  border: 1px solid #e4e4e7;
  background: #ffffff;
  color: #3f3f46;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: #18181b;
    color: #18181b;
    background: #fafafa;
  }
`;

export const Mosaic = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.75rem;
  min-height: 0;
  height: 100%;
  max-height: min(52vh, 520px);
  width: 100%;

  ${media.belowLg} {
    max-height: min(36vh, 320px);
    grid-template-columns: 1.2fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  ${media.belowMd} {
    max-height: min(32vh, 260px);
  }
`;

export const MosaicItem = styled.div<{ $wide?: boolean }>`
  border-radius: 20px;
  overflow: hidden;
  background: #f4f4f5;
  min-height: 0;
  grid-row: ${({ $wide }) => ($wide ? 'span 2' : 'span 1')};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover img {
    transform: scale(1.04);
  }
`;

export const MosaicStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
`;

export const MosaicSmall = styled(MosaicItem)`
  flex: 1;
  min-height: 0;
`;
