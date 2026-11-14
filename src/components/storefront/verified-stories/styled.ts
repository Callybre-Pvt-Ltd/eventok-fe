import styled from 'styled-components';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const StoriesSection = styled.section`
  width: 100%;
  padding: 4rem clamp(1rem, 3.5vw, 2.5rem);
  background: var(--color-bg);

  ${media.md} {
    padding: 5rem clamp(1.5rem, 4vw, 3rem);
  }
`;

export const StoriesInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const StoriesHeader = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const Eyebrow = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
`;

export const Title = styled.h2`
  font-family: ${fontFamily.display};
  font-size: clamp(1.85rem, 3.2vw, 2.75rem);
  font-weight: 800;
  color: var(--color-text);
`;

export const Subtitle = styled.p`
  font-size: ${fontSizes.md};
  color: var(--color-text-secondary);
  max-width: 36rem;
`;

export const StoriesGrid = styled.div`
  display: grid;
  gap: 1.75rem;
  grid-template-columns: 1fr;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StoryCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${radii.xl};
  overflow: hidden;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--color-primary);
  }
`;

export const StoryMedia = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const EventTag = styled.span`
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.65rem;
  border-radius: ${radii.full};
  background: rgba(15, 23, 42, 0.85);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
`;

export const StoryBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-gold);
`;

export const StoryQuote = styled.p`
  font-size: ${fontSizes.sm};
  line-height: 1.6;
  color: var(--color-text);
  font-weight: 500;
  flex: 1;
`;

export const ClientRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
`;

export const ClientMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ClientName = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: var(--color-text);
`;

export const ClientCity = styled.span`
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
`;

export const VerifiedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #16a34a;
`;
