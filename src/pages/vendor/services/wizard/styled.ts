import styled from 'styled-components';
import type { ThemePalette } from '@/theme';
import {
  fontFamily,
  fontSizes,
  fontWeight,
  media,
  radii,
  shadows,
} from '@/theme';
import { brandColors, brandRgb } from '@/theme/brand';

export const Shell = styled.div`
  max-width: 68rem;
  margin: 0 auto;
  padding-bottom: 7rem;
`;

export const TopBar = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1.75rem;

  ${media.belowSm} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const TopBarLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Eyebrow = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${brandColors.pink500};
`;

export const Heading = styled.h1<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.h3};
  font-weight: ${fontWeight.bold};
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${({ $palette }) => $palette.text};
`;

export const Lead = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  max-width: 38rem;
  font-size: ${fontSizes.md};
  font-weight: ${fontWeight.regular};
  line-height: 1.6;
  color: ${({ $palette }) => $palette.textMuted};
`;

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

export const DraftSavedTag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.7rem;
  border-radius: ${radii.full};
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.medium};
  color: ${brandColors.success500};
  background: ${brandColors.success50};
`;

export const StepRail = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0 0 2rem;
  padding: 0.5rem;
  gap: 0.25rem;
  overflow-x: auto;
  border-radius: ${radii.full};
  background: ${brandColors.gray100};

  ${media.belowSm} {
    display: none;
  }
`;

export const StepItem = styled.li<{
  $state: 'done' | 'active' | 'upcoming';
  $clickable: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: ${radii.full};
  white-space: nowrap;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  background: ${({ $state }) =>
    $state === 'active' ? brandColors.white : 'transparent'};
  box-shadow: ${({ $state }) => ($state === 'active' ? shadows.sm : 'none')};
  color: ${({ $state }) =>
    $state === 'upcoming' ? brandColors.gray400 : brandColors.chocolate};
  font-size: ${fontSizes.xs};
  font-weight: ${({ $state }) =>
    $state === 'active' ? fontWeight.bold : fontWeight.body};
  letter-spacing: 0.01em;
  transition: background 0.18s ease, color 0.18s ease;
`;

export const StepDot = styled.span<{ $state: 'done' | 'active' | 'upcoming' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: ${radii.full};
  font-size: 0.68rem;
  font-weight: ${fontWeight.bold};
  flex-shrink: 0;
  background: ${({ $state }) =>
    $state === 'upcoming' ? brandColors.sand : brandColors.pink500};
  color: ${({ $state }) =>
    $state === 'upcoming' ? brandColors.gray600 : brandColors.white};
`;

export const MobileStepHeader = styled.div`
  display: none;
  margin-bottom: 1.5rem;

  ${media.belowSm} {
    display: block;
  }
`;

export const MobileStepLabel = styled.p<{ $palette: ThemePalette }>`
  margin: 0 0 0.6rem;
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $palette }) => $palette.textMuted};
`;

export const MobileProgressTrack = styled.div`
  height: 4px;
  border-radius: ${radii.full};
  background: ${brandColors.gray200};
  overflow: hidden;
`;

export const MobileProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background: ${brandColors.pink500};
  transition: width 0.25s ease;
`;

export const StepBody = styled.section<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border-radius: ${radii.lg};
  border: 1px solid ${brandColors.gray200};
  background: ${({ $palette }) => $palette.surface};
  box-shadow: ${shadows.sm};

  ${media.belowSm} {
    padding: 1.25rem;
    gap: 1.5rem;
  }
`;

export const StepIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${brandColors.gray200};
`;

export const StepHeading = styled.h2<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.h4};
  font-weight: ${fontWeight.bold};
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: ${({ $palette }) => $palette.text};
`;

export const StepLead = styled.p<{ $palette: ThemePalette }>`
  margin: 0;
  max-width: 42rem;
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeight.regular};
  line-height: 1.65;
  color: ${({ $palette }) => $palette.textMuted};
`;

export const FieldHint = styled.p`
  margin: 0.3rem 0 0;
  font-size: ${fontSizes.xs};
  line-height: 1.5;
  color: ${brandColors.gray600};
`;

export const Divider = styled.div`
  height: 1px;
  background: ${brandColors.gray200};
  margin: 0 0 1.5rem;
`;

export const FooterBar = styled.div<{ $palette: ThemePalette }>`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 1.5rem 0 0;
  padding: 1rem 1.25rem;
  border-radius: ${radii.md};
  background: ${({ $palette }) => $palette.surface};
  border: 1px solid ${brandColors.gray200};
  box-shadow: ${shadows.md};
  z-index: 10;
`;

export const FooterActions = styled.div`
  display: flex;
  gap: 0.6rem;
`;

export const PriceRow = styled.div<{ $final?: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
  font-size: ${({ $final }) => ($final ? fontSizes.lg : fontSizes.sm)};
  font-weight: ${({ $final }) =>
    $final ? fontWeight.bold : fontWeight.regular};
  border-top: ${({ $final }) =>
    $final ? `1px solid ${brandColors.gray200}` : 'none'};
  margin-top: ${({ $final }) => ($final ? '0.5rem' : '0')};
  padding-top: ${({ $final }) => ($final ? '0.75rem' : '0.5rem')};
`;

export const PriceRowLabel = styled.span<{ $palette: ThemePalette }>`
  color: ${({ $palette }) => $palette.textMuted};
`;

export const PriceRowValue = styled.span<{ $accent?: boolean }>`
  font-variant-numeric: tabular-nums;
  color: ${({ $accent }) => ($accent ? brandColors.pink500 : 'inherit')};
`;

