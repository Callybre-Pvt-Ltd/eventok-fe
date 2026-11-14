import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const PageWrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  color: var(--color-text);
`;

export const Container = styled.div`
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
  padding: 2.5rem clamp(1rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const DirectoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1.5rem;
`;

export const DirectoryEyebrow = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary);
`;

export const DirectoryTitle = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(2rem, 4.5vw, 2.75rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
  line-height: 1.15;
`;

export const DirectoryLead = styled.p`
  margin: 0;
  max-width: 680px;
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  color: var(--color-text-secondary);
  line-height: 1.6;
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 480px;
  width: 100%;
  position: relative;
`;

export const PillarSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const PillarHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
`;

export const PillarTitle = styled.h2`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.35rem, 2.5vw, 1.65rem);
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.02em;
`;

export const PillarSub = styled.p`
  margin: 0.2rem 0 0;
  font-size: ${fontSizes.sm};
  color: var(--color-text-secondary);
`;

export const WeddingLayout = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;

  ${media.belowLg} {
    grid-template-columns: 1fr;
  }
`;

export const MasterCard = styled(Link)`
  position: relative;
  border-radius: ${radii.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 360px;
  text-decoration: none;
  background: #0f172a;
  border: 1px solid var(--color-border);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
  }
`;

export const MasterBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
  opacity: 0.72;
  transition: transform 0.4s ease, filter 0.4s ease;

  [data-theme='light'] & {
    filter: brightness(1.02) contrast(1.04) saturate(1.05);
  }

  [data-theme='dark'] & {
    filter: brightness(0.9) contrast(1.08) saturate(1.02);
  }

  ${MasterCard}:hover & {
    transform: scale(1.04);
  }
`;

export const MasterOverlay = styled.div`
  position: relative;
  z-index: 2;
  padding: 1.75rem;
  background: rgba(15, 23, 42, 0.9);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  color: #ffffff;
`;

export const MasterBadge = styled.span`
  align-self: flex-start;
  padding: 0.25rem 0.65rem;
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: ${radii.sm};
`;

export const MasterTitle = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
`;

export const MasterDesc = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: #cbd5e1;
  line-height: 1.5;
`;

export const MasterFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.82rem;
  color: #e2e8f0;
  font-weight: 600;
`;

export const SubcategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SubItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.sm};
  text-decoration: none;
  transition: all 0.15s ease;

  &:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
`;

export const SubItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

export const SubItemThumb = styled.img`
  width: 44px;
  height: 44px;
  border-radius: ${radii.sm};
  object-fit: cover;
  object-position: center 30%;
  flex-shrink: 0;
  transition: transform 0.2s ease, filter 0.2s ease;

  [data-theme='light'] & {
    filter: brightness(0.99) contrast(1.03);
  }

  [data-theme='dark'] & {
    filter: brightness(0.93) contrast(1.05);
  }
`;

export const SubItemTitle = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: 700;
  color: var(--color-text);
`;

export const SubItemCount = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

export const PillarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
`;

export const CategoryCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: ${radii.md};
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary);
  }
`;

export const CardImgWrap = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: var(--color-bg-alt);
`;

export const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
  transition: transform 0.35s ease, filter 0.35s ease;

  [data-theme='light'] & {
    filter: brightness(0.99) contrast(1.03) saturate(1.04);
  }

  [data-theme='dark'] & {
    filter: brightness(0.94) contrast(1.06) saturate(1.02);
  }

  ${CategoryCard}:hover & {
    transform: scale(1.04);
  }
`;

export const CardBody = styled.div`
  padding: 1rem 1.15rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const CardTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.25rem;
  font-size: 0.78rem;
  color: var(--color-text-secondary);
`;

export const StateWrap = styled.div`
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
