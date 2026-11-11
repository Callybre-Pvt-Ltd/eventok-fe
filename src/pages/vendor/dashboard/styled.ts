import styled from 'styled-components';
import { fontSizes, fontFamily } from '@/theme';

export * from '@/components/ui/portal-primitives/styled';

export const DashboardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const GreetingHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const GreetingEyebrow = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-primary);
`;

export const GreetingTitle = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.6rem, 3.2vw, 2.2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;

  [data-theme='dark'] & {
    color: var(--color-text);
  }
`;

export const GreetingSub = styled.p`
  margin: 0;
  font-size: ${fontSizes.sm};
  color: #64748b;
  line-height: 1.5;

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
`;

export const MetricTile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1.15rem 1.25rem;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  transition: all 0.15s ease;

  &:hover {
    border-color: #cbd5e1;
    transform: translateY(-1px);
  }

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);

    &:hover {
      border-color: var(--color-primary);
    }
  }
`;

export const MetricLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const MetricNumber = styled.span<{ $accent?: boolean }>`
  font-size: 1.6rem;
  font-weight: 800;
  color: ${({ $accent }) =>
    $accent ? 'var(--color-primary)' : 'var(--color-text)'};
  font-family: ${fontFamily.display};
`;

export const MetricSubtext = styled.span`
  font-size: 0.72rem;
  color: #94a3b8;

  [data-theme='dark'] & {
    color: var(--color-text-muted);
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1.2fr;
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 1.25rem 1.5rem;

  [data-theme='dark'] & {
    background: var(--color-surface);
    border-color: var(--color-border);
  }
`;

export const BlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BlockTitle = styled.h2`
  margin: 0;
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: #0f172a;

  [data-theme='dark'] & {
    color: var(--color-text);
  }
`;

export const BookingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const BookingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.85rem;
  background: #f8fafc;
  border-radius: 8px;
  gap: 0.75rem;

  [data-theme='dark'] & {
    background: var(--color-bg-alt);
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
  font-weight: 700;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  [data-theme='dark'] & {
    color: var(--color-text);
  }
`;

export const BookingMeta = styled.span`
  font-size: ${fontSizes.xs};
  color: #64748b;

  [data-theme='dark'] & {
    color: var(--color-text-secondary);
  }
`;

export const PerformanceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: ${fontSizes.xs};

  &:last-child {
    border-bottom: none;
  }

  [data-theme='dark'] & {
    border-bottom-color: var(--color-border);
    color: var(--color-text-secondary);
  }
`;
