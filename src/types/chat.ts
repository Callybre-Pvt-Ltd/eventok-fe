import type { UserRole } from './user';

export interface ChatThread {
  id: string;
  participantId: string;
  participantRole: UserRole;
  participantName: string;
  lastMessage: string;
  updatedAt: string;
  unread: number;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderRole: UserRole;
  content: string;
  type: 'text' | 'image' | 'pdf';
  createdAt: string;
  read: boolean;
}
