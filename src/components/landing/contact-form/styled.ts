import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontSizes, radii, shadows, spacing } from '@/theme';

export const Section = styled.section<{ $palette: ThemePalette }>`
  padding: clamp(1.5rem, 4vw, ${spacing.xxl});
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.xxl};
  box-shadow: ${shadows.lg};
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.xl};
`;

export const SectionTitle = styled.h2<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.sm};
  font-size: ${fontSizes.h3};
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;

export const SectionSubtitle = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  font-size: ${fontSizes.md};
  color: ${({ $palette }) => $palette.textSecondary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Field = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const Label = styled.label<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${({ $palette }) => $palette.text};
`;

export const Input = styled.input<{ $palette: ThemePalette }>`
  width: 100%;
  box-sizing: border-box;
  padding: 0.875rem 1rem;
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.md};
  font-size: ${fontSizes.md};
  font-family: inherit;
  background: ${({ $palette }) => $palette.background};
  color: ${({ $palette }) => $palette.text};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ $palette }) => $palette.primary};
  }

  &::placeholder {
    color: ${({ $palette }) => $palette.textMuted};
  }
`;

export const TextArea = styled.textarea<{ $palette: ThemePalette }>`
  width: 100%;
  box-sizing: border-box;
  padding: 0.875rem 1rem;
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.md};
  font-size: ${fontSizes.md};
  font-family: inherit;
  background: ${({ $palette }) => $palette.background};
  color: ${({ $palette }) => $palette.text};
  outline: none;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ $palette }) => $palette.primary};
  }

  &::placeholder {
    color: ${({ $palette }) => $palette.textMuted};
  }
`;

export const SuccessMsg = styled.p<{ $palette: ThemePalette }>`
  text-align: center;
  color: ${({ $palette }) => $palette.success};
  font-size: ${fontSizes.md};
  font-weight: 600;
  padding: 1.5rem;
`;
