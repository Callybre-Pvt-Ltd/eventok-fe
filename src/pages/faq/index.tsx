import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { FaqSection } from '@/components/landing/faq-section';
import { useFaqPage } from './helper';
import { Content, Main, PageWrap } from './styled';

export default function FaqPage() {
  useFaqPage();
  return (
    <PageWrap>
      <PublicHeader />
      <Main>
        <Content>
          <FaqSection />
        </Content>
      </Main>
      <PublicFooter />
    </PageWrap>
  );
}
