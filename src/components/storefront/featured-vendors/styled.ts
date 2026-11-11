import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const VendorGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export const VendorCardRoot = styled.article`
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.xl};
  overflow: hidden;
  box-shadow: 0 2px 10px var(--color-shadow);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px var(--color-shadow-strong);
    border-color: var(--color-primary);
  }
`;

export const PortfolioStrip = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 3px;
  background: var(--color-border);
  height: 12.5rem;
  overflow: hidden;
`;

export const PortfolioThumb = styled.div<{ $cover?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  ${VendorCardRoot}:hover & img {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.25rem 1.5rem;
  flex: 1;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const VendorTitle = styled.h3`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.3;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  svg {
    color: var(--color-primary);
    flex-shrink: 0;
  }
`;

export const ExperienceBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.5rem;
  border-radius: ${radii.full};
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 0.6875rem;
  font-weight: 700;
  white-space: nowrap;
`;

export const LocationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

export const Description = styled.p`
  font-size: ${fontSizes.xs};
  line-height: 1.55;
  color: var(--color-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 1rem;
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 1.25rem;
`;

export const Tag = styled.span`
  padding: 0.2rem 0.5rem;
  border-radius: ${radii.sm};
  background: var(--color-bg-alt);
  color: var(--color-text-secondary);
  font-size: 0.6875rem;
  font-weight: 600;
  border: 1px solid var(--color-border);
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
`;

export const RatingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const RatingScore = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: var(--color-text);

  svg {
    color: #f59e0b;
  }
`;

export const PriceHint = styled.span`
  font-size: 0.6875rem;
  color: var(--color-text-muted);
  font-weight: 600;
`;

export const ViewVendorBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: ${radii.md};
  background: var(--color-primary);
  color: #ffffff;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  text-decoration: none;
  transition: background 0.18s ease;

  &:hover {
    background: var(--color-primary-dark, #c2410c);
  }
`;
