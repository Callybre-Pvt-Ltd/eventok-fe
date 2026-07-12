import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { ThemePalette } from '@/theme';
import { brandRgb } from '@/theme/brand';

export const TriggerBar = styled.button<{ $palette: ThemePalette }>`
  width: 100%;
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: 999px;
  padding: 14px 20px;
  background: ${({ $palette }) => $palette.surface};
  cursor: pointer;
  box-shadow: 0 4px 24px ${({ $palette }) => $palette.shadow};
  transition: box-shadow 0.3s, transform 0.3s;

  &:hover {
    box-shadow: 0 8px 32px rgba(${brandRgb.forest}, 0.15);
    transform: translateY(-2px);
  }
`;

export const TriggerInner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: inherit;
`;

export const TriggerPlaceholder = styled.span<{ $palette: ThemePalette }>`
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ $palette }) => $palette.textSecondary};
`;

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(${brandRgb.charcoal}, 0.55);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(1rem, 8vh, 4rem) 1rem;
`;

export const Modal = styled(motion.div)<{ $palette: ThemePalette }>`
  width: 100%;
  max-width: 640px;
  background: ${({ $palette }) => $palette.glass};
  backdrop-filter: blur(24px) saturate(1.5);
  border: 1px solid ${({ $palette }) => $palette.border};
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 24px 80px rgba(${brandRgb.charcoal}, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h2<{ $palette: ThemePalette }>`
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.375rem;
  font-weight: 700;
  color: ${({ $palette }) => $palette.text};
`;

export const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Fields = styled.div`
  display: grid;
  gap: 16px;
`;

export const Field = styled.div<{ $palette: ThemePalette }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label<{ $palette: ThemePalette }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ $palette }) => $palette.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const FieldInput = styled.input<{ $palette: ThemePalette }>`
  border: 1.5px solid ${({ $palette }) => $palette.border};
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 1rem;
  background: ${({ $palette }) => $palette.surface};
  color: ${({ $palette }) => $palette.text};
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ $palette }) => $palette.primary};
    box-shadow: 0 0 0 3px ${({ $palette }) => $palette.primaryLight};
  }
`;

export const Suggestions = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SuggestionGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

export const GroupLabel = styled.span<{ $palette: ThemePalette }>`
  width: 100%;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ $palette }) => $palette.textMuted};
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
`;

export const SuggestionChip = styled.button<{ $palette: ThemePalette }>`
  border: 1px solid ${({ $palette }) => $palette.border};
  background: ${({ $palette }) => $palette.surface};
  color: ${({ $palette }) => $palette.textSecondary};
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ $palette }) => $palette.primary};
    color: ${({ $palette }) => $palette.primary};
    background: ${({ $palette }) => $palette.primaryLight};
  }
`;

export const Footer = styled.div`
  margin-top: 24px;
`;
