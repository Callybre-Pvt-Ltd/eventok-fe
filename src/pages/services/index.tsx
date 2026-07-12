import { PublicHeader } from '@/components/global/public-header';
import { PublicFooter } from '@/components/global/public-footer';
import { discoveryVendors, filterVendors } from './filters';
import { useServicesPage } from './helper';
import { ConsultationModal } from './sections/consultation-modal';
import { DiscoveryFilterBar } from './sections/filter-bar';
import { DiscoveryFilterDrawer } from './sections/filter-drawer';
import { DiscoveryHero } from './sections/hero';
import { DiscoveryResults } from './sections/results';
import { DiscoverySortSheet } from './sections/sort-sheet';
import { Main, PageWrap } from './styled';

export default function ServicesPage() {
  const page = useServicesPage();

  const countForDraft = (draft: Parameters<typeof filterVendors>[1]) =>
    filterVendors(discoveryVendors, draft).length;

  return (
    <PageWrap>
      <a className="skip-link" href="#services-main">
        Skip to content
      </a>
      <PublicHeader />
      <Main id="services-main" ref={page.scope}>
        <DiscoveryHero />
        <DiscoveryFilterBar
          filters={page.filters}
          patch={page.patch}
          clearAll={page.clearAll}
          removePill={page.removePill}
          pills={page.pills}
          activeFilterCount={page.activeFilterCount}
          resultCount={page.filtered.length}
          onOpenMobileFilters={() => page.setMobileOpen(true)}
          onOpenMoreFilters={() => page.setMoreOpen(true)}
          onOpenSort={() => page.setSortOpen(true)}
        />
        <DiscoveryResults
          vendors={page.visible}
          total={page.filtered.length}
          isFiltering={page.isFiltering}
          hasMore={page.hasMore}
          onLoadMore={page.loadMore}
          onConsult={page.openConsult}
          loadMoreRef={page.loadMoreRef}
          onShowFeatured={() => {
            page.clearAll();
            page.patch({ featuredOnly: true });
          }}
        />
      </Main>

      <DiscoveryFilterDrawer
        open={page.mobileOpen}
        mode="mobile"
        onClose={() => page.setMobileOpen(false)}
        filters={page.filters}
        patch={page.patch}
        clearAll={page.clearAll}
        resultCount={page.filtered.length}
        countForDraft={countForDraft}
      />

      <DiscoveryFilterDrawer
        open={page.moreOpen}
        mode="more"
        onClose={() => page.setMoreOpen(false)}
        filters={page.filters}
        patch={page.patch}
        clearAll={page.clearAll}
        resultCount={page.filtered.length}
        countForDraft={countForDraft}
      />

      <DiscoverySortSheet
        open={page.sortOpen}
        value={page.filters.sort}
        onChange={sort => page.patch({ sort })}
        onClose={() => page.setSortOpen(false)}
      />

      <ConsultationModal
        vendor={page.consultVendor}
        sent={page.consultSent}
        onClose={page.closeConsult}
        onSubmit={page.submitConsult}
      />

      <PublicFooter />
    </PageWrap>
  );
}
