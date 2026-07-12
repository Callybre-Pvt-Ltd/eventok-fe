import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { getCategoryIcon } from '@/components/landing/category-grid/helper';
import {
  getCategoryCount,
  getCategoryPhoto,
  useCategoriesPage,
} from '../helper';
import {
  CardBody,
  CardCount,
  CardDesc,
  CardLink,
  CardMeta,
  CardPhoto,
  CardPhotoWrap,
  CardTitle,
  CardTop,
  CatalogSection,
  CategoryCard,
  CategoryGrid,
  SectionEyebrow,
  SectionIntro,
  SectionLead,
  SectionTitle,
  StateWrap,
} from '../styled';

export function CategoriesCatalog() {
  const { t } = useTranslation();
  const { categories, isLoading, error, refetch } = useCategoriesPage();

  if (isLoading) {
    return (
      <StateWrap>
        <LoadingState />
      </StateWrap>
    );
  }

  if (error) {
    return (
      <StateWrap>
        <ErrorState onRetry={() => refetch()} />
      </StateWrap>
    );
  }

  return (
    <CatalogSection>
      <SectionIntro>
        <SectionEyebrow>{t('categoriesPage.catalogEyebrow')}</SectionEyebrow>
        <SectionTitle>{t('categoriesPage.catalogTitle')}</SectionTitle>
        <SectionLead>{t('categoriesPage.catalogLead')}</SectionLead>
      </SectionIntro>

      <CategoryGrid>
        {categories.map((category, index) => {
          const Icon = getCategoryIcon(category.icon);
          const featured = index === 0;

          return (
            <CategoryCard
              key={category.id}
              $featured={featured}
              to={`${ROUTES.CATEGORIES}?type=${category.slug}`}
            >
              <CardPhotoWrap>
                <CardPhoto
                  src={getCategoryPhoto(category.slug)}
                  alt=""
                  loading="lazy"
                />
              </CardPhotoWrap>
              <CardBody>
                <CardTop>
                  <Icon size={18} strokeWidth={1.5} />
                </CardTop>
                <CardTitle>{category.name}</CardTitle>
                <CardDesc>{category.description}</CardDesc>
                <CardMeta>
                  <CardCount>
                    {getCategoryCount(category.slug)}{' '}
                    {t('landing.categoryProducts')}
                  </CardCount>
                  <CardLink>
                    {t('categoriesPage.exploreCategory')}
                    <ArrowUpRight
                      size={14}
                      style={{ marginLeft: 4, verticalAlign: -2 }}
                    />
                  </CardLink>
                </CardMeta>
              </CardBody>
            </CategoryCard>
          );
        })}
      </CategoryGrid>
    </CatalogSection>
  );
}
