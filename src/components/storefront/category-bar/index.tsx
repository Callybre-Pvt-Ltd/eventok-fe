import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Grid } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { catalogService } from '@/services';
import { categoryIcon } from '@/utils/storefront/icons';
import {
  ArrowWrapper,
  BarContainer,
  BarSection,
  CategoryChip,
  ChipCount,
  ChipIconWrap,
  NavArrowButton,
  ScrollTrack,
  ViewAllChip,
} from './styled';

export function CategoryBar() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { data } = useQuery({
    queryKey: ['storefront', 'categories', 'bar'],
    queryFn: async () => (await catalogService.getCategories()).data ?? [],
  });

  const categories = useMemo(() => data ?? [], [data]);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateScrollState();
      });
      ro.observe(el);
    }

    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    const raf = requestAnimationFrame(updateScrollState);
    const timer = setTimeout(updateScrollState, 120);

    return () => {
      ro?.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [categories, updateScrollState]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 280);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (categories.length === 0) return null;

  return (
    <BarSection aria-label="Event Categories">
      <BarContainer>
        <ArrowWrapper $direction="left" $visible={canScrollLeft}>
          <NavArrowButton
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={16} />
          </NavArrowButton>
        </ArrowWrapper>

        <ScrollTrack ref={scrollRef}>
          {categories.map(cat => {
            const Icon = categoryIcon(cat.icon);
            return (
              <CategoryChip key={cat.id} to={`/category/${cat.slug}`}>
                <ChipIconWrap>
                  <Icon size={16} />
                </ChipIconWrap>
                <span>{cat.name}</span>
                {cat.serviceCount !== undefined && cat.serviceCount > 0 && (
                  <ChipCount>{cat.serviceCount}</ChipCount>
                )}
              </CategoryChip>
            );
          })}
          <ViewAllChip to={ROUTES.CATEGORIES}>
            <ChipIconWrap>
              <Grid size={15} />
            </ChipIconWrap>
            <span>All Categories</span>
          </ViewAllChip>
        </ScrollTrack>

        <ArrowWrapper $direction="right" $visible={canScrollRight}>
          <NavArrowButton
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Scroll categories right"
          >
            <ChevronRight size={16} />
          </NavArrowButton>
        </ArrowWrapper>
      </BarContainer>
    </BarSection>
  );
}
