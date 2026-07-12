import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { WedluxHero } from '@/stories/landing/wedlux/hero';
import { WedluxServices } from '@/stories/landing/wedlux/services';
import { WedluxStory } from '@/stories/landing/wedlux/story';
import { WedluxPortfolio } from '@/stories/landing/wedlux/portfolio';
import { WedluxMoments } from '@/stories/landing/wedlux/moments';
import { WedluxTestimonial } from '@/stories/landing/wedlux/testimonial';
import { WedluxProcess } from '@/stories/landing/wedlux/process';
import { WedluxPlans } from '@/stories/landing/wedlux/plans';
import { WedluxInstagram } from '@/stories/landing/wedlux/instagram';
import { WedluxInsights } from '@/stories/landing/wedlux/insights';
import { WedluxCtaBand } from '@/stories/landing/wedlux/cta-band';
import { useLandingPage } from './helper';
import { HeroViewport, Main, PageWrap } from './styled';

export default function LandingPage() {
  useLandingPage();

  return (
    <PageWrap>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Main id="main-content">
        <HeroViewport>
          <PublicHeader overlay />
          <WedluxHero />
        </HeroViewport>

        <WedluxServices />
        <WedluxStory />
        <WedluxPortfolio />
        <WedluxMoments />
        <WedluxTestimonial />
        <WedluxProcess />
        <WedluxPlans />
        <WedluxInstagram />
        <WedluxInsights />
        <WedluxCtaBand />
      </Main>
      <PublicFooter />
    </PageWrap>
  );
}
