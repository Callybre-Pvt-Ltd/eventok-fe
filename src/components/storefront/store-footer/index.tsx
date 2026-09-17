import {
  Camera,
  Globe,
  MessageCircle,
  PlayCircle,
  ThumbsUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
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

  return (
    <FooterRoot>
      <Inner>
        <BrandBlock>
          <BrandRow to={ROUTES.HOME}>
            <BrandMark>EO</BrandMark>
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

        {columns.map(column => (
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
      <BottomBar>{t('storefront.footerRights', { year })}</BottomBar>
    </FooterRoot>
  );
}
