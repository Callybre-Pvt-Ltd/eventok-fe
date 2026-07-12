import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { TestimonialsExperience } from '@/components/marketplace/testimonials-experience';
import { useTestimonialsPage } from './helper';
import { Main, PageWrap } from './styled';

export default function TestimonialsPage() {
  const { palette } = useTestimonialsPage();

  return (
    <PageWrap $palette={palette}>
      <PublicHeader />
      <Main>
        <TestimonialsExperience />
      </Main>
      <PublicFooter />
    </PageWrap>
  );
}
