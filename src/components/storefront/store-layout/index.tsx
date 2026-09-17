import type { ReactNode } from 'react';
import { StoreFooter } from '@/components/storefront/store-footer';
import { StoreHeader } from '@/components/storefront/store-header';
import { SupportWidget } from '@/components/storefront/support-widget';
import { Main, Shell } from './styled';

export function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <Shell>
      <StoreHeader />
      <Main id="main-content">{children}</Main>
      <StoreFooter />
      <SupportWidget />
    </Shell>
  );
}
