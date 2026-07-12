import { useTranslation } from 'react-i18next';
import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { ContactForm } from '@/components/landing/contact-form';
import { useContactPage } from './helper';
import { Content, Main, PageTitle, PageWrap } from './styled';

export default function ContactPage() {
  const { t } = useTranslation();
  useContactPage();
  return (
    <PageWrap>
      <PublicHeader />
      <Main>
        <Content>
          <PageTitle>{t('landing.contactTitle')}</PageTitle>
          <ContactForm />
        </Content>
      </Main>
      <PublicFooter />
    </PageWrap>
  );
}
