import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { useTheme } from '@/theme';
import {
  fadeUp,
  MotionDiv,
  staggerContainer,
  viewportOnce,
} from '@/utils/motion';
import { getCategoryIcon, useCategoryGrid } from './helper';
import {
  CategoryCard,
  CategoryIcon,
  CategoryName,
  Grid,
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from './styled';

export function CategoryGrid() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { categories, isLoading, error, refetch } = useCategoryGrid();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState onRetry={() => refetch()} />;

  return (
    <Section $palette={palette}>
      <SectionInner>
        <SectionHeader>
          <SectionTitle $palette={palette}>
            {t('landing.categoriesTitle')}
          </SectionTitle>
          <SectionSubtitle $palette={palette}>
            {t('landing.categoriesSubtitle')}
          </SectionSubtitle>
        </SectionHeader>
        <MotionDiv
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Grid>
            {categories.map(cat => {
              const Icon = getCategoryIcon(cat.icon);
              return (
                <MotionDiv key={cat.id} variants={fadeUp}>
                  <CategoryCard
                    $palette={palette}
                    to={`${ROUTES.SERVICES}?type=${cat.slug}`}
                  >
                    <CategoryIcon $palette={palette}>
                      <Icon size={24} />
                    </CategoryIcon>
                    <CategoryName $palette={palette}>{cat.name}</CategoryName>
                  </CategoryCard>
                </MotionDiv>
              );
            })}
          </Grid>
        </MotionDiv>
      </SectionInner>
    </Section>
  );
}
