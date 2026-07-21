import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Button,
  HorizontalRail,
  landingStoryArc,
  SectionShell,
  StoryHeader,
  VendorTile,
} from '@/design-system';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { ROUTES } from '@/constants/routes';
import { useFeaturedVendorsRail } from './helper';
import { HeaderRow } from './styled';

const pattern = landingStoryArc[8];

export function FeaturedVendorsRail() {
  const { t } = useTranslation();
  const { vendors, isLoading, error, refetch } = useFeaturedVendorsRail();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <SectionShell pattern={pattern} id="featured-vendors">
      <HeaderRow>
        <StoryHeader
          eyebrow={t('landing.featuredTitle')}
          title={t('landing.featuredSubtitle')}
        />
        <Link to={ROUTES.SERVICES}>
          <Button tone="outline" size="md">
            {t('common.viewAll')}
          </Button>
        </Link>
      </HeaderRow>
      <HorizontalRail>
        {vendors.map(vendor => (
          <VendorTile
            key={vendor.id}
            vendor={vendor}
            to={ROUTES.SERVICES}
            featured
          />
        ))}
      </HorizontalRail>
    </SectionShell>
  );
}
