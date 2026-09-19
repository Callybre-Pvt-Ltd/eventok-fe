import { useTranslation } from 'react-i18next';
import { StoreLayout } from '@/components/storefront/store-layout';
import { ContactForm } from '@/components/landing/contact-form';
import { useContactPage } from './helper';
import { Content, Main, PageTitle, PageWrap } from './styled';

export default function ContactPage() {
  const { t } = useTranslation();
  useContactPage();
  return (
    <StoreLayout>
      <PageWrap>
        <Main>
          <Content>
            <PageTitle>{t('landing.contactTitle')}</PageTitle>
            <ContactForm />
          </Content>
        </Main>
      </PageWrap>
    </StoreLayout>
  );
}
