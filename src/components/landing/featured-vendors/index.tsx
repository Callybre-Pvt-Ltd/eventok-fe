import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { VendorCard } from '@/components/ui/vendor-card';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import {
  fadeUp,
  MotionDiv,
  staggerContainer,
  viewportOnce,
} from '@/utils/motion';
import { useFeaturedVendors } from './helper';
import {
  Grid,
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
  ViewAllLink,
} from './styled';

export function FeaturedVendors() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { vendors, isLoading, error, refetch } = useFeaturedVendors();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <Section $palette={palette} $alt>
      <SectionInner>
        <SectionHeader>
          <SectionTitle $palette={palette}>
            {t('landing.featuredTitle')}
          </SectionTitle>
          <SectionSubtitle $palette={palette}>
            {t('landing.featuredSubtitle')}
          </SectionSubtitle>
        </SectionHeader>
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Grid>
            {vendors.map(vendor => (
              <MotionDiv key={vendor.id} variants={fadeUp}>
                <VendorCard vendor={vendor} />
              </MotionDiv>
            ))}
          </Grid>
        </MotionDiv>
        <ViewAllLink>
          <Link to={ROUTES.VENDORS}>
            <Button variant="outline">{t('common.viewAll')}</Button>
          </Link>
        </ViewAllLink>
      </SectionInner>
    </Section>
  );
}
