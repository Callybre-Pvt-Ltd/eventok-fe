import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { EmptyState } from '@/components/global/empty-state';
import { useAdminApprovals } from './helper';
import { usePortalPalette } from '@/components/ui/portal-primitives/helper';
import {
  Actions,
  ItemMeta,
  ItemTitle,
  List,
  ListItem,
  PageTitle,
} from './styled';

export default function AdminApprovalsPage() {
  const { t } = useTranslation();
  const { palette } = usePortalPalette();
  const { pending, isLoading, approve, reject } = useAdminApprovals();
  if (isLoading) return <LoadingState />;
  return (
    <>
      <PageTitle $palette={palette}>{t('admin.approvals')}</PageTitle>
      {pending.length === 0 ? (
        <EmptyState description={t('admin.noPending')} />
      ) : (
        <List>
          {pending.map(v => (
            <ListItem $palette={palette} key={v.id}>
              <ItemTitle $palette={palette}>{v.businessName}</ItemTitle>
              <ItemMeta $palette={palette}>
                {v.city} · {v.experience}y exp
              </ItemMeta>
              <Actions>
                <Button type="primary" onClick={() => approve(v.id)}>
                  {t('admin.approve')}
                </Button>
                <Button danger onClick={() => reject(v.id)}>
                  {t('admin.reject')}
                </Button>
              </Actions>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
