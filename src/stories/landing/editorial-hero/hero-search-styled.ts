import styled from 'styled-components';
import { media } from '@/theme';

export const SearchWrap = styled.div`
  margin-bottom: 1.25rem;
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #ebebeb;
  border-radius: 999px;
  padding: 0.5rem;
  box-shadow: 0 8px 32px rgba(24, 24, 27, 0.08);

  ${media.md} {
    flex-direction: row;
    align-items: stretch;
    border-radius: 999px;
    padding: 0.375rem 0.375rem 0.375rem 0;
  }
`;

export const SearchField = styled.div<{ $divider?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  min-width: 0;

  ${media.md} {
    padding: 0.875rem 1.5rem;

    ${({ $divider }) =>
      $divider &&
      `
      border-left: 1px solid #f0f0f0;
    `}
  }
`;

export const FieldLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #18181b;
  margin-bottom: 0.25rem;
`;

export const FieldInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  padding: 0;
  font-size: 0.9375rem;
  font-family: inherit;
  color: #52525b;
  outline: none;

  &::placeholder {
    color: #a1a1aa;
  }
`;

export const SearchButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.25rem;
  padding: 0 1.5rem;
  min-height: 3rem;
  border: none;
  border-radius: 999px;
  background: #18181b;
  color: #ffffff;
  font-size: 0.9375rem;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #27272a;
    transform: scale(1.02);
  }

  ${media.md} {
    min-height: 3.25rem;
    padding: 0 1.75rem;
  }
`;
