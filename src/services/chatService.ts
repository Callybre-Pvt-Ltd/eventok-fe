import type { ChatThread, Message, ServiceResponse, UserRole } from '@/types';

const adminThread = (userId: string): ChatThread => ({
  id: `admin-${userId}`,
  participantId: 'admin',
  participantRole: 'admin',
  participantName: 'EventOK Support',
  lastMessage: '',
  updatedAt: new Date().toISOString(),
  unread: 0,
});

export const chatService = {
  async getThreads(_userId: string): Promise<ServiceResponse<ChatThread[]>> {
    return { data: [], error: null };
  },

  async getOrCreateAdminThread(
    userId: string,
    _userName: string,
    _role: UserRole,
  ): Promise<ServiceResponse<ChatThread>> {
    return { data: adminThread(userId), error: null };
  },

  async getMessages(_threadId: string): Promise<ServiceResponse<Message[]>> {
    return { data: [], error: null };
  },

  async sendMessage(payload: {
    threadId: string;
    senderId: string;
    senderRole: UserRole;
    content: string;
  }): Promise<ServiceResponse<Message>> {
    return {
      data: {
        id: `local-${Date.now()}`,
        threadId: payload.threadId,
        senderId: payload.senderId,
        senderRole: payload.senderRole,
        content: payload.content,
        type: 'text',
        createdAt: new Date().toISOString(),
        read: true,
      },
      error: null,
    };
  },
};
