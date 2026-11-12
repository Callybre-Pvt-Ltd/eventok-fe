import styled from 'styled-components';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export * from '@/components/ui/portal-primitives/styled';

export const CockpitWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const CockpitHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

export const CockpitEyebrow = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
`;

export const CockpitTitle = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
`;

export const CockpitSub = styled.p`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: var(--color-text-secondary);
`;

export const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

export const MetricTile = styled.div<{ $accent?: boolean }>`
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.md};
  padding: 1.15rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $accent }) =>
      $accent ? 'var(--color-primary)' : 'transparent'};
  }
`;

export const MetricLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  letter-spacing: 0.02em;
`;

export const MetricNumber = styled.span<{ $accent?: boolean }>`
  font-family: ${fontFamily.display};
  font-size: clamp(1.5rem, 2.5vw, 1.85rem);
  font-weight: 800;
  color: ${({ $accent }) =>
    $accent ? 'var(--color-primary)' : 'var(--color-text)'};
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

export const MetricSubtext = styled.span`
  font-size: 0.72rem;
  color: var(--color-text-secondary);
`;

export const CockpitGrid = styled.div`
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

export const ActionTileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  ${media.belowSm} {
    grid-template-columns: 1fr;
  }
`;

export const ActionTile = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: ${radii.sm};
  color: var(--color-text);
  font-size: ${fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;

  &:hover {
    background: var(--color-surface);
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

export const FeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

export const FeedRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0.85rem;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: ${radii.sm};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: var(--color-primary);
  }
`;

export const FeedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
`;

export const FeedTitle = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FeedMeta = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;
