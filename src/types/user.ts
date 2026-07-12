export type UserRole = 'admin' | 'vendor' | 'customer';

export type VendorStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  city: string;
  avatar?: string;
  vendorStatus?: VendorStatus;
  createdAt: string;
}

export interface Session {
  user: User;
  token: string;
}
