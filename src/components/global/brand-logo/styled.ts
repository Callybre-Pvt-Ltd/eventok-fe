import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes } from '@/theme';

export const LogoLink = styled(Link)<{ $color?: string; $fontSize?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
  font-family: ${fontFamily.display};
  font-size: ${({ $fontSize }) => $fontSize ?? fontSizes.lg};
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${({ $color }) => $color ?? 'var(--color-text)'};
  white-space: nowrap;
  user-select: none;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.92;
  }
`;

export const LogoWrap = styled.div<{ $color?: string; $fontSize?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${fontFamily.display};
  font-size: ${({ $fontSize }) => $fontSize ?? fontSizes.lg};
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: ${({ $color }) => $color ?? 'var(--color-text)'};
  white-space: nowrap;
  user-select: none;
`;

export const Wordmark = styled.span<{ $collapsed?: boolean }>`
  display: ${({ $collapsed }) => ($collapsed ? 'none' : 'inline')};
  transition: opacity 0.2s ease;
`;

export const Accent = styled.span<{ $accentColor?: string }>`
  color: ${({ $accentColor }) => $accentColor ?? '#ea580c'};
`;
