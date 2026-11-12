import { useState } from 'react';
import { ArrowRight, ChevronRight, Search } from 'lucide-react';
import { Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '@/components/global/empty-state';
import { ErrorState } from '@/components/global/error-state';
import { LoadingState } from '@/components/global/loading-state';
import { StoreLayout } from '@/components/storefront/store-layout';
import {
  getCategoryCount,
  getCategoryPhoto,
  useCategoriesPage,
} from './helper';
import {
  CardBody,
  CardImg,
  CardImgWrap,
  CardMeta,
  CardTitle,
  CategoryCard,
  Container,
  DirectoryEyebrow,
  DirectoryHeader,
  DirectoryLead,
  DirectoryTitle,
  MasterBadge,
  MasterBg,
  MasterCard,
  MasterDesc,
  MasterFooter,
  MasterOverlay,
  MasterTitle,
  PageWrap,
  PillarGrid,
  PillarHead,
  PillarSection,
  PillarSub,
  PillarTitle,
  SearchRow,
  StateWrap,
  SubItem,
  SubItemCount,
  SubItemLeft,
  SubItemThumb,
  SubItemTitle,
  SubcategoryList,
  WeddingLayout,
} from './styled';

export default function CategoriesPage() {
  const { t } = useTranslation();
  const { categories, isLoading, error, refetch } = useCategoriesPage();
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return (
      <StoreLayout>
        <StateWrap>
          <LoadingState />
        </StateWrap>
      </StoreLayout>
    );
  }

  if (error) {
    return (
      <StoreLayout>
        <StateWrap>
          <ErrorState onRetry={() => refetch()} />
        </StateWrap>
      </StoreLayout>
    );
  }

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Split into structured pillars
  const weddingCategories = filtered.filter(
    c =>
      c.slug.includes('wedding') ||
      c.slug.includes('mandap') ||
      c.slug.includes('reception') ||
      c.slug.includes('haldi') ||
      c.slug.includes('sangeet') ||
      c.name.toLowerCase().includes('wedding'),
  );

  const celebrationCategories = filtered.filter(
    c =>
      c.slug.includes('birthday') ||
      c.slug.includes('anniversary') ||
      c.slug.includes('balloon') ||
      c.slug.includes('baby') ||
      c.name.toLowerCase().includes('birthday'),
  );

  const otherCategories = filtered.filter(
    c =>
      !weddingCategories.some(w => w.id === c.id) &&
      !celebrationCategories.some(b => b.id === c.id),
  );

  return (
    <StoreLayout>
      <PageWrap>
        <Container>
          <DirectoryHeader>
            <DirectoryEyebrow>EventOK Decoration Directory</DirectoryEyebrow>
            <DirectoryTitle>
              {t('categoriesPage.heroTitle', 'Browse All Decoration Services')}
            </DirectoryTitle>
            <DirectoryLead>
              Connect with verified decor specialists across India. From grand
              wedding stages to intimate anniversary and birthday setups.
            </DirectoryLead>
            <SearchRow>
              <Input
                size="large"
                prefix={
                  <Search size={18} color="var(--color-text-secondary)" />
                }
                placeholder="Search category or event theme..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                allowClear
              />
            </SearchRow>
          </DirectoryHeader>

          {filtered.length === 0 ? (
            <EmptyState description="No categories match your search term. Try a different keyword." />
          ) : (
            <>
              {/* Pillar 1: Weddings & Grand Stages */}
              <PillarSection>
                <PillarHead>
                  <div>
                    <PillarTitle>Weddings & Grand Ceremonies</PillarTitle>
                    <PillarSub>
                      Elaborate mandaps, sangeet backdrops, floral entrance
                      arches and royal stages
                    </PillarSub>
                  </div>
                </PillarHead>

                <WeddingLayout>
                  <MasterCard to="/shop?eventType=WEDDING">
                    <MasterBg
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85"
                      alt="Grand Wedding Stages"
                    />
                    <MasterOverlay>
                      <MasterBadge>Signature Pillar</MasterBadge>
                      <MasterTitle>
                        Complete Wedding & Reception Decor
                      </MasterTitle>
                      <MasterDesc>
                        Full-venue decor including vedi mandap, grand entry
                        walkways, bridal seating, and designer lighting.
                      </MasterDesc>
                      <MasterFooter>
                        <span>Verified Wedding Artisans</span>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          <span>Explore Services</span>
                          <ArrowRight size={14} />
                        </div>
                      </MasterFooter>
                    </MasterOverlay>
                  </MasterCard>

                  <SubcategoryList>
                    {(weddingCategories.length > 0
                      ? weddingCategories
                      : filtered.slice(0, 4)
                    ).map(item => (
                      <SubItem key={item.id} to={`/category/${item.slug}`}>
                        <SubItemLeft>
                          <SubItemThumb
                            src={getCategoryPhoto(item.slug)}
                            alt={item.name}
                          />
                          <div>
                            <SubItemTitle>{item.name}</SubItemTitle>
                            <SubItemCount>
                              {getCategoryCount(item.slug)} decor setups
                              available
                            </SubItemCount>
                          </div>
                        </SubItemLeft>
                        <ChevronRight
                          size={16}
                          color="var(--color-text-secondary)"
                        />
                      </SubItem>
                    ))}
                  </SubcategoryList>
                </WeddingLayout>
              </PillarSection>

              {/* Pillar 2: Birthdays, Anniversaries & Private Soirees */}
              <PillarSection>
                <PillarHead>
                  <div>
                    <PillarTitle>
                      Birthdays, Anniversaries & Private Soirees
                    </PillarTitle>
                    <PillarSub>
                      Custom balloon arches, neon signage, photo booths, and
                      theme setups
                    </PillarSub>
                  </div>
                </PillarHead>

                <PillarGrid>
                  {(celebrationCategories.length > 0
                    ? celebrationCategories
                    : filtered.slice(4, 8)
                  ).map(cat => (
                    <CategoryCard key={cat.id} to={`/category/${cat.slug}`}>
                      <CardImgWrap>
                        <CardImg
                          src={getCategoryPhoto(cat.slug)}
                          alt={cat.name}
                          loading="lazy"
                        />
                      </CardImgWrap>
                      <CardBody>
                        <CardTitle>{cat.name}</CardTitle>
                        <CardMeta>
                          <span>{getCategoryCount(cat.slug)} setups</span>
                          <span
                            style={{
                              color: 'var(--color-primary)',
                              fontWeight: 600,
                            }}
                          >
                            View Decor →
                          </span>
                        </CardMeta>
                      </CardBody>
                    </CategoryCard>
                  ))}
                </PillarGrid>
              </PillarSection>

              {/* Pillar 3: Cultural, Corporate & More */}
              {otherCategories.length > 0 && (
                <PillarSection>
                  <PillarHead>
                    <div>
                      <PillarTitle>
                        Cultural, Puja & Corporate Celebrations
                      </PillarTitle>
                      <PillarSub>
                        Traditional pooja backdrops, marigold arches, corporate
                        stage setups
                      </PillarSub>
                    </div>
                  </PillarHead>

                  <PillarGrid>
                    {otherCategories.map(cat => (
                      <CategoryCard key={cat.id} to={`/category/${cat.slug}`}>
                        <CardImgWrap>
                          <CardImg
                            src={getCategoryPhoto(cat.slug)}
                            alt={cat.name}
                            loading="lazy"
                          />
                        </CardImgWrap>
                        <CardBody>
                          <CardTitle>{cat.name}</CardTitle>
                          <CardMeta>
                            <span>{getCategoryCount(cat.slug)} setups</span>
                            <span
                              style={{
                                color: 'var(--color-primary)',
                                fontWeight: 600,
                              }}
                            >
                              View Decor →
                            </span>
                          </CardMeta>
                        </CardBody>
                      </CategoryCard>
                    ))}
                  </PillarGrid>
                </PillarSection>
              )}
            </>
          )}
        </Container>
      </PageWrap>
    </StoreLayout>
  );
}
