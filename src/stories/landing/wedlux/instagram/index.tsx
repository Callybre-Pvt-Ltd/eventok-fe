import { useTranslation } from 'react-i18next';
import { SectionShell, SerifTitle, WhiteSection } from '../shared/styled';
import { InstagramIcon } from '@/components/ui/instagram-icon';
import { useWedluxInstagram } from './helper';
import { InstaBadge, InstaCell, InstaImage, InstaStrip } from './styled';

export function WedluxInstagram() {
  const { t } = useTranslation();
  const { scope, photos } = useWedluxInstagram();

  return (
    <WhiteSection id="instagram" ref={scope}>
      <SectionShell>
        <SerifTitle data-reveal>{t('landing.wedluxInstagramTitle')}</SerifTitle>
        <InstaStrip>
          {photos.map(src => (
            <InstaCell
              key={src}
              href="#"
              aria-label={t('landing.wedluxInstagramHandle')}
              data-reveal-group="instagram"
            >
              <InstaImage src={src} alt="" aria-hidden loading="lazy" />
              <InstaBadge aria-hidden>
                <InstagramIcon size={22} />
              </InstaBadge>
            </InstaCell>
          ))}
        </InstaStrip>
      </SectionShell>
    </WhiteSection>
  );
}
