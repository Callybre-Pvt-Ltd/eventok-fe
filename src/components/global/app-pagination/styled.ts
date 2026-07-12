import styled from 'styled-components';
import { media } from '@/theme';

export const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px 0;

  ${media.belowMd} {
    .ant-pagination-item,
    .ant-pagination-jump-prev,
    .ant-pagination-jump-next {
      min-width: 28px;
      height: 28px;
      line-height: 26px;
    }
  }
`;
