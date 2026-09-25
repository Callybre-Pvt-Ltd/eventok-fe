import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import { Input } from '@/pages/login/styled';

export const Wrap = styled.div`
  position: relative;
  display: flex;
`;

export const PasswordField = styled(Input)`
  width: 100%;
  padding-right: 3rem;
`;

export const ToggleButton = styled.button<{ $palette: ThemePalette }>`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: none;
  background: transparent;
  color: ${({ $palette }) => $palette.textMuted};
  cursor: pointer;

  &:hover {
    color: ${({ $palette }) => $palette.primary};
  }
`;
