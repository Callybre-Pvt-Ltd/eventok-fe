import styled from 'styled-components';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export * from '@/components/ui/portal-primitives/styled';

export const HubWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const HubHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

export const HubTitle = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 1.85rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
`;

export const HubSub = styled.p`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: var(--color-text-secondary);
`;

export const HubGrid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 1.5rem;

  ${media.belowLg} {
    grid-template-columns: 1fr;
  }
`;

export const SectionBlock = styled.section`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.md};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.75rem;
`;

export const BlockTitle = styled.h2`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const BookingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: ${radii.sm};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: var(--color-primary);
  }
`;

export const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
`;

export const BookingTitle = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text);
`;

export const BookingMeta = styled.span`
  font-size: 0.78rem;
  color: var(--color-text-secondary);
`;

export const LauncherList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const LauncherCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.15rem;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: ${radii.sm};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-surface);
    border-color: var(--color-primary);
  }
`;

export const LauncherLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

export const LauncherIconWrap = styled.div`
  width: 36px;
  height: 36px;
  border-radius: ${radii.sm};
  background: var(--color-primary-light);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const LauncherText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const LauncherTitle = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text);
`;

export const LauncherSub = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;
