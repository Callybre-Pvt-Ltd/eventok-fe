import { motion } from 'framer-motion';
import {
  BadgeCheck,
  Calendar,
  ChevronDown,
  MapPin,
  MessageCircle,
  Play,
  Star,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { LoadingState } from '@/components/global/loading-state';
import { ErrorState } from '@/components/global/error-state';
import { Button } from '@/components/ui/button';
import { brandColors } from '@/theme/brand';
import { VendorPortfolioCard } from '@/components/marketplace/vendor-portfolio-card';
import { useVendorDetailPage } from './helper';
import {
  PageWrap,
  Main,
  Masonry,
  MasonryItem,
  Layout,
  Content,
  Section,
  SectionTitle,
  Sidebar,
  SidebarCard,
  SidebarName,
  SidebarMeta,
  MetaRow,
  CtaStack,
  Timeline,
  TimelineItem,
  TimelineDot,
  ServiceList,
  ServiceItem,
  VideoGrid,
  VideoCard,
  PlayBtn,
  BeforeAfter,
  BaImage,
  BaLabel,
  ReviewCard,
  ReviewAvatar,
  ReviewBody,
  CalendarGrid,
  CalDay,
  FaqList,
  FaqItem,
  FaqAnswer,
  RelatedRow,
  TagList,
  Tag,
  Description,
} from './styled';

export default function VendorDetailPage() {
  const { t } = useTranslation();
  const {
    palette,
    vendor,
    reviews,
    related,
    categoryMap,
    timeline,
    services,
    videos,
    beforeAfter,
    faq,
    isLoading,
    error,
    refetch,
  } = useVendorDetailPage();

  if (isLoading) {
    return (
      <PageWrap $palette={palette}>
        <PublicHeader />
        <Main>
          <LoadingState />
        </Main>
        <PublicFooter />
      </PageWrap>
    );
  }

  if (error || !vendor) {
    return (
      <PageWrap $palette={palette}>
        <PublicHeader />
        <Main>
          <ErrorState onRetry={() => refetch()} />
        </Main>
        <PublicFooter />
      </PageWrap>
    );
  }

  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const available = [3, 4, 5, 12, 13, 19, 20, 26, 27];

  return (
    <PageWrap $palette={palette}>
      <PublicHeader />
      <Main>
        <Masonry>
          {vendor.portfolio.map((p, i) => (
            <MasonryItem
              key={p.id}
              $palette={palette}
              $tall={i % 3 === 0}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <img src={p.url} alt={p.caption} loading="lazy" />
            </MasonryItem>
          ))}
        </Masonry>

        <Layout>
          <Content>
            <Section>
              <SectionTitle $palette={palette}>
                {t('marketplace.detailAbout')}
              </SectionTitle>
              <Description $palette={palette}>{vendor.description}</Description>
              <TagList>
                {vendor.tags.map(tag => (
                  <Tag key={tag} $palette={palette}>
                    {tag}
                  </Tag>
                ))}
              </TagList>
            </Section>

            <Section>
              <SectionTitle $palette={palette}>
                {t('marketplace.detailTimeline')}
              </SectionTitle>
              <Timeline>
                {timeline.map(item => (
                  <TimelineItem key={item.year} $palette={palette}>
                    <TimelineDot $palette={palette} />
                    <strong>{item.year}</strong>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </TimelineItem>
                ))}
              </Timeline>
            </Section>

            <Section>
              <SectionTitle $palette={palette}>
                {t('marketplace.detailServices')}
              </SectionTitle>
              <ServiceList>
                {services.map(s => (
                  <ServiceItem key={s} $palette={palette}>
                    {s}
                  </ServiceItem>
                ))}
              </ServiceList>
            </Section>

            <Section>
              <SectionTitle $palette={palette}>
                {t('marketplace.detailVideos')}
              </SectionTitle>
              <VideoGrid>
                {videos.map(v => (
                  <VideoCard key={v.id} $palette={palette}>
                    <img src={v.thumb} alt={v.title} />
                    <PlayBtn aria-hidden>
                      <Play size={24} fill={brandColors.sage} />
                    </PlayBtn>
                    <span>{v.title}</span>
                  </VideoCard>
                ))}
              </VideoGrid>
            </Section>

            <Section>
              <SectionTitle $palette={palette}>
                {t('marketplace.detailBeforeAfter')}
              </SectionTitle>
              <BeforeAfter>
                {beforeAfter.map((ba, i) => (
                  <div key={i}>
                    <BaImage $palette={palette}>
                      <img src={ba.before} alt="Before" />
                      <BaLabel>Before</BaLabel>
                    </BaImage>
                    <BaImage $palette={palette}>
                      <img src={ba.after} alt="After" />
                      <BaLabel>After</BaLabel>
                    </BaImage>
                  </div>
                ))}
              </BeforeAfter>
            </Section>

            <Section>
              <SectionTitle $palette={palette}>
                {t('marketplace.detailReviews')}
              </SectionTitle>
              {reviews.map(r => (
                <ReviewCard key={r.id} $palette={palette}>
                  <ReviewAvatar>{r.customerName.charAt(0)}</ReviewAvatar>
                  <ReviewBody>
                    <div>
                      <Star size={14} fill="currentColor" /> {r.rating}
                    </div>
                    <p>&ldquo;{r.comment}&rdquo;</p>
                    <cite>— {r.customerName}</cite>
                  </ReviewBody>
                </ReviewCard>
              ))}
            </Section>

            <Section>
              <SectionTitle $palette={palette}>
                {t('marketplace.detailAvailability')}
              </SectionTitle>
              <CalendarGrid>
                {days.map(d => (
                  <CalDay
                    key={d}
                    $palette={palette}
                    $available={available.includes(d)}
                  >
                    {d}
                  </CalDay>
                ))}
              </CalendarGrid>
            </Section>

            <Section>
              <SectionTitle $palette={palette}>
                {t('marketplace.detailFaq')}
              </SectionTitle>
              <FaqList>
                {faq.map(item => (
                  <FaqItem key={item.q} $palette={palette}>
                    <summary>
                      {item.q}
                      <ChevronDown size={18} />
                    </summary>
                    <FaqAnswer $palette={palette}>{item.a}</FaqAnswer>
                  </FaqItem>
                ))}
              </FaqList>
            </Section>

            {related.length > 0 && (
              <Section>
                <SectionTitle $palette={palette}>
                  {t('marketplace.detailRelated')}
                </SectionTitle>
                <RelatedRow>
                  {related.map(v => (
                    <VendorPortfolioCard
                      key={v.id}
                      vendor={v}
                      categoryNames={v.categories
                        .map(id => categoryMap[id])
                        .filter(Boolean)}
                    />
                  ))}
                </RelatedRow>
              </Section>
            )}
          </Content>

          <Sidebar>
            <SidebarCard $palette={palette}>
              <SidebarName $palette={palette}>
                {vendor.businessName}
              </SidebarName>
              <SidebarMeta $palette={palette}>
                <MetaRow>
                  <BadgeCheck size={16} />
                  {t('marketplace.verified')}
                </MetaRow>
                <MetaRow>
                  <MapPin size={16} />
                  {vendor.city}
                </MetaRow>
                <MetaRow>
                  <Star size={16} fill="currentColor" />
                  {vendor.rating} · {vendor.reviewCount}{' '}
                  {t('marketplace.reviews')}
                </MetaRow>
                <MetaRow>
                  <Calendar size={16} />
                  {vendor.experience} {t('marketplace.yearsExp')}
                </MetaRow>
              </SidebarMeta>
              <CtaStack>
                <Button variant="primary" size="lg" fullWidth>
                  {t('marketplace.requestQuote')}
                </Button>
                <Button variant="secondary" size="md" fullWidth>
                  <MessageCircle size={16} />
                  {t('marketplace.contactAdmin')}
                </Button>
                <Button variant="outline" size="md" fullWidth>
                  {t('marketplace.bookConsultation')}
                </Button>
              </CtaStack>
            </SidebarCard>
          </Sidebar>
        </Layout>
      </Main>
      <PublicFooter />
    </PageWrap>
  );
}
