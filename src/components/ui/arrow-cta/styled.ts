import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, shadows } from '@/theme';

export const CtaGroup = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;

export const CtaPill = styled(Link)<{ $dark?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8125rem 1.75rem;
  border-radius: 9999px;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  text-decoration: none;
  box-shadow: ${shadows.sm};
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
    background: ${brandColors.sand};
  }
`;

export const CtaCircle = styled.span<{ $dark?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.875rem;
  height: 2.875rem;
  border-radius: 50%;
  background: ${({ $dark }) =>
    $dark ? brandColors.chocolate : brandColors.white};
  color: ${({ $dark }) => ($dark ? brandColors.gold : brandColors.chocolate)};
  box-shadow: ${shadows.sm};
  transition: transform 0.25s ease;

  ${CtaGroup}:hover & {
    transform: rotate(45deg);
  }
`;
