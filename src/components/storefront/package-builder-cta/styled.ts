import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const BuilderCtaSection = styled.section`
  width: 100%;
  padding: 3.5rem clamp(1rem, 3.5vw, 2.5rem);
  background: var(--color-bg-alt);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);

  ${media.md} {
    padding: 4.5rem clamp(1.5rem, 4vw, 3rem);
  }
`;

export const BuilderCtaInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  align-items: center;

  ${media.lg} {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3.5rem;
  }
`;

export const LeftDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Eyebrow = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
`;

export const Heading = styled.h2`
  font-family: ${fontFamily.display};
  font-size: clamp(1.85rem, 3.2vw, 2.75rem);
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-text);

  span {
    color: var(--color-primary);
  }
`;

export const Description = styled.p`
  font-size: ${fontSizes.md};
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 36rem;
`;

export const StepsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const StepNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-weight: 800;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

export const StepCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const StepTitle = styled.h4`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
`;

export const StepSub = styled.p`
  font-size: ${fontSizes.xs};
  color: var(--color-text-secondary);
`;

export const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
  align-self: flex-start;
  margin-top: 0.75rem;

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-2px);
  }
`;

export const RightInteractivePreview = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.xl};
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

export const PreviewTitle = styled.h3`
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: var(--color-text);
`;

export const PreviewBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: ${radii.full};
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
`;

export const PreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const PreviewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  border-radius: ${radii.md};
  background: var(--color-bg-alt);
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text);
`;

export const PreviewTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
`;

export const TotalLabel = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text-secondary);
`;

export const TotalAmount = styled.span`
  font-size: ${fontSizes.xl};
  font-weight: 800;
  color: var(--color-primary);
`;
