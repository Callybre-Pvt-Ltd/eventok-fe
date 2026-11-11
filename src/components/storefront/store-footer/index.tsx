import {
  Camera,
  Globe,
  MessageCircle,
  PlayCircle,
  ThumbsUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BrandIcon } from '@/components/global/brand-icon';
import { ROUTES } from '@/constants/routes';
import { useStoreFooter } from './helper';
import {
  BottomBar,
  BrandBlock,
  BrandMark,
  BrandRow,
  BrandWord,
  Column,
  ColumnLink,
  ColumnTitle,
  FooterRoot,
  Inner,
  SocialButton,
  Socials,
  Tagline,
} from './styled';

const socials = [
  { key: 'instagram', Icon: Camera },
  { key: 'facebook', Icon: ThumbsUp },
  { key: 'youtube', Icon: PlayCircle },
  { key: 'linkedin', Icon: Globe },
  { key: 'whatsapp', Icon: MessageCircle },
];

export function StoreFooter() {
  const { t } = useTranslation();
  const { columns, year } = useStoreFooter();
  const mainColumns = columns.filter(
    col => col.titleKey !== 'storefront.footerLegal',
  );
  const legalColumn = columns.find(
    col => col.titleKey === 'storefront.footerLegal',
  );

  return (
    <FooterRoot>
      <Inner>
        <BrandBlock>
          <BrandRow to={ROUTES.HOME}>
            <BrandMark>
              <BrandIcon size={32} />
            </BrandMark>
            <BrandWord>{t('common.appName')}</BrandWord>
          </BrandRow>
          <Tagline>{t('storefront.footerTagline')}</Tagline>
          <Socials>
            {socials.map(({ key, Icon }) => (
              <SocialButton key={key} href="#" aria-label={key}>
                <Icon size={16} />
              </SocialButton>
            ))}
          </Socials>
        </BrandBlock>

        {mainColumns.map(column => (
          <Column key={column.titleKey}>
            <ColumnTitle>{t(column.titleKey)}</ColumnTitle>
            {column.links.map(link => (
              <ColumnLink key={`${column.titleKey}-${link.label}`} to={link.to}>
                {link.label}
              </ColumnLink>
            ))}
          </Column>
        ))}
      </Inner>

      <BottomBar>
        {legalColumn && (
          <div
            style={{
              marginBottom: '1.25rem',
              textAlign: 'left',
              maxWidth: '1440px',
              margin: '0 auto 1.25rem',
            }}
          >
            <ColumnTitle style={{ marginBottom: '0.5rem' }}>
              {t(legalColumn.titleKey)}
            </ColumnTitle>
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
              {legalColumn.links.map(link => (
                <ColumnLink key={link.label} to={link.to}>
                  {link.label}
                </ColumnLink>
              ))}
            </div>
          </div>
        )}
        <div
          style={{
            paddingTop: '1rem',
            borderTop: '1px solid var(--color-border)',
            textAlign: 'center',
          }}
        >
          {t('storefront.footerRights', { year })}
        </div>
      </BottomBar>
    </FooterRoot>
  );
}
