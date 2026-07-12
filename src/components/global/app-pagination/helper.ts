import { useCallback, useState } from 'react';

export function useAppPagination(total: number, pageSize = 10) {
  const [page, setPage] = useState(1);

  const onChange = useCallback((next: number) => {
    setPage(next);
  }, []);

  return { page, pageSize, total, onChange };
}
