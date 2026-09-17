import { useState } from 'react';

export function usePdpGallery(total: number) {
  const [index, setIndex] = useState(0);
  const safeIndex = total > 0 ? Math.min(index, total - 1) : 0;
  return { index: safeIndex, setIndex };
}
