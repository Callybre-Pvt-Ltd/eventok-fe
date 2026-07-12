import type { ChatThread, Message, ServiceResponse } from '@/types';
import { mockThreads, mockMessages } from '@/mock';
import { delay } from '@/utils/delay';

let threads = [...mockThreads];
let messages = [...mockMessages];

export const chatService = {
  async getThreads(userId: string): Promise<ServiceResponse<ChatThread[]>> {
    await delay();
    const userThreads = threads.filter(
      t => t.participantId === userId || t.id.startsWith('t-'),
    );
    return { data: userThreads, error: null };
  },

  async getMessages(threadId: string): Promise<ServiceResponse<Message[]>> {
    await delay();
    return {
      data: messages.filter(m => m.threadId === threadId),
      error: null,
    };
  },

  async sendMessage(payload: {
    threadId: string;
    senderId: string;
    senderRole: Message['senderRole'];
    content: string;
  }): Promise<ServiceResponse<Message>> {
    await delay();
    const message: Message = {
      id: `m-${Date.now()}`,
      threadId: payload.threadId,
      senderId: payload.senderId,
      senderRole: payload.senderRole,
      content: payload.content,
      type: 'text',
      createdAt: new Date().toISOString(),
      read: false,
    };
    messages.push(message);
    const tIdx = threads.findIndex(t => t.id === payload.threadId);
    if (tIdx !== -1) {
      threads[tIdx] = {
        ...threads[tIdx],
        lastMessage: payload.content,
        updatedAt: message.createdAt,
      };
    }
    return { data: message, error: null };
  },

  async getOrCreateAdminThread(
    userId: string,
    userName: string,
    role: 'customer' | 'vendor',
  ): Promise<ServiceResponse<ChatThread>> {
    await delay();
    let thread = threads.find(t => t.participantId === userId);
    if (!thread) {
      thread = {
        id: `t-${Date.now()}`,
        participantId: userId,
        participantRole: role,
        participantName: userName,
        lastMessage: '',
        updatedAt: new Date().toISOString(),
        unread: 0,
      };
      threads.push(thread);
    }
    return { data: thread, error: null };
  },
};