export const EstimateNote = styled.p`
  margin: 0.75rem 0 0;
  font-size: ${fontSizes.xs};
  line-height: 1.5;
  color: ${brandColors.gray600};
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
  gap: 0.75rem;
`;

export const CategoryTile = styled.button<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: ${radii.md};
  border: 1.5px solid
    ${({ $active }) => ($active ? brandColors.pink500 : brandColors.gray200)};
  background: ${({ $active }) =>
    $active ? brandColors.pink50 : brandColors.white};
  cursor: pointer;
  text-align: left;
  transition: border-color 0.18s ease, transform 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    border-color: ${brandColors.pink500};
    transform: translateY(-2px);
    box-shadow: ${shadows.md};
  }
`;

export const CatIconWrap = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: ${radii.sm};
  background: ${({ $active }) =>
    $active ? brandColors.pink500 : brandColors.gray100};
  color: ${({ $active }) =>
    $active ? brandColors.white : brandColors.pink500};
  margin-bottom: 0.25rem;
`;

export const CatName = styled.span`
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeight.bold};
  line-height: 1.3;
  color: ${brandColors.chocolate};
`;

export const CatBlurb = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.regular};
  line-height: 1.45;
  color: ${brandColors.gray600};
`;

export const CharCount = styled.span`
  display: block;
  margin-top: 0.35rem;
  font-size: ${fontSizes.xs};
  color: ${brandColors.gray400};
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

export const UploadZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2.5rem 1.25rem;
  border: 1.5px dashed ${brandColors.sand};
  border-radius: ${radii.md};
  color: ${brandColors.pink500};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeight.medium};
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease;
  background: ${brandColors.cream};

  &:hover {
    border-color: ${brandColors.pink500};
    background: ${brandColors.pink50};
  }

  input {
    display: none;
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
`;

export const PhotoTile = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: ${radii.md};
  overflow: hidden;
  border: 1px solid ${brandColors.gray200};
  background: ${brandColors.ink900};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PhotoTag = styled.span<{ $cover?: boolean }>`
  position: absolute;
  top: 0.4rem;
  left: 0.4rem;
  padding: 0.15rem 0.5rem;
  border-radius: ${radii.full};
  background: ${({ $cover }) =>
    $cover ? brandColors.pink500 : `rgba(${brandRgb.ink}, 0.75)`};
  color: ${brandColors.white};
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const PhotoControls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0.5rem;
  background: linear-gradient(to top, rgba(${brandRgb.ink}, 0.8), transparent);
  gap: 0.25rem;
`;

export const PhotoBtn = styled.button`
  background: ${brandColors.white};
  border: none;
  padding: 0.25rem 0.4rem;
  border-radius: ${radii.sm};
  cursor: pointer;
  color: ${brandColors.chocolate};
  display: inline-flex;
  align-items: center;
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.medium};

  &:hover {
    color: ${brandColors.pink500};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const DeletePhotoBtn = styled(PhotoBtn)`
  &:hover {
    color: ${brandColors.danger500};
  }
`;

export const PolicySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const PolicySubhead = styled.h3`
  margin: 0;
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

export const PolicyWindowSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

export const WindowOptionBtn = styled.button<{ $selected: boolean }>`
  padding: 0.5rem 0.9rem;
  border-radius: ${radii.sm};
  border: 1px solid
    ${({ $selected }) => ($selected ? brandColors.pink500 : brandColors.sand)};
  background: ${({ $selected }) =>
    $selected ? brandColors.pink50 : brandColors.white};
  color: ${({ $selected }) =>
    $selected ? brandColors.pink600 : brandColors.chocolate};
  font-size: ${fontSizes.sm};
  font-weight: ${fontWeight.body};
  cursor: pointer;
  transition: border-color 0.18s ease, background 0.18s ease;

  &:hover {
    border-color: ${brandColors.pink500};
  }
`;

export const ReviewPreviewWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${brandColors.cream};
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.gray200};
`;

export const ReviewCover = styled.div`
  width: 100%;
  max-height: 20rem;
  border-radius: ${radii.md};
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    max-height: 20rem;
    object-fit: cover;
  }
`;

export const ReviewGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5.5rem, 1fr));
  gap: 0.5rem;
`;

export const ReviewImg = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${radii.sm};
  border: 1px solid ${brandColors.gray200};
`;

export const ReviewBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid ${brandColors.gray200};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const ReviewLabel = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandColors.gray600};
`;

export const ReviewValue = styled.span<{ $palette: ThemePalette }>`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeight.regular};
  color: ${({ $palette }) => $palette.text};
  white-space: pre-line;
  line-height: 1.6;
`;

export const SuccessWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3.5rem 1rem;
  gap: 0.75rem;
`;

export const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: ${radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${brandColors.success50};
  color: ${brandColors.success500};
  margin-bottom: 0.5rem;
`;

export const PricePanel = styled.div`
  padding: 1.25rem;
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.gray200};
  background: ${brandColors.cream};
`;

export const ReviewPricePanel = styled(PricePanel)`
  margin-top: 0.5rem;
  background: ${brandColors.white};
`;

export const UploadHint = styled.span`
  font-size: ${fontSizes.xs};
  font-weight: ${fontWeight.regular};
  color: ${brandColors.gray400};
`;

export const PhotoControlGroup = styled.div`
  display: flex;
  gap: 0.2rem;
`;

export const ReviewHeadline = styled.strong`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeight.bold};
  letter-spacing: -0.01em;
`;

export const PriceInputWrap = styled.div`
  .ant-input-number {
    width: 100%;
  }

  .ant-input-number-input {
    font-size: ${fontSizes.xxl};
    font-weight: ${fontWeight.bold};
    height: 3rem;
  }
`;
