import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const ambientDrift = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(1.5%, -1%) scale(1.03); }
`;

const hoverFine = `@media (hover: hover) and (pointer: fine)`;

export const PageShell = styled.div`
  position: relative;
  isolation: isolate;
  min-height: 100dvh;
  color: ${brandColors.chocolate};
  background: linear-gradient(
    180deg,
    ${brandColors.cream} 0%,
    ${brandColors.ivory} 42%,
    ${brandColors.tan} 100%
  );

  &::before {
    content: '';
    position: absolute;
    inset: -10% 0 auto;
    height: 50vh;
    z-index: 0;
    pointer-events: none;
    background: radial-gradient(
        ellipse 55% 45% at 12% 20%,
        rgba(255, 255, 255, 0.85),
        transparent 60%
      ),
      radial-gradient(
        ellipse 45% 40% at 88% 10%,
        rgba(201, 162, 39, 0.12),
        transparent 55%
      );
    animation: ${ambientDrift} 20s ease-in-out infinite;
  }
`;

export const DetailWrap = styled.div`
  position: relative;
  z-index: 1;
  width: min(100%, 76rem);
  margin: 0 auto;
  padding: 1rem 1rem 7rem;
  display: grid;
  gap: 1rem;

  ${media.md} {
    padding: 1.5rem 1.5rem 3.5rem;
    gap: 1.25rem;
  }
`;

export const Breadcrumb = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${brandColors.taupe};

  a {
    color: ${brandColors.taupe};
    text-decoration: none;
    transition: color 0.2s ease;

    ${hoverFine} {
      &:hover {
        color: ${brandColors.chocolate};
      }
    }
  }

  span[data-current] {
    color: ${brandColors.chocolate};
  }
`;

export const ProductCard = styled.div`
  display: grid;
  overflow: hidden;
  border-radius: 1.35rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: rgba(255, 252, 250, 0.92);
  box-shadow: 0 18px 50px rgba(${brandRgb.black}, 0.06);

  ${media.lg} {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    align-items: stretch;
  }
`;

export const GalleryPane = styled.div`
  display: grid;
  gap: 0.75rem;
  padding: 0.9rem;
  background: linear-gradient(
    165deg,
    ${brandColors.white} 0%,
    ${brandColors.cream} 100%
  );

  ${media.lg} {
    position: sticky;
    top: 5.5rem;
    align-self: start;
    grid-template-columns: 5rem minmax(0, 1fr);
    gap: 0.85rem;
    padding: 1.15rem;
    border-right: 1px solid rgba(${brandRgb.chocolate}, 0.06);
  }
`;

export const ThumbColumn = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  order: 2;
  padding-bottom: 0.15rem;

  ${media.lg} {
    flex-direction: column;
    overflow-x: visible;
    overflow-y: auto;
    max-height: min(78vh, 34rem);
    order: 0;
    padding-bottom: 0;
  }
