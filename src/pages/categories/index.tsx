import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { WaveDivider } from '@/components/ui/wave-divider';
import { luxuryColors } from '@/theme/brand';
import { CategoriesCatalog } from './sections/catalog';
import { CategoriesCta } from './sections/cta';
import { CategoriesHero } from './sections/hero';
import { CategoriesHighlights } from './sections/highlights';
import { Main, PageWrap } from './styled';

export default function CategoriesPage() {
  return (
    <PageWrap>
      <PublicHeader />
      <Main>
        <CategoriesHero />
        <CategoriesCatalog />
        <WaveDivider fill={luxuryColors.cream} variant="soft" />
        <CategoriesHighlights />
        <CategoriesCta />
      </Main>
      <PublicFooter />
    </PageWrap>
  );
}
