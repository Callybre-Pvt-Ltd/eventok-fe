import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { PortalLayout } from '@/components/global/portal-layout';
import { StoreOutlet } from '@/components/storefront/store-outlet';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { ScrollToTop } from '@/routes/ScrollToTop';

import HomePage from '@/pages/home';
import ShopPage from '@/pages/shop';
import ProductPage from '@/pages/product';
import PackagesPage from '@/pages/packages';
import PackageBuilderPage from '@/pages/package-builder';
import PackageDetailPage from '@/pages/package-detail';
import CartPage from '@/pages/cart';
import CheckoutPage from '@/pages/checkout';
import WishlistPage from '@/pages/wishlist';
import AboutPage from '@/pages/about';
import ContactPage from '@/pages/contact';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import AuthContinuePage from '@/pages/auth-continue';
import SsoCallbackPage from '@/pages/sso-callback';
import ForgotPasswordPage from '@/pages/forgot-password';
import VendorLoginPage from '@/pages/vendor-login';

import CustomerBookingsPage from '@/pages/customer/bookings';
import CustomerChatPage from '@/pages/customer/chat';
import CustomerPaymentsPage from '@/pages/customer/payments';
import CustomerNotificationsPage from '@/pages/customer/notifications';
import CustomerProfilePage from '@/pages/customer/profile';

import VendorDashboardPage from '@/pages/vendor/dashboard';
import VendorServicesPage from '@/pages/vendor/services';
import ServiceWizardPage from '@/pages/vendor/services/wizard';
import VendorPackagesPage from '@/pages/vendor/packages';
import VendorBookingsPage from '@/pages/vendor/bookings';
import VendorEarningsPage from '@/pages/vendor/earnings';
import VendorProfilePage from '@/pages/vendor/profile';
import VendorPendingPage from '@/pages/vendor/pending';

import AdminDashboardPage from '@/pages/admin/dashboard';
import AdminApprovalsPage from '@/pages/admin/approvals';
import AdminCustomersPage from '@/pages/admin/customers';
import AdminVendorsPage from '@/pages/admin/vendors';
import AdminCategoriesPage from '@/pages/admin/categories';
import AdminBookingsPage from '@/pages/admin/bookings';
import AdminPaymentsPage from '@/pages/admin/payments';
import AdminRefundsPage from '@/pages/admin/refunds';
import AdminServicesPage from '@/pages/admin/services';
import AdminLocationsPage from '@/pages/admin/locations';
import AdminReportsPage from '@/pages/admin/reports';
import AdminAnalyticsPage from '@/pages/admin/analytics';
import AdminSettingsPage from '@/pages/admin/settings';

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public storefront */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.SHOP} element={<ShopPage />} />
        <Route path={ROUTES.SHOP_CATEGORY} element={<ShopPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
        <Route path={ROUTES.PACKAGES} element={<PackagesPage />} />
        <Route path={ROUTES.PACKAGE_BUILDER} element={<PackageBuilderPage />} />
        <Route path={ROUTES.PACKAGE_DETAIL} element={<PackageDetailPage />} />
        <Route path={ROUTES.CART} element={<CartPage />} />
        <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
        <Route path={ROUTES.WISHLIST} element={<WishlistPage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />

        {/* Legacy orange discovery → storefront */}
        <Route
          path={ROUTES.SERVICES}
          element={<Navigate to={ROUTES.SHOP} replace />}
        />
        <Route
          path={ROUTES.SERVICE_DETAIL}
          element={<Navigate to={ROUTES.SHOP} replace />}
        />
        <Route
          path={ROUTES.CATEGORIES}
          element={<Navigate to={ROUTES.SHOP} replace />}
        />
        <Route
          path={ROUTES.VENDORS}
          element={<Navigate to={ROUTES.SHOP} replace />}
        />
        <Route
          path={ROUTES.VENDOR_DETAIL}
          element={<Navigate to={ROUTES.SHOP} replace />}
        />
        <Route
          path={ROUTES.TESTIMONIALS}
          element={
            <Navigate
              to={{ pathname: ROUTES.HOME, hash: '#previous-work' }}
              replace
            />
          }
        />
        <Route
          path={ROUTES.FAQ}
          element={
            <Navigate to={{ pathname: ROUTES.HOME, hash: '#faq' }} replace />
          }
        />

        {/* Auth */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        {/* Old onboarding links: profiles are now created silently on sign-in. */}
        <Route
          path={ROUTES.ONBOARDING}
          element={<Navigate to={ROUTES.AUTH_CONTINUE} replace />}
        />
        <Route path={ROUTES.AUTH_CONTINUE} element={<AuthContinuePage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.SSO_CALLBACK} element={<SsoCallbackPage />} />
        <Route path={ROUTES.VENDOR_LOGIN} element={<VendorLoginPage />} />

        {/* Signed-in shopper pages — part of the website, not a portal. Open to every
            signed-in role, because anyone may buy on the marketplace and therefore needs
            somewhere to see their own bookings, payments and chats. */}
        <Route
          path={ROUTES.CUSTOMER}
          element={
            <ProtectedRoute>
              <StoreOutlet />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to={ROUTES.CUSTOMER_BOOKINGS} replace />}
          />
          <Route
            path="dashboard"
            element={<Navigate to={ROUTES.CUSTOMER_BOOKINGS} replace />}
          />
          <Route path="bookings" element={<CustomerBookingsPage />} />
          <Route path="chat" element={<CustomerChatPage />} />
          <Route path="payments" element={<CustomerPaymentsPage />} />
          <Route path="notifications" element={<CustomerNotificationsPage />} />
          <Route path="profile" element={<CustomerProfilePage />} />
        </Route>

        {/* Vendor portal */}
        <Route
          path={ROUTES.VENDOR_PENDING}
          element={
            <ProtectedRoute roles={['vendor']} allowPendingVendor>
              <VendorPendingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.VENDOR}
          element={
            <ProtectedRoute roles={['vendor']}>
              <PortalLayout role="vendor" />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to={ROUTES.VENDOR_DASHBOARD} replace />}
          />
          <Route path="dashboard" element={<VendorDashboardPage />} />
          <Route path="services" element={<VendorServicesPage />} />
          <Route path="services/new" element={<ServiceWizardPage />} />
          <Route
            path="services/:serviceId/edit"
            element={<ServiceWizardPage />}
          />
          <Route path="packages" element={<VendorPackagesPage />} />
          <Route path="bookings" element={<VendorBookingsPage />} />
          <Route path="earnings" element={<VendorEarningsPage />} />
          <Route path="profile" element={<VendorProfilePage />} />
        </Route>

        {/* Admin portal */}
        <Route
          path={ROUTES.ADMIN}
          element={
            <ProtectedRoute roles={['admin']}>
              <PortalLayout role="admin" />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to={ROUTES.ADMIN_DASHBOARD} replace />}
          />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="approvals" element={<AdminApprovalsPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="vendors" element={<AdminVendorsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="refunds" element={<AdminRefundsPage />} />
          <Route path="services" element={<AdminServicesPage />} />
          <Route path="locations" element={<AdminLocationsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
