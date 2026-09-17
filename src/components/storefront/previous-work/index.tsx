import { Play as PlayIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Eyebrow,
  Rail,
  Section,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { usePreviousWork } from './helper';
import { Caption, Card, Image, Overlay, Play } from './styled';

export function PreviousWork() {
  const { t } = useTranslation();
  const { items } = usePreviousWork();

  return (
    <Section $tint>
      <SectionInner>
        <Eyebrow>{t('storefront.previousWorkEyebrow')}</Eyebrow>
        <SectionTitle>{t('storefront.previousWorkTitle')}</SectionTitle>
        <SectionSubtitle>
          {t('storefront.previousWorkSubtitle')}
        </SectionSubtitle>
        <Rail>
          {items.map(item => (
            <Card key={item.id}>
              <Image src={item.image} alt={item.caption} loading="lazy" />
              <Overlay />
              <Caption>{item.caption}</Caption>
              <Play type="button" aria-label={t('storefront.previousWorkPlay')}>
                <PlayIcon size={20} />
              </Play>
            </Card>
          ))}
        </Rail>
      </SectionInner>
    </Section>
  );
}
