import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@/constants/routes';
import {
  Eyebrow,
  PillLink,
  Section,
  SectionInner,
  SectionTitle,
} from '@/components/storefront/shared/styled';
import { useWeddingServices } from './helper';
import {
  Actions,
  ChooseLabel,
  Collage,
  CollageImage,
  Layout,
  Left,
  Thumb,
  Tile,
  TileGrid,
  TileLabel,
} from './styled';

const THUMBS = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=240&q=60',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=240&q=60',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=240&q=60',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=240&q=60',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=240&q=60',
  'https://images.unsplash.com/photo-1595407753234-0882f1e77954?auto=format&fit=crop&w=240&q=60',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=240&q=60',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=240&q=60',
];

export function WeddingServices() {
  const { t } = useTranslation();
  const { tiles, collage } = useWeddingServices();

  return (
    <Section>
      <SectionInner>
        <Layout>
          <Left>
            <Eyebrow>{t('storefront.weddingEyebrow')}</Eyebrow>
            <SectionTitle>{t('storefront.weddingTitle')}</SectionTitle>
            <ChooseLabel>{t('storefront.weddingChooseService')}</ChooseLabel>
            <TileGrid>
              {tiles.map((tile, index) => (
                <Tile key={tile.id} to={`/category/${tile.slug}`}>
                  <Thumb src={THUMBS[index % THUMBS.length]} alt="" />
                  <TileLabel>{tile.name}</TileLabel>
                </Tile>
              ))}
            </TileGrid>
            <Actions>
              <PillLink as="a" href={`${ROUTES.SHOP}?event=wedding`}>
                {t('storefront.weddingExplore')}
                <ArrowRight size={16} />
              </PillLink>
            </Actions>
          </Left>

          <Collage>
            {collage.map((src, index) => (
              <CollageImage
                key={src}
                src={src}
                alt=""
                loading="lazy"
                $tall={index % 3 === 0}
              />
            ))}
          </Collage>
        </Layout>
      </SectionInner>
    </Section>
  );
}
