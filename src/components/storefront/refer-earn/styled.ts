import styled from 'styled-components';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Panel = styled.div`
  display: grid;
  gap: 1.75rem;
  align-items: center;
  padding: 1.75rem;
  border-radius: ${radii.xxl};
  border: 1px solid ${brandColors.tan};
  background: ${brandGradients.referBanner};

  ${media.lg} {
    grid-template-columns: 1.2fr 1fr;
    padding: 2.5rem;
  }
`;

export const Copy = styled.div`
  display: grid;
  gap: 0.75rem;
  justify-items: start;
`;

export const Pill = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const Text = styled.p`
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.gray600};
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3125rem 0.75rem;
  border-radius: ${radii.full};
  background: ${brandColors.white};
  border: 1px solid ${brandColors.tan};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.chocolate};
`;

export const CodeCard = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: ${radii.xl};
  background: ${brandColors.white};
  box-shadow: ${shadows.md};
`;

export const Label = styled.span`
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandColors.gray400};
`;

export const CodeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CodeValue = styled.span`
  flex: 1 1 auto;
  padding: 0.6875rem 1rem;
  border-radius: ${radii.md};
  border: 1px dashed ${brandColors.pink500};
  background: ${brandColors.pink100};
  color: ${brandColors.pink500};
  font-size: ${fontSizes.sm};
  font-weight: 800;
  letter-spacing: 0.08em;
`;

export const CopyButton = styled.button`
  padding: 0.6875rem 1.125rem;
  border: none;
  border-radius: ${radii.md};
  background: ${brandColors.chocolate};
  color: ${brandColors.white};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.6875rem 1rem;
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.tan};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.chocolate};
  outline: none;

  &:focus {
    border-color: ${brandColors.pink500};
    box-shadow: 0 0 0 3px rgba(${brandRgb.pink}, 0.2);
  }
`;

export const ReferButton = styled.button`
  padding: 0.6875rem 1rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.info500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;
`;

export const Helper = styled.p`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: ${brandColors.gray400};
`;
