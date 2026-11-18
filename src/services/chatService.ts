import { apiRequest, apiRequestPaginated, ApiError } from '@/api/client';
import type { ChatThread, Message, ServiceResponse, UserRole } from '@/types';

interface ApiChatRoom {
  id: string;
  enquiry_id: string | null;
  booking_id: string | null;
  vendor_id: string | null;
  client_id: string | null;
  client_name: string | null;
  vendor_business_name: string | null;
  last_message: string | null;
  last_message_at: string | null;
  unread_count: number;
  created_at: string;
  updated_at: string;
}

interface ApiChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  attachment_id: string | null;
  message: string | null;
  read_at: string | null;
  created_at: string;
}

const wrap = async <T>(fn: () => Promise<T>): Promise<ServiceResponse<T>> => {
  try {
    return { data: await fn(), error: null };
  } catch (error) {
    const message =
      error instanceof ApiError ? error.message : 'Request failed';
    return { data: null, error: message };
  }
};

const mapRoom = (r: ApiChatRoom): ChatThread => ({
  id: r.id,
  participantId: r.vendor_id ?? r.client_id ?? 'system',
  participantRole: r.vendor_id ? 'vendor' : 'customer',
  participantName: r.vendor_business_name ?? r.client_name ?? 'EventOK Support',
  lastMessage: r.last_message ?? '',
  updatedAt: r.last_message_at ?? r.updated_at ?? r.created_at,
  unread: r.unread_count ?? 0,
});

const mapMessage = (
  m: ApiChatMessage,
  fallbackRole: UserRole = 'customer',
): Message => ({
  id: m.id,
  threadId: m.room_id,
  senderId: m.sender_id,
  senderRole: fallbackRole,
  content: m.message ?? '',
  type: m.attachment_id ? 'image' : 'text',
  createdAt: m.created_at,
  read: Boolean(m.read_at),
});

export const chatService = {
  async getThreads(_userId?: string): Promise<ServiceResponse<ChatThread[]>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiChatRoom>('/chat/rooms', {
        query: { page: 1, page_size: 50 },
      });
      return page.items.map(mapRoom);
    });
  },

  async getOrCreateAdminThread(
    userId: string,
    _userName: string,
    _role: UserRole,
  ): Promise<ServiceResponse<ChatThread>> {
    return wrap(async () => {
      const page = await apiRequestPaginated<ApiChatRoom>('/chat/rooms', {
        query: { page: 1, page_size: 1 },
      });
      if (page.items.length > 0) {
        return mapRoom(page.items[0]);
      }
      return {
        id: `room-${userId}`,
        participantId: 'support',
        participantRole: 'admin',
        participantName: 'EventOK Support',
        lastMessage: '',
        updatedAt: new Date().toISOString(),
        unread: 0,
      };
    });
  },

  async getMessages(threadId: string): Promise<ServiceResponse<Message[]>> {
    return wrap(async () => {
      if (!threadId || threadId.startsWith('room-')) return [];
      const page = await apiRequestPaginated<ApiChatMessage>(
        `/chat/rooms/${threadId}/messages`,
        { query: { page: 1, page_size: 100 } },
      );
      return page.items.map(m => mapMessage(m));
    });
  },

  async sendMessage(payload: {
    threadId: string;
    senderId: string;
    senderRole: UserRole;
    content: string;
  }): Promise<ServiceResponse<Message>> {
    return wrap(async () => {
      if (!payload.threadId || payload.threadId.startsWith('room-')) {
        throw new ApiError('No active chat room found', 'NOT_FOUND', 404);
      }
      const created = await apiRequest<ApiChatMessage>(
        `/chat/rooms/${payload.threadId}/messages`,
        {
          method: 'POST',
          body: { message: payload.content },
        },
      );
      return mapMessage(created, payload.senderRole);
    });
  },
};
