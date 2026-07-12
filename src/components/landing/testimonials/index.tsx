import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { useTheme } from '@/theme';
import {
  fadeUp,
  MotionDiv,
  staggerContainer,
  viewportOnce,
} from '@/utils/motion';
import { useTestimonials } from './helper';
import {
  Author,
  AuthorEvent,
  AuthorInfo,
  AuthorName,
  Avatar,
  Grid,
  Quote,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
  Stars,
  TestimonialCard,
} from './styled';

export function Testimonials() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { reviews, isLoading, error, refetch } = useTestimonials();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <Section $palette={palette} $alt>
      <SectionInner>
        <SectionHeader>
          <SectionEyebrow $palette={palette}>
            {t('landing.testimonialsEyebrow')}
          </SectionEyebrow>
          <SectionTitle $palette={palette}>
            {t('landing.testimonialsTitle')}
          </SectionTitle>
          <SectionSubtitle $palette={palette}>
            {t('landing.testimonialsSubtitle')}
          </SectionSubtitle>
        </SectionHeader>
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Grid>
            {reviews.map(review => (
              <MotionDiv key={review.id} variants={fadeUp}>
                <TestimonialCard $palette={palette}>
                  <Stars $palette={palette}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </Stars>
                  <Quote $palette={palette}>
                    &ldquo;{review.comment}&rdquo;
                  </Quote>
                  <Author>
                    <Avatar $palette={palette}>
                      {review.customerName.charAt(0)}
                    </Avatar>
                    <AuthorInfo>
                      <AuthorName $palette={palette}>
                        {review.customerName}
                      </AuthorName>
                      <AuthorEvent $palette={palette}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </AuthorEvent>
                    </AuthorInfo>
                  </Author>
                </TestimonialCard>
              </MotionDiv>
            ))}
          </Grid>
        </MotionDiv>
      </SectionInner>
    </Section>
  );
}
