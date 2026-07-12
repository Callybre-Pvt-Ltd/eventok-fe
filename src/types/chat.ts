export interface ChatThread {
  id: string;
  participantId: string;
  participantRole: 'admin' | 'customer' | 'vendor';
  participantName: string;
  lastMessage: string;
  updatedAt: string;
  unread: number;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  senderRole: 'admin' | 'customer' | 'vendor';
  content: string;
  type: 'text' | 'image' | 'pdf';
  createdAt: string;
  read: boolean;
}
