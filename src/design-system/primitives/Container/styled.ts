import styled from 'styled-components';
import { container } from '../../tokens/spacing';

export const Children = styled.div<{ $narrow?: boolean; $wide?: boolean }>`
  max-width: ${({ $narrow, $wide }) =>
    $narrow ? container.narrow : $wide ? container.wide : container.max};
  margin-inline: auto;
  padding-inline: ${container.padding};
  width: 100%;
`;
