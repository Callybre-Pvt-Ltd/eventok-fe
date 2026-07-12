import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontSizes, radii, shadows } from '@/theme';
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionTitle,
} from '../shared/styled';

export { Section, SectionHeader, SectionInner, SectionTitle };

export const FaqList = styled.div`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FaqItem = styled.div<{ $palette: ThemePalette }>`
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.lg};
  overflow: hidden;
  box-shadow: ${shadows.sm};
`;

export const FaqQuestion = styled.button<{
  $palette: ThemePalette;
  $open?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: ${fontSizes.md};
  font-weight: 600;
  color: ${({ $palette, $open }) => ($open ? $palette.primary : $palette.text)};
  text-align: left;
  font-family: inherit;
`;

export const ChevronIcon = styled.span<{ $open?: boolean }>`
  display: flex;
  transition: transform 0.3s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0')});
  flex-shrink: 0;
`;

export const FaqAnswer = styled.div<{
  $palette: ThemePalette;
  $open?: boolean;
}>`
  max-height: ${({ $open }) => ($open ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.35s ease;
  padding: ${({ $open }) => ($open ? '0 1.5rem 1.25rem' : '0 1.5rem')};
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textSecondary};
  line-height: 1.7;
`;
