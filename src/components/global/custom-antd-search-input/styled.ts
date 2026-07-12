import styled from 'styled-components';
import { Input } from 'antd';
import { palette } from '@/theme';

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledSearchInput = styled(Input)`
  border-radius: 12px;
  padding-left: 40px;
  height: 44px;
  border-color: ${palette.border};
  font-family: inherit;

  &:hover,
  &:focus {
    border-color: ${palette.primary};
  }
`;

export const SearchIconWrap = styled.span`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${palette.textMuted};
  display: flex;
  pointer-events: none;
  z-index: 1;
`;
