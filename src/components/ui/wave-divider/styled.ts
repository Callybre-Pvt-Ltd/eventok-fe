import styled from 'styled-components';

export const WaveRoot = styled.div<{ $flip?: boolean; $overlap?: boolean }>`
  position: relative;
  width: 100%;
  line-height: 0;
  margin-top: ${({ $overlap }) => ($overlap ? '-1px' : '0')};
  transform: ${({ $flip }) => ($flip ? 'scaleY(-1)' : 'none')};
  z-index: 5;
  pointer-events: none;
`;

export const WaveSvg = styled.svg<{ $height: string }>`
  display: block;
  width: 100%;
  height: ${({ $height }) => $height};
`;

export const WaveOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 6;
  line-height: 0;
  pointer-events: none;
`;
