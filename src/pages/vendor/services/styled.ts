import styled, { keyframes } from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily } from '@/theme';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  animation: ${fadeUp} 0.45s ease-out both;
`;

export const Hero = styled.header`
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  padding: 1.35rem 1.4rem;
  border-radius: 0.35rem;
  background: linear-gradient(
      120deg,
      rgba(${brandRgb.pink}, 0.14) 0%,
      transparent 42%
    ),
    linear-gradient(
      180deg,
      ${brandColors.charcoal} 0%,
      ${brandColors.ink900} 100%
    );
  color: ${brandColors.white};
`;

export const HeroEyebrow = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${brandColors.pink400};
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.55rem, 3vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
`;

export const HeroLead = styled.p`
  margin: 0;
  max-width: 42rem;
  font-family: ${fontFamily.body};
  font-size: 0.9375rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

export const CountHint = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  color: ${brandColors.gray600};
`;

export const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 44px;
  padding: 0.65rem 1.15rem;
  border: none;
  border-radius: 0.25rem;
  background: ${brandColors.gold};
  color: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover:not(:disabled) {
    background: ${brandColors.brown};
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

export const GhostBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 40px;
  padding: 0.5rem 0.9rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(${brandRgb.ink}, 0.14);
  background: transparent;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: ${brandColors.gold};
    color: ${brandColors.brown};
  }
`;

export const DangerBtn = styled(GhostBtn)`
  border-color: rgba(220, 38, 38, 0.28);
  color: ${brandColors.danger500};

  &:hover {
    border-color: ${brandColors.danger500};
    color: ${brandColors.danger500};
    background: #fef2f2;
  }
`;

export const Composer = styled.section`
  margin-bottom: 1.75rem;
  padding: 1.25rem 1.35rem 1.4rem;
  border-radius: 0.35rem;
  border: 1px solid rgba(${brandRgb.ink}, 0.1);
  background: ${brandColors.white};
`;

export const SectionLabel = styled.h2`
  margin: 0 0 0.35rem;
  font-family: ${fontFamily.display};
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${brandColors.chocolate};
`;

export const SectionHint = styled.p`
  margin: 0 0 1rem;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  color: ${brandColors.gray600};
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
  gap: 0.65rem;
  margin-bottom: 1.25rem;
`;

export const CategoryTile = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  min-height: 88px;
  padding: 0.85rem 0.9rem;
  text-align: left;
  border-radius: 0.3rem;
  border: 1.5px solid
    ${({ $active }) =>
      $active ? brandColors.gold : `rgba(${brandRgb.ink}, 0.1)`};
  background: ${({ $active }) =>
    $active ? brandColors.pink50 : brandColors.ivory};
  color: ${brandColors.chocolate};
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${brandColors.gold};
    transform: translateY(-1px);
  }
`;

export const CatName = styled.span`
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.25;
`;

export const CatBlurb = styled.span`
  font-family: ${fontFamily.body};
  font-size: 0.7rem;
  line-height: 1.35;
  color: ${brandColors.gray600};
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${brandColors.gray600};

  &.span-2 {
    grid-column: 1 / -1;
  }

  input,
  select,
  textarea {
    min-height: 42px;
    padding: 0.55rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid rgba(${brandRgb.ink}, 0.14);
    background: ${brandColors.white};
    color: ${brandColors.chocolate};
    font-family: ${fontFamily.body};
    font-size: 0.875rem;
    font-weight: 500;
  }

  textarea {
    min-height: 88px;
    resize: vertical;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid rgba(${brandRgb.pink}, 0.35);
    border-color: ${brandColors.gold};
  }
`;

export const CountryLock = styled.div`
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0.55rem 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(${brandRgb.ink}, 0.1);
  background: ${brandColors.gray100};
  color: ${brandColors.chocolate};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const FormActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.1rem;
`;

export const WarnBanner = styled.p`
  margin: 0 0 1rem;
  padding: 0.75rem 0.9rem;
  border-radius: 0.25rem;
  background: #fff7ed;
  border: 1px solid #fdba74;
  color: #9a3412;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  line-height: 1.45;
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

export const ServiceCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.1rem 1.15rem 1.15rem;
  border-radius: 0.35rem;
  border: 1px solid rgba(${brandRgb.ink}, 0.1);
  background: ${brandColors.white};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: rgba(${brandRgb.pink}, 0.45);
    box-shadow: 0 10px 28px rgba(${brandRgb.ink}, 0.06);
  }
`;

export const ServiceTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const ServiceTitle = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${brandColors.chocolate};
  line-height: 1.25;
`;

export const StatusPill = styled.span<{ $live?: boolean }>`
  flex-shrink: 0;
  padding: 0.2rem 0.55rem;
  border-radius: 0.2rem;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${({ $live }) =>
    $live ? brandColors.success50 : brandColors.gray100};
  color: ${({ $live }) =>
    $live ? brandColors.success500 : brandColors.gray600};
`;

export const Price = styled.p`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${brandColors.brown};
`;

export const Meta = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  line-height: 1.45;
  color: ${brandColors.gray600};
  white-space: pre-wrap;
`;

export const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: auto;
  padding-top: 0.35rem;
`;

export const EmptyBlock = styled.div`
  padding: 2.5rem 1.25rem;
  text-align: center;
  border-radius: 0.35rem;
  border: 1px dashed rgba(${brandRgb.ink}, 0.18);
  background: ${brandColors.ivory};

  h3 {
    margin: 0 0 0.4rem;
    font-family: ${fontFamily.display};
    font-size: 1.15rem;
    color: ${brandColors.chocolate};
  }

  p {
    margin: 0 auto 1rem;
    max-width: 28rem;
    font-family: ${fontFamily.body};
    font-size: 0.875rem;
    color: ${brandColors.gray600};
  }
`;

export const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 40px;
  padding: 0.5rem 0.9rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(${brandRgb.ink}, 0.14);
  background: transparent;
  color: ${brandColors.chocolate};
  font-family: ${fontFamily.body};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;

  input {
    display: none;
  }

  &:hover {
    border-color: ${brandColors.gold};
    color: ${brandColors.brown};
  }
`;

export const ChipSection = styled.div`
  display: grid;
  gap: 0.55rem;
  margin-top: 1rem;
`;

export const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 0.5rem;
  margin-top: 0.65rem;
`;

export const ImagePreview = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.3rem;
  border: 1px solid rgba(${brandRgb.ink}, 0.1);
  background: ${brandColors.gray100};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    border: none;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.65);
    color: ${brandColors.white};
    cursor: pointer;
    font-size: 0.85rem;
    line-height: 1;
  }
`;
