import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { brandColors } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii, shadows } from '@/theme';

export const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.25rem 1rem 3rem;

  ${media.lg} {
    padding: 1.5rem clamp(1.25rem, 2vw, 2rem) 3rem;
  }
`;

export const Title = styled.h1`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: ${brandColors.chocolate};
  margin-bottom: 1.25rem;

  [data-theme='dark'] & {
    color: var(--color-text);
  }
`;

export const Layout = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.lg} {
    grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
    gap: 2rem;
  }
`;

export const Lines = styled.div`
  display: grid;
  gap: 1rem;
  align-content: start;
`;

export const LineCard = styled.article`
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 0.875rem;
  padding: 0.875rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};

  ${media.sm} {
    grid-template-columns: 7.5rem 1fr;
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    box-shadow: 0 4px 16px var(--color-shadow);
  }
`;

export const LineImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: ${radii.md};
`;

export const LineBody = styled.div`
  display: grid;
  gap: 0.5rem;
  align-content: start;
`;

export const LineTitle = styled(Link)`
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    color: var(--color-primary);
  }
`;

export const LineMeta = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: ${brandColors.gray600};

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const LineFoot = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.35rem;
  border-radius: ${radii.full};
  border: 1px solid ${brandColors.tan};

  [data-theme='dark'] & {
    border-color: var(--color-border);
    background: var(--color-surface-elevated);
  }
`;

export const StepButton = styled.button`
  width: 2rem;
  height: 2rem;
  min-width: 32px;
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }

  &:active {
    transform: scale(0.92);
  }
`;

export const Quantity = styled.span`
  min-width: 1.25rem;
  text-align: center;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
`;

export const LinePrice = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.lg};
  font-weight: 800;
  color: var(--color-primary);
`;

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  padding: 0.4rem;
  border: none;
  border-radius: ${radii.full};
  background: transparent;
  color: ${brandColors.gray400};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #fef2f2;
    color: ${brandColors.danger500};
  }
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

  [data-theme='dark'] & {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    box-shadow: 0 8px 30px var(--color-shadow-strong);
  }
`;

export const SummaryTitle = styled.h2`
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: ${brandColors.chocolate};

  [data-theme='dark'] & {
    color: var(--color-text);
  }
`;

export const SummaryRow = styled.div<{ $strong?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  font-size: ${({ $strong }) => ($strong ? fontSizes.md : fontSizes.sm)};
  font-weight: ${({ $strong }) => ($strong ? 800 : 600)};
  color: ${({ $strong }) =>
    $strong ? brandColors.chocolate : brandColors.gray600};

  [data-theme='dark'] & {
    color: ${({ $strong }) =>
      $strong ? 'var(--color-text)' : 'var(--color-text-secondary)'};
  }
`;

export const SaveRow = styled(SummaryRow)`
  color: ${brandColors.success500};
`;

export const CouponRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CouponInput = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.625rem 0.875rem;
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.tan};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  outline: none;

  &:focus {
    border-color: var(--color-primary);
  }

  [data-theme='dark'] & {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    color: var(--color-text);

    &::placeholder {
      color: var(--color-text-muted);
    }

    &:focus {
      border-color: var(--color-primary);
    }
  }
`;

export const CouponButton = styled.button`
  padding: 0.625rem 1rem;
  border: none;
  border-radius: ${radii.md};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const CheckoutButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 48px;
  padding: 0.875rem 1.5rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(234, 88, 12, 0.25);
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background: var(--color-primary-hover);
    color: #ffffff;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Empty = styled.div`
  display: grid;
  gap: 1rem;
  justify-items: center;
  padding: 4rem 1rem;
  text-align: center;
  font-size: ${fontSizes.md};
  font-weight: 700;
  color: var(--color-text-secondary);
`;

export const EmptyLink = styled(Link)`
  padding: 0.625rem 1.5rem;
  border-radius: ${radii.md};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.92;
  }
`;
