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
import { getCategoryPhoto } from '@/pages/categories/helper';
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

export function WeddingServices() {
  const { t } = useTranslation();
  const { tiles, collage } = useWeddingServices();

  return (
    <Section $tint>
      <SectionInner>
        <Layout>
          <Left>
            <Eyebrow>{t('storefront.weddingEyebrow')}</Eyebrow>
            <SectionTitle>{t('storefront.weddingTitle')}</SectionTitle>
            {tiles.length > 0 && (
              <>
                <ChooseLabel>
                  {t('storefront.weddingChooseService')}
                </ChooseLabel>
                <TileGrid>
                  {tiles.map(tile => (
                    <Tile key={tile.id} to={`/category/${tile.slug}`}>
                      <Thumb
                        src={tile.photo || getCategoryPhoto(tile.slug)}
                        alt={tile.name}
                        loading="lazy"
                      />
                      <TileLabel>{tile.name}</TileLabel>
                    </Tile>
                  ))}
                </TileGrid>
              </>
            )}
            <Actions>
              <PillLink to={`${ROUTES.SHOP}?event=wedding`}>
                {t('storefront.weddingViewAll')}
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
                $tall={index === 0 || index === 3}
                loading="lazy"
              />
            ))}
          </Collage>
        </Layout>
      </SectionInner>
    </Section>
  );
}
