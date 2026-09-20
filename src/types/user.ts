export type UserRole = 'admin' | 'vendor' | 'customer';

export type VendorStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  city: string;
  avatar?: string;
  vendorStatus?: VendorStatus;
  vendorId?: string;
  createdAt: string;
}

export interface Session {
  user: User;
}
