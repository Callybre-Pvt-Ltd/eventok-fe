import styled from 'styled-components';
import { brandColors } from '@/theme/brand';

export const PageWrap = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background: ${brandColors.ivory};
  overflow-x: clip;
`;

export const Main = styled.main`
  flex: 1;
`;

export const HeroViewport = styled.div`
  position: relative;
`;

export const LandingAnchor = styled.section`
  scroll-margin-top: 5.5rem;
`;

export const ContactSection = styled.div`
  padding: clamp(2.5rem, 6vw, 4rem) clamp(1rem, 4vw, 1.5rem);
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`;
