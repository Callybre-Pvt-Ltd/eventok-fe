import styled from 'styled-components';
import { space } from '../../tokens/spacing';

export const HeaderBlock = styled.header<{ $align: 'left' | 'center' }>`
  display: flex;
  flex-direction: column;
  gap: ${space[4]};
  margin-bottom: ${space[10]};
  max-width: ${({ $align }) => ($align === 'center' ? '640px' : '560px')};
  ${({ $align }) =>
    $align === 'center' && 'margin-inline: auto; text-align: center;'}
`;
