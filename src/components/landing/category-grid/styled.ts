import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { ThemePalette } from '@/theme';
import { fontSizes, radii, shadows } from '@/theme';
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '../shared/styled';

export { Section, SectionHeader, SectionInner, SectionSubtitle, SectionTitle };

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

export const CategoryCard = styled(Link)<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.xl};
  text-decoration: none;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  box-shadow: ${shadows.sm};

  &:hover {
    border-color: ${({ $palette }) => $palette.primary}50;
    transform: translateY(-4px);
    box-shadow: ${shadows.lg};
  }
`;

export const CategoryIcon = styled.div<{ $palette: ThemePalette }>`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: ${radii.lg};
  background: ${({ $palette }) => $palette.primaryLight};
  color: ${({ $palette }) => $palette.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CategoryName = styled.span<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
  text-align: center;
`;
