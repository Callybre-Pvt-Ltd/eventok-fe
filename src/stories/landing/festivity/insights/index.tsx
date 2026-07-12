import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import { insightPosts } from '../helper';
import {
  DisplayTitle,
  ScriptEyebrow,
  SectionShell,
  TaupeButton,
  TaupeSection,
} from '../shared/styled';
import {
  InsightCard,
  InsightDate,
  InsightGrid,
  InsightImage,
  InsightRow,
  InsightTextCol,
  InsightTitle,
  InsightsLead,
} from './styled';

export function FestivityInsights() {
  const { t } = useTranslation();

  return (
    <TaupeSection>
      <SectionShell>
        <InsightRow>
          <InsightTextCol>
            <ScriptEyebrow>
              {t('landing.festivityInsightsEyebrow')}
            </ScriptEyebrow>
            <DisplayTitle $light>
              {t('landing.festivityInsightsTitle')}
            </DisplayTitle>
            <InsightsLead>{t('landing.festivityInsightsLead')}</InsightsLead>
            <TaupeButton to={ROUTES.ABOUT}>
              {t('landing.festivityInsightsCta')}
            </TaupeButton>
          </InsightTextCol>

          <InsightGrid>
            {insightPosts.map(post => (
              <InsightCard key={post.id}>
                <InsightImage src={post.image} alt="" loading="lazy" />
                <InsightTitle>{t(post.titleKey)}</InsightTitle>
                <InsightDate>{t(post.dateKey)}</InsightDate>
              </InsightCard>
            ))}
          </InsightGrid>
        </InsightRow>
      </SectionShell>
    </TaupeSection>
  );
}
