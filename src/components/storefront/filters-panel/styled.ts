import styled from 'styled-components';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Panel = styled.aside<{ $inSheet?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: ${({ $inSheet }) => ($inSheet ? '0' : radii.xl)};
  border: ${({ $inSheet }) =>
    $inSheet ? 'none' : '1px solid var(--color-border)'};
  background: ${({ $inSheet }) =>
    $inSheet ? 'transparent' : 'var(--color-surface)'};
  padding: ${({ $inSheet }) => ($inSheet ? '0 0 1rem' : '1.25rem')};
  box-shadow: ${({ $inSheet }) =>
    $inSheet
      ? 'none'
      : '0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 4px 16px -4px rgba(0, 0, 0, 0.06)'};
  transition: background 0.25s ease, border-color 0.25s ease;

  [data-theme='light'] & {
    background: ${({ $inSheet }) => ($inSheet ? 'transparent' : '#ffffff')};
  }

  [data-theme='dark'] & {
    box-shadow: ${({ $inSheet }) =>
      $inSheet ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.28)'};
  }
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--color-border);
`;

export const HeadTitle = styled.h2`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.md};
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--color-text);
`;

export const HeadMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.15rem 0.55rem;
  border-radius: ${radii.full};
  background: rgba(234, 88, 12, 0.12);
  color: var(--color-primary);
  font-size: 0.6875rem;
  font-weight: 800;
`;

export const ResetButton = styled.button<{ $visible?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid transparent;
  border-radius: ${radii.full};
  background: transparent;
  color: ${({ $visible }) =>
    $visible ? 'var(--color-primary)' : 'var(--color-text-muted)'};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  cursor: ${({ $visible }) => ($visible ? 'pointer' : 'default')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0.45)};
  transition: background 0.18s ease, color 0.18s ease, transform 0.12s ease;

  &:hover:not(:disabled) {
    background: rgba(234, 88, 12, 0.08);
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }
`;

export const Group = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const GroupToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: var(--color-text);
`;

export const GroupTitleWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
`;

export const GroupTitle = styled.span`
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
`;

export const SectionCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.15rem;
  height: 1.15rem;
  padding: 0 0.35rem;
  border-radius: ${radii.full};
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 800;
`;

export const ChevronIcon = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.2s ease-out;
`;

export const GroupBody = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.875rem;
`;

export const PresetGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const PresetPill = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.75rem;
  border-radius: ${radii.full};
  border: 1px solid
    ${({ $active }) =>
      $active ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $active }) =>
    $active ? 'rgba(234, 88, 12, 0.1)' : 'var(--color-bg-alt)'};
  color: ${({ $active }) =>
    $active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: ${({ $active }) => ($active ? '700' : '600')};
  cursor: pointer;
  transition: all 0.18s ease-out;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const PriceInputsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.5rem;
`;

export const PriceInputBox = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.4rem 0.65rem;
  border-radius: ${radii.md};
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  transition: border-color 0.18s ease;

  &:focus-within {
    border-color: var(--color-primary);
  }
`;

export const PriceInputLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
`;

export const PriceInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 700;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const PriceDash = styled.span`
  color: var(--color-text-muted);
  font-weight: 700;
  font-size: ${fontSizes.xs};
`;

export const Slider = styled.input<{ $fill: number }>`
  width: 100%;
  appearance: none;
  height: 6px;
  border-radius: ${radii.full};
  background: ${({ $fill }) =>
    `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${$fill}%, var(--color-border) ${$fill}%, var(--color-border) 100%)`};
  outline: none;
  cursor: pointer;
  margin-top: 0.25rem;

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.22);
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1.15rem;
    height: 1.15rem;
    border-radius: ${radii.full};
    background: #ffffff;
    border: 4px solid var(--color-primary);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  &:active::-webkit-slider-thumb {
    transform: scale(1.14);
  }

  &::-moz-range-thumb {
    width: 1.15rem;
    height: 1.15rem;
    border-radius: ${radii.full};
    background: #ffffff;
    border: 4px solid var(--color-primary);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
    cursor: pointer;
  }
`;

export const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${fontSizes.xs};
  font-weight: 600;
  color: var(--color-text-muted);
`;

export const MiniSearchWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const MiniSearchIcon = styled.span`
  position: absolute;
  left: 0.65rem;
  display: inline-flex;
  color: var(--color-text-muted);
  pointer-events: none;
`;

export const MiniSearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.1rem;
  border-radius: ${radii.md};
  border: 1px solid var(--color-border);
  background: var(--color-bg-alt);
  color: var(--color-text);
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.xs};
  font-weight: 500;
  outline: none;
  transition: border-color 0.18s ease, background 0.18s ease;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-primary);
    background: var(--color-surface);
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 16.5rem;
  overflow-y: auto;
  padding-right: 0.25rem;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: ${radii.full};
    background: var(--color-border);
  }

  ${media.belowLg} {
    max-height: none;
  }
`;

export const TagRow = styled.label<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border-radius: ${radii.md};
  border: 1px solid
    ${({ $checked }) => ($checked ? 'rgba(234, 88, 12, 0.28)' : 'transparent')};
  background: ${({ $checked }) =>
    $checked ? 'rgba(234, 88, 12, 0.06)' : 'transparent'};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: ${({ $checked }) => ($checked ? '700' : '500')};
  color: ${({ $checked }) =>
    $checked ? 'var(--color-text)' : 'var(--color-text-secondary)'};
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${({ $checked }) =>
      $checked ? 'rgba(234, 88, 12, 0.09)' : 'var(--color-bg-alt)'};
    color: var(--color-text);
  }
`;

export const TagLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-width: 0;
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

export const CustomCheck = styled.span<{ $checked?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1.5px solid
    ${({ $checked }) =>
      $checked ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $checked }) =>
    $checked ? 'var(--color-primary)' : 'var(--color-surface)'};
  color: #ffffff;
  transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1);

  ${TagRow}:focus-within & {
    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.2);
  }
`;

export const TagLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TagCount = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  color: var(--color-text-muted);
  padding: 0.1rem 0.45rem;
  border-radius: ${radii.full};
  background: var(--color-bg-alt);
  flex-shrink: 0;
`;

export const EmptyHint = styled.p`
  margin: 0.25rem 0;
  font-size: ${fontSizes.xs};
  color: var(--color-text-muted);
  text-align: center;
  padding: 0.5rem;
`;
