import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { CreamSection, SectionShell, SerifTitle } from '../shared/styled';
import { useWedluxInsights } from './helper';
import {
  InsightAvatar,
  InsightCard,
  InsightDate,
  InsightDivider,
  InsightMedia,
  InsightMeta,
  InsightsGrid,
  InsightTitle,
} from './styled';

export function WedluxInsights() {
  const { t } = useTranslation();
  const { scope, posts } = useWedluxInsights();

  return (
    <CreamSection id="insights" ref={scope}>
      <SectionShell>
        <SerifTitle data-reveal>{t('landing.wedluxInsightsTitle')}</SerifTitle>
        <InsightsGrid>
          {posts.map(post => (
            <InsightCard
              key={post.titleKey}
              to={ROUTES.ABOUT}
              data-reveal-group="insights"
            >
              <InsightMedia>
                <img src={post.image} alt="" aria-hidden loading="lazy" />
              </InsightMedia>
              <InsightMeta>
                <InsightAvatar
                  src={post.avatar}
                  alt=""
                  aria-hidden
                  loading="lazy"
                />
                <span>{t(post.authorKey)}</span>
                <InsightDate>{t(post.dateKey)}</InsightDate>
              </InsightMeta>
              <InsightDivider aria-hidden />
              <InsightTitle>{t(post.titleKey)}</InsightTitle>
            </InsightCard>
          ))}
        </InsightsGrid>
      </SectionShell>
    </CreamSection>
  );
}
