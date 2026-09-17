import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: ${brandColors.accent100};
  border-bottom: 1px solid ${brandColors.tan};

  ${media.lg} {
    padding: 0.5rem 2.5rem;
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const Mark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  border-radius: ${radii.sm};
  background: ${brandColors.accent500};
  color: ${brandColors.white};
`;

export const Copy = styled.div`
  min-width: 0;
`;

export const Title = styled.p`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const Subtitle = styled.p`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: ${brandColors.gray600};
  display: none;

  ${media.md} {
    display: block;
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Install = styled.button`
  padding: 0.375rem 1rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.accent500};
  color: ${brandColors.white};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${brandColors.accent600};
  }
`;

export const Dismiss = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  border-radius: ${radii.full};
  background: transparent;
  color: ${brandColors.gray600};
  cursor: pointer;

  &:hover {
    background: ${brandColors.white};
  }
`;
