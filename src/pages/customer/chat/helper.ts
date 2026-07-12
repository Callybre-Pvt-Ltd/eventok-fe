import { useCallback, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth/use-auth';
import { chatService } from '@/services';
export function useCustomerChat() {
  const { session } = useAuth();
  const userId = session?.user.id ?? '';
  const userName = session?.user.name ?? '';
  const qc = useQueryClient();
  const [message, setMessage] = useState('');
  const threadQuery = useQuery({
    queryKey: ['chat-thread', userId],
    queryFn: () =>
      chatService.getOrCreateAdminThread(userId, userName, 'customer'),
    enabled: !!userId,
  });
  const threadId = threadQuery.data?.data?.id ?? '';
  const messagesQuery = useQuery({
    queryKey: ['messages', threadId],
    queryFn: () => chatService.getMessages(threadId),
    enabled: !!threadId,
  });
  const send = useCallback(async () => {
    if (!message.trim() || !threadId || !userId) return;
    await chatService.sendMessage({
      threadId,
      senderId: userId,
      senderRole: 'customer',
      content: message,
    });
    setMessage('');
    qc.invalidateQueries({ queryKey: ['messages', threadId] });
  }, [message, threadId, userId, qc]);
  return {
    messages: messagesQuery.data?.data ?? [],
    message,
    setMessage,
    send,
    isLoading: threadQuery.isLoading,
    userId,
  };
}
