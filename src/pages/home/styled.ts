import styled from 'styled-components';

export const PageWrap = styled.div`
  width: 100%;
  background-color: var(--color-bg);
  background-image: radial-gradient(
      circle at 10% 8%,
      rgba(196, 181, 253, 0.28) 0%,
      transparent 42%
    ),
    radial-gradient(
      circle at 90% 12%,
      rgba(147, 197, 253, 0.25) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 32%,
      rgba(253, 164, 175, 0.14) 0%,
      transparent 38%
    ),
    radial-gradient(
      circle at 12% 58%,
      rgba(165, 180, 252, 0.2) 0%,
      transparent 44%
    ),
    radial-gradient(
      circle at 88% 75%,
      rgba(196, 181, 253, 0.22) 0%,
      transparent 46%
    );
  background-repeat: no-repeat;
  color: var(--color-text);
  overflow-x: clip;
  position: relative;

  [data-theme='dark'] & {
    background-color: var(--color-bg);
    background-image: radial-gradient(
        circle at 10% 8%,
        rgba(124, 58, 237, 0.16) 0%,
        transparent 42%
      ),
      radial-gradient(
        circle at 90% 12%,
        rgba(99, 102, 241, 0.14) 0%,
        transparent 40%
      ),
      radial-gradient(
        circle at 50% 32%,
        rgba(244, 63, 94, 0.08) 0%,
        transparent 38%
      ),
      radial-gradient(
        circle at 12% 58%,
        rgba(124, 58, 237, 0.12) 0%,
        transparent 44%
      ),
      radial-gradient(
        circle at 88% 75%,
        rgba(147, 197, 253, 0.1) 0%,
        transparent 46%
      );
  }
`;
