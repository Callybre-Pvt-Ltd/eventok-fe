import styled from 'styled-components';
import { brandColors, brandGradients, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Launcher = styled.button`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 45;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem 0.625rem 0.625rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.ink900};
  color: ${brandColors.white};
  box-shadow: ${shadows.lg};
  cursor: pointer;

  ${media.lg} {
    right: 2rem;
    bottom: 2rem;
  }
`;

export const LauncherAvatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
`;

export const LauncherLabel = styled.span`
  display: grid;
  text-align: left;
  line-height: 1.2;
`;

export const LauncherTitle = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 800;
`;

export const LauncherSub = styled.span`
  font-size: 0.625rem;
  font-weight: 600;
  color: ${brandColors.gray400};
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(${brandRgb.ink}, 0.55);
  backdrop-filter: blur(4px);
`;

export const Modal = styled.div`
  width: 100%;
  max-width: 30rem;
  padding: 1.75rem;
  border-radius: ${radii.xxl};
  background: ${brandGradients.warm};
  box-shadow: ${shadows.xl};
`;

export const Eyebrow = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink100};
  color: ${brandColors.pink500};
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const Title = styled.h2`
  margin-top: 0.75rem;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xxl};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

export const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: ${radii.full};
  background: ${brandColors.success50};
  color: ${brandColors.success500};
  font-size: ${fontSizes.xs};
  font-weight: 700;
`;

export const Form = styled.form`
  display: grid;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const Row = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;

  ${media.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.chocolate};
  outline: none;

  &:focus {
    border-color: ${brandColors.pink500};
    box-shadow: 0 0 0 3px rgba(${brandRgb.pink}, 0.25);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.chocolate};
  outline: none;

  &:focus {
    border-color: ${brandColors.pink500};
  }
`;

export const Submit = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.ink900};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${brandColors.charcoal};
  }
`;

export const Dismiss = styled.button`
  width: 100%;
  margin-top: 0.5rem;
  border: none;
  background: transparent;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.gray600};
  cursor: pointer;
`;

export const Success = styled.p`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-radius: ${radii.md};
  background: ${brandColors.success50};
  color: ${brandColors.success500};
  font-size: ${fontSizes.sm};
  font-weight: 700;
`;
