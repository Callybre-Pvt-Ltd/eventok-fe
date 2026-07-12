import styled from 'styled-components';
import {
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
  ViewAllLink,
} from '../shared/styled';

export {
  Section,
  SectionHeader,
  SectionInner,
  SectionSubtitle,
  SectionTitle,
  ViewAllLink,
};

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
`;
