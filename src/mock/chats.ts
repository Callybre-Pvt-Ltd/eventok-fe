import type { Message, ChatThread } from '@/types';

export const mockThreads: ChatThread[] = [
  {
    id: 't-1',
    participantId: 'u-admin-1',
    participantRole: 'admin',
    participantName: 'EventOK Admin',
    lastMessage: 'We have shortlisted 2 vendors for your event.',
    updatedAt: '2026-03-05T09:00:00Z',
    unread: 1,
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm-1',
    threadId: 't-1',
    senderId: 'u-customer-1',
    senderRole: 'customer',
    content: 'Hi, I submitted a booking request for my wedding.',
    type: 'text',
    createdAt: '2026-03-04T10:00:00Z',
    read: true,
  },
  {
    id: 'm-2',
    threadId: 't-1',
    senderId: 'u-admin-1',
    senderRole: 'admin',
    content:
      'Thank you! We are reviewing your request and will shortlist vendors shortly.',
    type: 'text',
    createdAt: '2026-03-04T11:00:00Z',
    read: true,
  },
  {
    id: 'm-3',
    threadId: 't-1',
    senderId: 'u-admin-1',
    senderRole: 'admin',
    content: 'We have shortlisted 2 vendors for your event.',
    type: 'text',
    createdAt: '2026-03-05T09:00:00Z',
    read: false,
  },
];
