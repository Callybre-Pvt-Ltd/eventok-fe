import { Outlet } from 'react-router-dom';
import { StoreLayout } from '@/components/storefront/store-layout';
import { PageContainer } from './styled';

/**
 * Renders nested routes inside the normal storefront chrome.
 *
 * Shoppers have no portal: their bookings and account pages sit on the website
 * itself, with the same header, nav and footer as the rest of the shop. The container
 * supplies the page gutter these pages used to get from the portal shell.
 */
export function StoreOutlet() {
  return (
    <StoreLayout>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </StoreLayout>
  );
}
