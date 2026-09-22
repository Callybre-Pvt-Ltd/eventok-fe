import styled from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, fontSizes, media, radii } from '@/theme';

export const Wrap = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.span`
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.sm};
  font-weight: 800;
  color: ${brandColors.chocolate};
`;

export const Hint = styled.span`
  font-size: ${fontSizes.xs};
  color: ${brandColors.gray600};
`;

export const AddRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AddInput = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.7rem 0.9rem;
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  color: ${brandColors.chocolate};

  &::placeholder {
    color: ${brandColors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${brandColors.pink500};
    box-shadow: 0 0 0 3px rgba(${brandRgb.pink}, 0.15);
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 2.65rem;
  height: 2.65rem;
  border: none;
  border-radius: ${radii.md};
  background: ${brandColors.pink500};
  color: ${brandColors.white};
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: ${brandColors.pink600};
  }

  &:disabled {
    background: ${brandColors.tan};
    color: ${brandColors.gray400};
    cursor: not-allowed;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0.15rem 0 0;
  padding: 0;
  list-style: none;
`;

export const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.35rem 0.3rem 0.5rem;
  border-radius: ${radii.md};
  border: 1px solid ${brandColors.tan};
  background: ${brandColors.white};

  &:hover {
    border-color: ${brandColors.pink400};
  }

  ${media.belowSm} {
    gap: 0.2rem;
  }
`;

export const Bullet = styled.span`
  flex: 0 0 auto;
  width: 1.35rem;
  height: 1.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${radii.full};
  background: ${brandColors.pink100};
  color: ${brandColors.pink600};
  font-size: 0.65rem;
  font-weight: 800;
`;

export const RowInput = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.35rem 0.25rem;
  border: none;
  background: transparent;
  font-family: ${fontFamily.body};
  font-size: ${fontSizes.sm};
  font-weight: 500;
  color: ${brandColors.chocolate};

  &:focus {
    outline: none;
  }
`;

export const RowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 1.9rem;
  height: 1.9rem;
  border: none;
  border-radius: ${radii.sm};
  background: transparent;
  color: ${brandColors.gray400};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${brandColors.gray100};
    color: ${brandColors.chocolate};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

export const RemoveButton = styled(RowButton)`
  &:hover {
    background: ${brandColors.pink100};
    color: ${brandColors.danger500};
  }
`;

export const Empty = styled.p`
  margin: 0;
  padding: 0.85rem 0.9rem;
  border-radius: ${radii.md};
  border: 1px dashed ${brandColors.tan};
  font-size: ${fontSizes.xs};
  color: ${brandColors.gray400};
`;
