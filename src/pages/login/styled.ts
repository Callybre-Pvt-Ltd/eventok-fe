import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { fontFamily, fontSizes, radii, spacing } from '@/theme';

export const AuthTitle = styled.h1<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.sm};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.h3};
  font-weight: 800;
  color: ${({ $palette }) => $palette.text};
  letter-spacing: -0.02em;
`;

export const AuthSubtitle = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 ${spacing.lg};
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
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
  padding: 0.875rem 1rem;
  border: 1.5px solid ${({ $palette }) => $palette.border};
  border-radius: ${radii.lg};
  font-size: ${fontSizes.md};
  font-family: inherit;
  background: ${({ $palette }) => $palette.surface};
  color: ${({ $palette }) => $palette.text};
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;

  &:focus {
    border-color: ${({ $palette }) => $palette.primary};
    box-shadow: 0 0 0 4px ${({ $palette }) => $palette.primary}18;
  }
`;

export const AuthFooter = styled.p<{ $palette: ThemePalette }>`
  margin: ${spacing.lg} 0 0;
  text-align: center;
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textMuted};

  a {
    color: ${({ $palette }) => $palette.primary};
    font-weight: 600;
    text-decoration: none;
  }
`;

export const ErrorMsg = styled.p<{ $palette: ThemePalette }>`
  color: ${({ $palette }) => $palette.error};
  font-size: ${fontSizes.sm};
  margin: 0 0 ${spacing.md};
  padding: 0.75rem;
  background: ${({ $palette }) => $palette.error}12;
  border-radius: ${radii.md};
`;

export const RoleGroup = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  gap: ${spacing.sm};
`;

export const RoleLabel = styled.label<{
  $palette: ThemePalette;
  $active?: boolean;
}>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  border-radius: ${radii.lg};
  border: 1.5px solid
    ${({ $palette, $active }) => ($active ? $palette.primary : $palette.border)};
  background: ${({ $palette, $active }) =>
    $active ? $palette.primaryLight : 'transparent'};
  color: ${({ $palette, $active }) =>
    $active ? $palette.primary : $palette.textSecondary};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  input {
    display: none;
  }
`;

export const StepDots = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: ${spacing.lg};
`;

export const StepDot = styled.div<{ $active: boolean; $palette: ThemePalette }>`
  height: 4px;
  flex: 1;
  border-radius: 999px;
  background: ${({ $active, $palette }) =>
    $active ? $palette.primary : $palette.border};
  transition: background 0.3s;
`;

export const VendorNote = styled.p<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.sm};
  color: ${({ $palette }) => $palette.textSecondary};
  line-height: 1.6;
  margin: 0 0 ${spacing.md};
  padding: ${spacing.md};
  border-radius: ${radii.md};
  background: ${({ $palette }) => $palette.primaryLight};
`;

export const CaptchaSlot = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${spacing.md};

  &:empty {
    margin-bottom: 0;
  }
`;

export const SubmitRow = styled.div`
  margin-top: ${spacing.sm};
`;
