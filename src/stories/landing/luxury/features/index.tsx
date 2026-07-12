import { useTranslation } from 'react-i18next';
import { luxuryFeatures } from './helper';
import {
  FeatureDesc,
  FeatureIcon,
  FeatureItem,
  FeatureName,
  FeaturesGrid,
  FeaturesSection,
} from './styled';

export function LuxuryFeatures() {
  const { t } = useTranslation();

  return (
    <FeaturesSection>
      <FeaturesGrid>
        {luxuryFeatures.map(({ key, icon: Icon, titleKey, descKey }) => (
          <FeatureItem key={key}>
            <FeatureIcon>
              <Icon size={20} strokeWidth={1.5} />
            </FeatureIcon>
            <FeatureName>{t(titleKey)}</FeatureName>
            <FeatureDesc>{t(descKey)}</FeatureDesc>
          </FeatureItem>
        ))}
      </FeaturesGrid>
    </FeaturesSection>
  );
}
