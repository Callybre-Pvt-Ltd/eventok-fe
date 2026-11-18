import test from 'node:test';
import assert from 'node:assert';

// ── Inlined Logic Under Test (Mirrors src/routes/helper.ts & src/components/global/portal-layout/helper.ts) ──

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  VENDOR_DASHBOARD: '/vendor/dashboard',
  VENDOR_PENDING: '/vendor/pending',
};

function getPostAuthPath(role, vendorStatus) {
  if (role === 'admin' || role === 'super_admin') return ROUTES.ADMIN_DASHBOARD;
  if (role === 'vendor') {
    return vendorStatus === 'approved'
      ? ROUTES.VENDOR_DASHBOARD
      : ROUTES.VENDOR_PENDING;
  }
  return ROUTES.HOME;
}

function checkRouteAccess(user, roles, allowPendingVendor = false) {
  if (!user) {
    return { allowed: false, redirectTo: ROUTES.LOGIN };
  }

  const isVendorRoute = Boolean(roles && roles.includes('vendor'));

  const isAuthorizedForVendor =
    isVendorRoute &&
    (user.role === 'vendor' ||
      (Boolean(user.vendorId) &&
        (user.role === 'admin' || user.role === 'super_admin')));

  const isAuthorizedByPrimaryRole = Boolean(roles && roles.includes(user.role));

  if (roles && !isAuthorizedByPrimaryRole && !isAuthorizedForVendor) {
    return {
      allowed: false,
      redirectTo: getPostAuthPath(user.role, user.vendorStatus),
    };
  }

  if (
    isVendorRoute &&
    user.vendorStatus !== 'approved' &&
    !allowPendingVendor
  ) {
    return { allowed: false, redirectTo: ROUTES.VENDOR_PENDING };
  }

  return { allowed: true };
}

function getEffectivePortalRole(routeRole, userRole) {
  return routeRole === 'admin'
    ? userRole === 'super_admin'
      ? 'super_admin'
      : 'admin'
    : routeRole;
}

// ── Tests ──

test('TC-1: Normal approved VENDOR accessing vendor routes is allowed', () => {
  const user = {
    id: 'u1',
    role: 'vendor',
    vendorId: 'v1',
    vendorStatus: 'approved',
  };
  const res = checkRouteAccess(user, ['vendor']);
  assert.strictEqual(res.allowed, true);
});

test('TC-2: Normal pending VENDOR accessing vendor routes is redirected to pending unless allowed', () => {
  const user = {
    id: 'u1',
    role: 'vendor',
    vendorId: 'v1',
    vendorStatus: 'pending',
  };
  const blocked = checkRouteAccess(user, ['vendor'], false);
  assert.strictEqual(blocked.allowed, false);
  assert.strictEqual(blocked.redirectTo, ROUTES.VENDOR_PENDING);

  const allowed = checkRouteAccess(user, ['vendor'], true);
  assert.strictEqual(allowed.allowed, true);
});

test('TC-3: Normal VENDOR attempting to access admin routes is rejected and redirected', () => {
  const user = {
    id: 'u1',
    role: 'vendor',
    vendorId: 'v1',
    vendorStatus: 'approved',
  };
  const res = checkRouteAccess(user, ['admin', 'super_admin']);
  assert.strictEqual(res.allowed, false);
  assert.strictEqual(res.redirectTo, ROUTES.VENDOR_DASHBOARD);
});

test('TC-4: Normal ADMIN accessing admin routes is allowed', () => {
  const user = { id: 'u2', role: 'admin' };
  const res = checkRouteAccess(user, ['admin', 'super_admin']);
  assert.strictEqual(res.allowed, true);
});

test('TC-5: Normal ADMIN without vendor profile attempting to access vendor routes is rejected', () => {
  const user = { id: 'u2', role: 'admin' };
  const res = checkRouteAccess(user, ['vendor']);
  assert.strictEqual(res.allowed, false);
  assert.strictEqual(res.redirectTo, ROUTES.ADMIN_DASHBOARD);
});

test('TC-6: Normal SUPER_ADMIN without vendor profile accessing vendor routes is rejected', () => {
  const user = { id: 'u3', role: 'super_admin' };
  const res = checkRouteAccess(user, ['vendor']);
  assert.strictEqual(res.allowed, false);
  assert.strictEqual(res.redirectTo, ROUTES.ADMIN_DASHBOARD);
});

test('TC-7: DUAL-ROLE SUPER_ADMIN with approved vendor profile accessing vendor routes IS ALLOWED', () => {
  const user = {
    id: 'u4',
    role: 'super_admin',
    vendorId: 'v4',
    vendorStatus: 'approved',
  };
  const res = checkRouteAccess(user, ['vendor']);
  assert.strictEqual(res.allowed, true);
  assert.strictEqual(res.redirectTo, undefined);
});

test('TC-8: DUAL-ROLE SUPER_ADMIN with approved vendor profile accessing admin routes IS STILL ALLOWED', () => {
  const user = {
    id: 'u4',
    role: 'super_admin',
    vendorId: 'v4',
    vendorStatus: 'approved',
  };
  const res = checkRouteAccess(user, ['admin', 'super_admin']);
  assert.strictEqual(res.allowed, true);
});

test('TC-9: DUAL-ROLE ADMIN with approved vendor profile accessing vendor routes IS ALLOWED', () => {
  const user = {
    id: 'u5',
    role: 'admin',
    vendorId: 'v5',
    vendorStatus: 'approved',
  };
  const res = checkRouteAccess(user, ['vendor']);
  assert.strictEqual(res.allowed, true);
});

test('TC-10: Unauthorized CLIENT is rejected from vendor and admin routes', () => {
  const user = { id: 'u6', role: 'customer' };
  const vendorRes = checkRouteAccess(user, ['vendor']);
  assert.strictEqual(vendorRes.allowed, false);
  assert.strictEqual(vendorRes.redirectTo, ROUTES.HOME);

  const adminRes = checkRouteAccess(user, ['admin', 'super_admin']);
  assert.strictEqual(adminRes.allowed, false);
  assert.strictEqual(adminRes.redirectTo, ROUTES.HOME);
});

test('TC-11: Unauthenticated session redirects to LOGIN', () => {
  const res = checkRouteAccess(null, ['vendor']);
  assert.strictEqual(res.allowed, false);
  assert.strictEqual(res.redirectTo, ROUTES.LOGIN);
});

test('TC-12: PortalLayout role resolution respects selected route portal role', () => {
  // When a SUPER_ADMIN is viewing the vendor portal (route role = 'vendor'), layout renders as 'vendor'
  assert.strictEqual(getEffectivePortalRole('vendor', 'super_admin'), 'vendor');

  // When an ADMIN is viewing the vendor portal, layout renders as 'vendor'
  assert.strictEqual(getEffectivePortalRole('vendor', 'admin'), 'vendor');

  // When a standard VENDOR is viewing vendor portal, layout renders as 'vendor'
  assert.strictEqual(getEffectivePortalRole('vendor', 'vendor'), 'vendor');

  // When a SUPER_ADMIN is viewing admin portal, layout renders as 'super_admin'
  assert.strictEqual(
    getEffectivePortalRole('admin', 'super_admin'),
    'super_admin',
  );

  // When an ADMIN is viewing admin portal, layout renders as 'admin'
  assert.strictEqual(getEffectivePortalRole('admin', 'admin'), 'admin');
});
