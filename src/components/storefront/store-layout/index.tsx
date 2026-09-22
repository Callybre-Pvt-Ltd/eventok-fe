import type { ReactNode } from 'react';
import { StoreFooter } from '@/components/storefront/store-footer';
import { StoreHeader } from '@/components/storefront/store-header';
import { Main, Shell } from './styled';

export function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <Shell>
      <StoreHeader />
      <Main id="main-content">{children}</Main>
      <StoreFooter />
    </Shell>
  );
}
