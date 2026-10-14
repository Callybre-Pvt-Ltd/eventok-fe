import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/utils/storefront/pricing';
import { usePdpAddons } from './helper';
import {
  Description,
  List,
  Name,
  Price,
  Row,
  RowMain,
  Subtitle,
  Title,
  Wrap,
} from './styled';

interface PdpAddonsProps {
  serviceId: string;
}

/** Optional extras the vendor attached to this service — shown so shoppers can see
 *  everything on offer before they book. */
export function PdpAddons({ serviceId }: PdpAddonsProps) {
  const { t } = useTranslation();
  const { addons } = usePdpAddons(serviceId);

  if (!addons.length) return null;

  return (
    <Wrap>
      <Title>{t('storefront.addonsTitle')}</Title>
      <Subtitle>{t('storefront.addonsSubtitle')}</Subtitle>
      <List>
        {addons.map(addon => (
          <Row key={addon.id}>
            <RowMain>
              <Name>{addon.name}</Name>
              {addon.description && (
                <Description>{addon.description}</Description>
              )}
            </RowMain>
            <Price>{formatPrice(Number(addon.price) || 0)}</Price>
          </Row>
        ))}
      </List>
    </Wrap>
  );
}
