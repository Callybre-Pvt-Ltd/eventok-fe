import styled from 'styled-components';
import { media, radii } from '@/theme';

export * from '@/components/ui/portal-primitives/styled';

export const SectionSpacer = styled.div`
  margin-top: 1.25rem;
`;

export const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
`;

export const UploadSectionTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const UploadSectionDesc = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
`;

export const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;

  ${media.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const UploadCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.85rem;
  border-radius: ${radii.md};
  border: 1px dashed var(--color-border);
  background: var(--color-bg-alt);
  transition: border-color 0.15s ease;

  &:hover {
    border-color: var(--color-primary);
  }

  .ant-upload {
    width: 100% !important;
  }

  .ant-btn {
    width: 100% !important;
    min-height: 40px;
    font-weight: 600;
  }
`;

export const UploadLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const UploadStatus = styled.span<{ $done?: boolean }>`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ $done }) => ($done ? '#059669' : 'var(--color-text-muted)')};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const SaveButtonWrap = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);

  .ant-btn {
    min-height: 44px;
    font-weight: 700;
    padding: 0 2rem;

    ${media.belowSm} {
      width: 100%;
    }
  }
`;
