import styled from 'styled-components';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Card = styled.aside`
  display: grid;
  gap: 0.875rem;
  padding: 1.25rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  box-shadow: ${shadows.md};
  align-self: start;

  ${media.lg} {
    position: sticky;
    top: 10rem;
  }
`;

export const Label = styled.span`
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandColors.gray400};
`;

export const Price = styled.p`
  font-family: ${fontFamily.display};
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  color: ${brandColors.pink500};
`;

export const Option = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  width: 100%;
  padding: 0.875rem;
  text-align: left;
  border-radius: ${radii.md};
  border: 1.5px solid
    ${({ $active }) => ($active ? brandColors.pink500 : brandColors.tan)};
  background: ${({ $active }) =>
    $active ? brandColors.pink100 : brandColors.white};
  cursor: pointer;
`;

export const Radio = styled.span<{ $active: boolean }>`
  margin-top: 0.125rem;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
  border-radius: ${radii.full};
  border: 2px solid
    ${({ $active }) => ($active ? brandColors.pink500 : brandColors.gray400)};
  background: ${({ $active }) =>
    $active ? brandColors.pink500 : 'transparent'};
  box-shadow: inset 0 0 0 2px ${brandColors.white};
`;

export const OptionText = styled.span`
  display: grid;
  gap: 0.125rem;
`;

export const OptionTitle = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const OptionHint = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  color: ${brandColors.gray600};
`;

export const Callout = styled.div`
  display: grid;
  gap: 0.25rem;
  padding: 0.875rem;
  border-radius: ${radii.md};
  background: ${brandColors.pink50};
`;

export const CalloutTitle = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const CalloutText = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 500;
  line-height: 1.6;
  color: ${brandColors.gray600};
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem 1rem;
  border: none;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${brandColors.pink600};
  }
`;

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8125rem 1rem;
  border-radius: ${radii.full};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  color: ${brandColors.chocolate};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${brandColors.pink500};
    color: ${brandColors.pink500};
  }
`;

export const WhatsAppButton = styled(SecondaryButton)`
  border-color: ${brandColors.success500};
  color: ${brandColors.success500};

  &:hover {
    border-color: ${brandColors.success500};
    color: ${brandColors.success500};
    background: ${brandColors.success50};
  }
`;

export const TrustRow = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding-top: 0.75rem;
  border-top: 1px solid ${brandColors.tan};
`;

export const TrustItem = styled.div`
  display: grid;
  gap: 0.25rem;
  justify-items: center;
  text-align: center;
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${brandColors.gray600};
`;

export const PartnerNote = styled.p`
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.6;
  color: ${brandColors.gray400};
`;
