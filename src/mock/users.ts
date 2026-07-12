import type { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'u-admin-1',
    email: 'admin@eventok.demo',
    name: 'Admin User',
    role: 'admin',
    city: 'Mumbai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    createdAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'u-vendor-1',
    email: 'vendor@eventok.demo',
    name: 'Priya Events',
    role: 'vendor',
    city: 'Mumbai',
    vendorStatus: 'approved',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vendor1',
    createdAt: '2025-01-15T00:00:00Z',
  },
  {
    id: 'u-vendor-2',
    email: 'pending@eventok.demo',
    name: 'New Vendor Co',
    role: 'vendor',
    city: 'Pune',
    vendorStatus: 'pending',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=vendor2',
    createdAt: '2026-03-01T00:00:00Z',
  },
  {
    id: 'u-customer-1',
    email: 'customer@eventok.demo',
    name: 'Rahul Sharma',
    role: 'customer',
    city: 'Mumbai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer1',
    createdAt: '2025-02-01T00:00:00Z',
  },
];

export const DEMO_PASSWORD = 'demo123';
