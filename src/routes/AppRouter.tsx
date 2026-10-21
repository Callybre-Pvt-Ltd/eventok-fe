import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { PortalLayout } from '@/components/global/portal-layout';
import { StoreOutlet } from '@/components/storefront/store-outlet';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { ScrollToTop } from '@/routes/ScrollToTop';
import { LoadingState } from '@/components/global/loading-state';
import HomePage from '@/pages/home';
import ShopPage from '@/pages/shop';
import ProductPage from '@/pages/product';
import AuthContinuePage from '@/pages/auth-continue';
import SsoCallbackPage from '@/pages/sso-callback';

const PackagesPage = lazy(() => import('@/pages/packages'));
const PackageBuilderPage = lazy(() => import('@/pages/package-builder'));
const PackageDetailPage = lazy(() => import('@/pages/package-detail'));
const CartPage = lazy(() => import('@/pages/cart'));
const CheckoutPage = lazy(() => import('@/pages/checkout'));
const WishlistPage = lazy(() => import('@/pages/wishlist'));
const AboutPage = lazy(() => import('@/pages/about'));
const ContactPage = lazy(() => import('@/pages/contact'));
const LoginPage = lazy(() => import('@/pages/login'));
const RegisterPage = lazy(() => import('@/pages/register'));
const ForgotPasswordPage = lazy(() => import('@/pages/forgot-password'));

const CustomerBookingsPage = lazy(() => import('@/pages/customer/bookings'));
const CustomerChatPage = lazy(() => import('@/pages/customer/chat'));
const CustomerPaymentsPage = lazy(() => import('@/pages/customer/payments'));
const CustomerNotificationsPage = lazy(
  () => import('@/pages/customer/notifications'),
);
const CustomerProfilePage = lazy(() => import('@/pages/customer/profile'));

const VendorDashboardPage = lazy(() => import('@/pages/vendor/dashboard'));
const VendorServicesPage = lazy(() => import('@/pages/vendor/services'));
const ServiceWizardPage = lazy(() => import('@/pages/vendor/services/wizard'));
const VendorPackagesPage = lazy(() => import('@/pages/vendor/packages'));
const VendorBookingsPage = lazy(() => import('@/pages/vendor/bookings'));
const VendorEarningsPage = lazy(() => import('@/pages/vendor/earnings'));
const VendorProfilePage = lazy(() => import('@/pages/vendor/profile'));
const VendorPendingPage = lazy(() => import('@/pages/vendor/pending'));

const AdminDashboardPage = lazy(() => import('@/pages/admin/dashboard'));
const AdminApprovalsPage = lazy(() => import('@/pages/admin/approvals'));
const AdminCustomersPage = lazy(() => import('@/pages/admin/customers'));
const AdminVendorsPage = lazy(() => import('@/pages/admin/vendors'));
const AdminCategoriesPage = lazy(() => import('@/pages/admin/categories'));
const AdminBookingsPage = lazy(() => import('@/pages/admin/bookings'));
const AdminPaymentsPage = lazy(() => import('@/pages/admin/payments'));
const AdminRefundsPage = lazy(() => import('@/pages/admin/refunds'));
const AdminServicesPage = lazy(() => import('@/pages/admin/services'));
const AdminLocationsPage = lazy(() => import('@/pages/admin/locations'));
const AdminReportsPage = lazy(() => import('@/pages/admin/reports'));
const AdminAnalyticsPage = lazy(() => import('@/pages/admin/analytics'));
const AdminSettingsPage = lazy(() => import('@/pages/admin/settings'));

export function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Storefront entry pages load eagerly; everything else is split per route. */}
      <Suspense fallback={<LoadingState />}>
        <Routes>
          {/* Public storefront */}
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SHOP} element={<ShopPage />} />
          <Route path={ROUTES.SHOP_CATEGORY} element={<ShopPage />} />
          <Route path={ROUTES.PRODUCT} element={<ProductPage />} />
          <Route path={ROUTES.PACKAGES} element={<PackagesPage />} />
          <Route
            path={ROUTES.PACKAGE_BUILDER}
            element={<PackageBuilderPage />}
          />
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
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route path={ROUTES.SSO_CALLBACK} element={<SsoCallbackPage />} />
          <Route
            path={ROUTES.VENDOR_LOGIN}
            element={<Navigate to={ROUTES.LOGIN} replace />}
          />

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
            <Route
              path="notifications"
              element={<CustomerNotificationsPage />}
            />
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
      </Suspense>
    </BrowserRouter>
  );
}
