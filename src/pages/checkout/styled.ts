import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;

  ${media.lg} {
    padding: 2rem 2.5rem 4rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
  margin-bottom: 1.25rem;
`;

export const Layout = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.lg} {
    grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
    gap: 2rem;
  }
`;

export const Form = styled.form`
  display: grid;
  gap: 1.25rem;
  align-content: start;
`;

export const Card = styled.section`
  display: grid;
  gap: 0.875rem;
  padding: 1.25rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
`;

export const CardTitle = styled.h2`
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const Row = styled.div`
  display: grid;
  gap: 0.875rem;
  grid-template-columns: 1fr;

  ${media.sm} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 0.375rem;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  color: ${brandColors.gray600};
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
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

export const TextArea = styled.textarea`
  min-height: 5.5rem;
  padding: 0.75rem 1rem;
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.tan};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.chocolate};
  outline: none;
  resize: vertical;

  &:focus {
    border-color: ${brandColors.pink500};
  }
`;

export const TermsRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.gray600};
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: ${brandColors.pink500};
`;

export const ErrorText = styled.p`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: ${brandColors.danger500};
`;

export const Summary = styled.aside`
  display: grid;
  gap: 0.75rem;
  align-self: start;
  padding: 1.25rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  box-shadow: ${shadows.md};

  ${media.lg} {
    position: sticky;
    top: 10rem;
  }
`;

export const SummaryLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: ${brandColors.gray600};
`;

export const SummaryStrong = styled(SummaryLine)`
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const PayButton = styled.button`
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

export const PrivacyNote = styled.p`
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.6;
  color: ${brandColors.gray400};
`;

export const Success = styled.div`
  display: grid;
  gap: 1rem;
  justify-items: center;
  text-align: center;
  padding: 4rem 1.5rem;
  border-radius: ${radii.xl};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.pink50};
`;

export const SuccessTitle = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const SuccessText = styled.p`
  max-width: 34rem;
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.gray600};
`;

export const BookingId = styled.span`
  padding: 0.5rem 1.125rem;
  border-radius: ${radii.full};
  background: ${brandColors.white};
  border: 1px dashed ${brandColors.pink500};
  color: ${brandColors.pink500};
  font-size: ${fontSizes.sm};
  font-weight: 800;
  letter-spacing: 0.08em;
`;

export const SuccessLink = styled(Link)`
  padding: 0.625rem 1.5rem;
  border-radius: ${radii.full};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
`;

export const ConfirmList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.25rem 0;
`;

export const ConfirmRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  font-size: ${fontSizes.sm};
  color: ${brandColors.gray600};

  > span:last-child {
    text-align: right;
    color: ${brandColors.chocolate};
    font-weight: 600;
  }
`;

export const ConfirmTotal = styled.span`
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;
