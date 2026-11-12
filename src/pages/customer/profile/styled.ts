import styled from 'styled-components';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export * from '@/components/ui/portal-primitives/styled';

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 860px;
  width: 100%;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

export const ProfileTitle = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 1.85rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
`;

export const ProfileSub = styled.p`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: var(--color-text-secondary);
`;

export const ProfileSection = styled.div`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.md};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.75rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  ${media.belowSm} {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const InputLabel = styled.label`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
`;

export const IdentityPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: ${radii.sm};
  font-size: ${fontSizes.sm};
  color: var(--color-text);
`;
