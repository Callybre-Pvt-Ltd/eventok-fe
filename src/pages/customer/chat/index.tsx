import { Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useCustomerChat } from './helper';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import {
  ChatInput,
  ChatWrap,
  MessageBubble,
  Messages,
  PageTitle,
} from './styled';

export default function CustomerChatPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { messages, message, setMessage, send, isLoading, userId } =
    useCustomerChat();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('customer.chatWithAdmin')}</PageTitle>
      <ChatWrap>
        <Messages $palette={palette}>
          {messages.length === 0 && (
            <EmptyState description={t('customer.noMessages')} />
          )}
          {messages.map(m => (
            <MessageBubble
              key={m.id}
              $palette={palette}
              $own={m.senderId === userId}
            >
              {m.content}
            </MessageBubble>
          ))}
        </Messages>
        <ChatInput>
          <Input
            value={message}
            onChange={e => setMessage(e.target.value)}
            onPressEnter={send}
            placeholder={t('customer.chat')}
          />
          <Button type="primary" onClick={send}>
            {t('common.submit')}
          </Button>
        </ChatInput>
      </ChatWrap>
    </>
  );
}
