import { Pagination } from 'antd';
import { PaginationWrap } from './styled';

interface AppPaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

export function AppPagination({
  current,
  total,
  pageSize = 10,
  onChange,
}: AppPaginationProps) {
  if (total <= pageSize) return null;

  return (
    <PaginationWrap>
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
      />
    </PaginationWrap>
  );
}
