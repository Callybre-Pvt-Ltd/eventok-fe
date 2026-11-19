import styled from 'styled-components';
import { Form, InputNumber } from 'antd';
import { fontSizes, spacing } from '@/theme';

export const Intro = styled.p`
  color: var(--color-text-secondary);
  margin-bottom: ${spacing.lg};
  font-size: ${fontSizes.sm};
`;

export const FullWidthNumber = styled(InputNumber)`
  width: 100%;
`;

export const FailedNotice = styled.div`
  margin-bottom: ${spacing.md};
`;

export const ActionsItem = styled(Form.Item)`
  margin-bottom: 0;
  margin-top: ${spacing.lg};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: ${spacing.sm};

  @media (max-width: 576px) {
    flex-direction: column-reverse;
    align-items: stretch;

    .ant-btn {
      width: 100% !important;
      min-height: 44px;
    }
  }
`;

export const ScrollBody = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding-right: ${spacing.xs};
`;