`;

export const Thumb = styled.button<{ $active?: boolean }>`
  appearance: none;
  flex: 0 0 4rem;
  width: 4rem;
  height: 4rem;
  padding: 0;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  background: ${brandColors.tan};
  border: 2px solid
    ${({ $active }) =>
      $active ? brandColors.gold : `rgba(${brandRgb.chocolate}, 0.1)`};
  transition: border-color 0.2s ease, transform 0.2s ease;

  ${media.lg} {
    flex: 0 0 auto;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
  }

  ${hoverFine} {
    &:hover {
      transform: translateY(-1px);
      border-color: ${brandColors.gold};
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const MainImageWrap = styled.div`
  order: 1;
  position: relative;
  overflow: hidden;
  border-radius: 1.1rem;
  aspect-ratio: 4 / 5;
  background: ${brandColors.tan};
  border: 1px solid rgba(${brandRgb.chocolate}, 0.06);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);

  ${media.lg} {
    order: 0;
    aspect-ratio: 1;
    min-height: 30rem;
  }
`;

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const BadgeRow = styled.div`
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const Pill = styled.span<{ $tone?: 'verified' | 'featured' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.65rem;
  border-radius: 9999px;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${({ $tone }) =>
    $tone === 'featured'
      ? brandColors.gold
      : `rgba(${brandRgb.chocolate}, 0.88)`};
  color: ${brandColors.white};
  backdrop-filter: blur(8px);
`;

export const InfoPane = styled.div`
  padding: 1.15rem 1.1rem 1.4rem;
  display: grid;
  gap: 1rem;
  align-content: start;
  background: linear-gradient(
    180deg,
    rgba(255, 252, 250, 0.98) 0%,
    ${brandColors.ivory} 100%
  );

  ${media.md} {
    padding: 1.5rem 1.6rem 1.75rem;
    gap: 1.1rem;
  }
`;

export const CategoryLink = styled(Link)`
  width: fit-content;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${brandColors.gold};
  text-decoration: none;

  ${hoverFine} {
    &:hover {
      color: ${brandColors.chocolate};
    }
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.55rem, 4vw, 2.2rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: ${brandColors.chocolate};
`;

export const RatingRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
`;

export const RatingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.55rem;
  border-radius: 9999px;
  background: ${brandColors.chocolate};
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const ReviewCount = styled.span`
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${brandColors.taupe};
`;

export const PriceSection = styled.div`
  padding: 1rem 1.05rem;
  border-radius: 1rem;
  background: ${brandColors.white};
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  box-shadow: 0 8px 24px rgba(${brandRgb.black}, 0.04);
`;

export const MrpLine = styled.div`
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  color: ${brandColors.taupe};
  margin-bottom: 0.2rem;

  s {
    margin-left: 0.35rem;
  }
`;

export const PriceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.55rem 0.75rem;
`;

export const PriceValue = styled.div`
  font-family: ${fontFamily.display};
  font-size: clamp(1.7rem, 4vw, 2.1rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${brandColors.chocolate};
`;

export const PriceNote = styled.div`
  margin-top: 0.45rem;
  font-family: ${fontFamily.body};
  font-size: 0.78rem;
  line-height: 1.45;
  color: ${brandColors.taupe};
`;

export const OfferChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.55rem;
  border-radius: 9999px;
  background: rgba(201, 162, 39, 0.14);
  color: ${brandColors.brown};
  font-family: ${fontFamily.body};
  font-size: 0.72rem;
  font-weight: 700;
`;

export const OfferList = styled.ul`
  margin: 0.7rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.45rem;
`;

export const OfferItem = styled.li`
  display: flex;
  gap: 0.45rem;
  align-items: flex-start;
  font-family: ${fontFamily.body};
  font-size: 0.8rem;
  line-height: 1.45;
  color: ${brandColors.charcoal};

  strong {
    color: ${brandColors.gold};
    font-weight: 700;
  }
`;

export const InfoTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;

  ${media.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const InfoTile = styled.div`
  padding: 0.85rem 0.75rem;
  border-radius: 0.9rem;
  background: ${brandColors.white};
  border: 1px solid rgba(${brandRgb.chocolate}, 0.07);

  strong {
    display: block;
    font-family: ${fontFamily.body};
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${brandColors.gold};
    margin-bottom: 0.3rem;
  }

  span {
    font-family: ${fontFamily.body};
    font-size: 0.8rem;
    font-weight: 600;
    color: ${brandColors.chocolate};
    line-height: 1.35;
  }
`;

export const Highlights = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;
`;

export const HighlightItem = styled.li`
  display: grid;
  grid-template-columns: 0.55rem 1fr;
  gap: 0.6rem;
  align-items: start;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${brandColors.charcoal};

  &::before {
    content: '';
    width: 0.4rem;
    height: 0.4rem;
    margin-top: 0.45rem;
    border-radius: 9999px;
    background: ${brandColors.gold};
  }
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const Tag = styled.span`
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  background: rgba(${brandRgb.chocolate}, 0.05);
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
`;

export const CtaStack = styled.div`
  display: grid;
  gap: 0.65rem;

  ${media.md} {
    grid-template-columns: 1.45fr 1fr;
  }
`;

export const PrimaryBuy = styled.button`
  min-height: 52px;
  border: none;
  border-radius: 9999px;
  background: linear-gradient(
    120deg,
    ${brandColors.chocolate} 0%,
    ${brandColors.brown} 100%
  );
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(${brandRgb.chocolate}, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  ${hoverFine} {
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 16px 34px rgba(${brandRgb.chocolate}, 0.28);
    }
  }
`;

export const SecondaryBuy = styled(Link)`
  min-height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1rem;
  border-radius: 9999px;
  border: 1.5px solid rgba(${brandRgb.chocolate}, 0.16);
  background: transparent;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s ease;

  ${hoverFine} {
    &:hover {
      background: rgba(${brandRgb.chocolate}, 0.04);
    }
  }
`;

export const SectionCard = styled.section`
  position: relative;
  border-radius: 1.25rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: rgba(255, 252, 250, 0.94);
  padding: 1.2rem 1.15rem 1.35rem;
  box-shadow: 0 14px 40px rgba(${brandRgb.black}, 0.04);

  ${media.md} {
    padding: 1.45rem 1.55rem 1.6rem;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 0.95rem;
  font-family: ${fontFamily.display};
  font-size: clamp(1.15rem, 2.5vw, 1.4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${brandColors.chocolate};
`;

export const SectionBody = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: 0.95rem;
  line-height: 1.75;
  color: ${brandColors.charcoal};
`;

export const SpecGrid = styled.dl`
  margin: 0;
  display: grid;
  gap: 0.7rem;

  ${media.md} {
    grid-template-columns: 11rem 1fr;
    gap: 0.8rem 1.25rem;
  }
`;

export const SpecLabel = styled.dt`
  font-family: ${fontFamily.body};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${brandColors.taupe};
`;

export const SpecValue = styled.dd`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: 0.9rem;
  font-weight: 500;
  color: ${brandColors.chocolate};
`;

export const GalleryMasonry = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;

  ${media.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 0.9rem;
    background: ${brandColors.tan};
    border: 1px solid rgba(${brandRgb.chocolate}, 0.06);
  }
`;

export const RatingBreakdown = styled.div`
  display: grid;
  gap: 1.1rem;

  ${media.md} {
    grid-template-columns: 11rem 1fr;
    gap: 1.75rem;
    align-items: start;
  }
`;

export const BigRating = styled.div`
  text-align: center;
  padding: 1.1rem 0.9rem;
  border-radius: 1rem;
  background: linear-gradient(
    160deg,
    ${brandColors.white} 0%,
    ${brandColors.cream} 100%
  );
  border: 1px solid rgba(${brandRgb.chocolate}, 0.07);

  strong {
    display: block;
    font-family: ${fontFamily.display};
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  span {
    font-family: ${fontFamily.body};
    font-size: 0.78rem;
    color: ${brandColors.taupe};
  }
`;

export const BarList = styled.div`
  display: grid;
  gap: 0.5rem;
`;

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 2.5rem 1fr 2.5rem;
  gap: 0.55rem;
  align-items: center;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  color: ${brandColors.taupe};
`;

export const BarTrack = styled.div`
  height: 0.45rem;
  border-radius: 9999px;
  background: rgba(${brandRgb.chocolate}, 0.08);
  overflow: hidden;
`;

export const BarFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => `${$pct}%`};
  background: linear-gradient(90deg, ${brandColors.gold}, #dfc56a);
`;

export const ReviewList = styled.div`
  display: grid;
  gap: 0.85rem;
  margin-top: 1.1rem;

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const ReviewCard = styled.article`
  padding: 1rem 1.05rem;
  border-radius: 1rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: ${brandColors.white};

  header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem 0.7rem;
    align-items: center;
    margin-bottom: 0.55rem;
  }

  h3 {
    margin: 0;
    font-family: ${fontFamily.body};
    font-size: 0.9rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-family: ${fontFamily.body};
    font-size: 0.875rem;
    line-height: 1.6;
    color: ${brandColors.charcoal};
  }

  time {
    font-size: 0.72rem;
    color: ${brandColors.taupe};
  }
`;

export const FaqList = styled.div`
  display: grid;
  gap: 0.55rem;
`;

export const FaqItem = styled.details`
  border: 1px solid rgba(${brandRgb.chocolate}, 0.09);
  border-radius: 0.95rem;
  background: ${brandColors.white};
  padding: 0.9rem 1rem;

  summary {
    cursor: pointer;
    font-family: ${fontFamily.body};
    font-size: 0.92rem;
    font-weight: 650;
    color: ${brandColors.chocolate};
    list-style: none;

    &::-webkit-details-marker {
      display: none;
    }
  }

  p {
    margin: 0.7rem 0 0;
    font-family: ${fontFamily.body};
    font-size: 0.85rem;
    line-height: 1.6;
    color: ${brandColors.charcoal};
  }
`;

export const SimilarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;

  ${media.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const SimilarCard = styled(Link)`
  display: grid;
  text-decoration: none;
  color: inherit;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: ${brandColors.white};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  ${hoverFine} {
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 36px rgba(${brandRgb.black}, 0.08);
    }
  }

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    background: ${brandColors.tan};
  }

  div {
    padding: 0.75rem 0.8rem 0.9rem;
  }

  h3 {
    margin: 0 0 0.4rem;
    font-family: ${fontFamily.display};
    font-size: 0.88rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    color: ${brandColors.chocolate};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  strong {
    font-family: ${fontFamily.body};
    font-size: 0.9rem;
    color: ${brandColors.chocolate};
  }

  span {
    display: block;
    margin-top: 0.2rem;
    font-size: 0.72rem;
    color: ${brandColors.taupe};
  }
`;

export const ProcessSteps = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.7rem;

  ${media.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const ProcessStep = styled.li`
  padding: 1rem 0.9rem;
  border-radius: 1rem;
  background: linear-gradient(
    165deg,
    ${brandColors.white} 0%,
    ${brandColors.cream} 100%
  );
  border: 1px solid rgba(${brandRgb.chocolate}, 0.07);

  strong {
    display: block;
    margin-bottom: 0.35rem;
    font-family: ${fontFamily.display};
    font-size: 0.92rem;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  span {
    font-family: ${fontFamily.body};
    font-size: 0.78rem;
    line-height: 1.5;
    color: ${brandColors.taupe};
  }
`;

export const StickyBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem max(0.8rem, env(safe-area-inset-bottom, 0px));
  background: rgba(255, 252, 250, 0.94);
  border-top: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  backdrop-filter: blur(16px);
  box-shadow: 0 -10px 30px rgba(${brandRgb.black}, 0.06);

  ${media.lg} {
    display: none;
  }
`;

export const StickyPrice = styled.div`
  min-width: 0;

  small {
    display: block;
    font-family: ${fontFamily.body};
    font-size: 0.65rem;
    font-weight: 700;
    color: ${brandColors.gold};
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  strong {
    display: block;
    font-family: ${fontFamily.display};
    font-size: 1.2rem;
    font-weight: 700;
    color: ${brandColors.chocolate};
  }
`;

export const StickyCta = styled.button`
  min-height: 46px;
  padding: 0.65rem 1.2rem;
  border: none;
  border-radius: 9999px;
  background: ${brandColors.chocolate};
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
`;

export const EmptyState = styled.div`
  border-radius: 1.25rem;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: rgba(255, 252, 250, 0.95);
  padding: 2rem 1.35rem;
  box-shadow: 0 14px 40px rgba(${brandRgb.black}, 0.04);
`;

export const SplitSections = styled.div`
  display: grid;
  gap: 1rem;

  ${media.lg} {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }
`;
