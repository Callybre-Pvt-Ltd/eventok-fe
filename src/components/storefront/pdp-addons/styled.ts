import styled from 'styled-components';
import { brandColors, fontFamily, fontSizes, fontWeight, radii } from '@/theme';

export const Wrap = styled.section`
  margin-top: 1.5rem;
  padding: 1.25rem;
  border: 1px solid ${brandColors.gray200};
  border-radius: ${radii.md};
  background: ${brandColors.white};
`;

export const Title = styled.h2`
  margin: 0 0 0.25rem;
  font-family: ${fontFamily.display};
  font-size: ${fontSizes.xl};
  font-weight: ${fontWeight.bold};
  color: ${brandColors.chocolate};
`;

export const Subtitle = styled.p`
  margin: 0 0 1rem;
  font-size: ${fontSizes.sm};
  color: ${brandColors.gray600};
`;

export const List = styled.ul`
  list-style: none;
  display: grid;
  gap: 0.6rem;
`;

export const Row = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0.9rem;
  border: 1px solid ${brandColors.gray200};
  border-radius: ${radii.sm};
  background: ${brandColors.cream};
`;

export const RowMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const Name = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeight.medium};
  color: ${brandColors.chocolate};
`;

export const Description = styled.span`
  font-size: ${fontSizes.sm};
  color: ${brandColors.gray600};
`;

export const Price = styled.span`
  font-size: ${fontSizes.md};
  font-weight: ${fontWeight.bold};
  color: ${brandColors.pink500};
  white-space: nowrap;
`;
