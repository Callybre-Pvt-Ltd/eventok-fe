import styled from 'styled-components';
import { space } from '@/design-system';

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${space[6]};
  margin-bottom: ${space[8]};
  flex-wrap: wrap;
`;
