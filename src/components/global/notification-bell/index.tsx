import { Popover } from 'antd';
import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import type { UserRole } from '@/types';
import { relativeTime } from '@/utils/relative-time';
import { notificationTarget, useNotificationBell } from './helper';
import {
  Badge,
  BellButton,
  Dot,
  EmptyRow,
  Item,
  ItemBody,
  ItemText,
  ItemTime,
  ItemTitle,
  List,
  MarkAllButton,
  Panel,
  PanelHeader,
  PanelTitle,
} from './styled';

interface NotificationBellProps {
  role: UserRole;
}

const MAX_BADGE_COUNT = 9;

/** Header bell with an unread badge and a dropdown feed; a booking alert opens the
 *  bookings page for the signed-in role. */
export function NotificationBell({ role }: NotificationBellProps) {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const {
    notifications,
    unreadCount,
    open,
    setOpen,
    openNotification,
    markAllRead,
  } = useNotificationBell(role);

  const panel = (
    <Panel $palette={palette}>
      <PanelHeader>
        <PanelTitle $palette={palette}>{t('notifications.title')}</PanelTitle>
        {unreadCount > 0 && (
          <MarkAllButton type="button" onClick={markAllRead}>
            {t('notifications.markAllRead')}
          </MarkAllButton>
        )}
      </PanelHeader>
      {notifications.length === 0 ? (
        <EmptyRow>{t('notifications.empty')}</EmptyRow>
      ) : (
        <List>
          {notifications.map(notification => (
            <Item
              key={notification.id}
              $unread={!notification.read}
              $clickable={Boolean(notificationTarget(notification, role))}
              onClick={() => openNotification(notification)}
            >
              <Dot $unread={!notification.read} />
              <ItemBody>
                <ItemTitle $palette={palette}>{notification.title}</ItemTitle>
                <ItemText>{notification.body}</ItemText>
                <ItemTime>{relativeTime(notification.createdAt)}</ItemTime>
              </ItemBody>
            </Item>
          ))}
        </List>
      )}
    </Panel>
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger="click"
      placement="bottomRight"
      content={panel}
      styles={{ content: { padding: 0 } }}
    >
      <BellButton
        $palette={palette}
        type="button"
        aria-label={t('notifications.title')}
      >
        <Bell size={19} />
        {unreadCount > 0 && (
          <Badge>
            {unreadCount > MAX_BADGE_COUNT
              ? `${MAX_BADGE_COUNT}+`
              : unreadCount}
          </Badge>
        )}
      </BellButton>
    </Popover>
  );
}
