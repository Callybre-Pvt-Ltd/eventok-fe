import { useTranslation } from 'react-i18next';
import type { CatalogService } from '@/types/catalog';
import { usePdpTabs } from './helper';
import {
  Body,
  FeatureName,
  FeatureRow,
  IncludedChip,
  Intro,
  List,
  ListItem,
  Panel,
  Paragraph,
  Tab,
  TabBar,
} from './styled';

export function PdpTabs({ service }: { service: CatalogService }) {
  const { t } = useTranslation();
  const { tab, setTab, tabs, labels } = usePdpTabs();

  return (
    <Panel>
      <TabBar role="tablist">
        {tabs.map(item => (
          <Tab
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            $active={tab === item}
            onClick={() => setTab(item)}
          >
            {t(labels[item])}
          </Tab>
        ))}
      </TabBar>

      <Body>
        {tab === 'whatsIncluded' && (
          <>
            <Intro>{t('storefront.pdpIncludedIntro')}</Intro>
            {service.whatsIncluded.map(item => (
              <FeatureRow key={item.label}>
                <FeatureName>{item.label}</FeatureName>
                <IncludedChip>{t('storefront.pdpIncludedChip')}</IncludedChip>
              </FeatureRow>
            ))}
          </>
        )}

        {tab === 'goodToKnow' && (
          <List>
            {service.goodToKnow.map(item => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        )}

        {tab === 'aboutExperience' && (
          <Paragraph>{service.aboutExperience}</Paragraph>
        )}

        {tab === 'cancellationPolicy' && (
          <List>
            {service.cancellationPolicy.map(item => (
              <ListItem key={item}>{item}</ListItem>
            ))}
          </List>
        )}
      </Body>
    </Panel>
  );
}
