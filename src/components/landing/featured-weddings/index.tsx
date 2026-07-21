import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { ROUTES } from '@/constants/routes';
import { useTheme } from '@/theme';
import { fadeUp, MotionDiv, viewportOnce } from '@/utils/motion';
import { useFeaturedWeddings } from './helper';
import {
  CardBody,
  CardImage,
  CardMeta,
  CardTitle,
  ScrollTrack,
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
  WeddingCard,
} from './styled';

export function FeaturedWeddings() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { vendors, isLoading, error, refetch } = useFeaturedWeddings();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <Section $palette={palette} $alt>
      <SectionInner>
        <SectionHeader>
          <SectionTitle $palette={palette}>
            {t('landing.featuredWeddingsTitle')}
          </SectionTitle>
          <SectionSubtitle $palette={palette}>
            {t('landing.featuredWeddingsSubtitle')}
          </SectionSubtitle>
        </SectionHeader>
        <MotionDiv
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <ScrollTrack>
            {vendors.map(v => (
              <Link key={v.id} to={ROUTES.SERVICES}>
                <WeddingCard $palette={palette}>
                  <CardImage $url={v.portfolio[0]?.url} />
                  <CardBody>
                    <CardTitle $palette={palette}>
                      {v.tags[0] ?? v.categories[0] ?? 'Curated celebration'}
                    </CardTitle>
                    <CardMeta $palette={palette}>
                      ★ {v.rating} · {v.reviewCount} reviews
                    </CardMeta>
                  </CardBody>
                </WeddingCard>
              </Link>
            ))}
          </ScrollTrack>
        </MotionDiv>
      </SectionInner>
    </Section>
  );
}
