import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme';
import { useTrustedVendors } from './helper';
import { BrandName, LogoStrip, Section, Title, Track } from './styled';

export function TrustedVendors() {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { brands } = useTrustedVendors();

  const doubled = [...brands, ...brands];

  return (
    <Section $palette={palette}>
      <Title $palette={palette}>{t('landing.trustedTitle')}</Title>
      <Track>
        <LogoStrip>
          {doubled.map((brand, i) => (
            <BrandName key={`${brand}-${i}`} $palette={palette}>
              {brand}
            </BrandName>
          ))}
        </LogoStrip>
      </Track>
    </Section>
  );
}
