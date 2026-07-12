import type { User, UserRole, Session, ServiceResponse } from '@/types';
import { mockUsers, DEMO_PASSWORD } from '@/mock';
import { delay } from '@/utils/delay';

const SESSION_KEY = 'eventok_session';

let users = [...mockUsers];

export const authService = {
  async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<Session>> {
    await delay();
    if (password !== DEMO_PASSWORD) {
      return { data: null, error: 'Invalid credentials' };
    }
    const user = users.find(u => u.email === email);
    if (!user) return { data: null, error: 'User not found' };
    const session: Session = { user, token: `mock-token-${user.id}` };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { data: session, error: null };
  },

  async register(payload: {
    email: string;
    password: string;
    name: string;
    city: string;
    role: UserRole;
  }): Promise<ServiceResponse<Session>> {
    await delay();
    if (payload.password !== DEMO_PASSWORD && payload.password.length < 6) {
      return { data: null, error: 'Password must be at least 6 characters' };
    }
    if (users.find(u => u.email === payload.email)) {
      return { data: null, error: 'Email already registered' };
    }
    const user: User = {
      id: `u-${Date.now()}`,
      email: payload.email,
      name: payload.name,
      city: payload.city,
      role: payload.role,
      vendorStatus: payload.role === 'vendor' ? 'pending' : undefined,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    const session: Session = { user, token: `mock-token-${user.id}` };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { data: session, error: null };
  },

  async getSession(): Promise<ServiceResponse<Session>> {
    await delay(200);
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return { data: null, error: null };
    const session = JSON.parse(raw) as Session;
    const fresh = users.find(u => u.id === session.user.id);
    if (!fresh) {
      localStorage.removeItem(SESSION_KEY);
      return { data: null, error: null };
    }
    return { data: { ...session, user: fresh }, error: null };
  },

  async logout(): Promise<void> {
    await delay(100);
    localStorage.removeItem(SESSION_KEY);
  },

  getUsers() {
    return users;
  },
};
