import styled, { keyframes } from 'styled-components';
import { brandColors, brandRgb } from '@/theme/brand';
import { fontFamily, media } from '@/theme';

const softFloat = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(201, 162, 39, 0.28); }
  50% { box-shadow: 0 0 0 8px rgba(201, 162, 39, 0); }
`;

export const ProcessRoot = styled.section`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  color: ${brandColors.black};
  background: radial-gradient(
      ellipse 55% 40% at 0% 10%,
      rgba(255, 255, 255, 0.95),
      transparent 55%
    ),
    radial-gradient(
      ellipse 50% 45% at 100% 30%,
      rgba(${brandRgb.ivory}, 0.9),
      transparent 50%
    ),
    linear-gradient(
      180deg,
      ${brandColors.ivory} 0%,
      ${brandColors.cream} 48%,
      ${brandColors.tan} 100%
    );

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
`;

export const ProcessShell = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3.5rem, 8vw, 6.5rem) clamp(1rem, 4vw, 2.5rem);
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: end;
  margin-bottom: clamp(2.25rem, 5vw, 3.5rem);

  ${media.belowLg} {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

export const HeaderCopy = styled.div`
  max-width: 38rem;
`;

export const Eyebrow = styled.span`
  display: inline-block;
  margin-bottom: 0.85rem;
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${brandColors.gold};
`;

export const Title = styled.h2`
  margin: 0 0 1rem;
  font-family: ${fontFamily.display};
  font-size: clamp(2.15rem, 4.8vw, 3.6rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: ${brandColors.black};
  white-space: pre-line;
`;

export const Lead = styled.p`
  margin: 0;
  max-width: 34rem;
  font-family: ${fontFamily.body};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.8;
  color: ${brandColors.taupe};
`;

export const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;

  ${media.belowLg} {
    justify-content: flex-start;
  }
`;

export const TrustPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.1);
  background: rgba(255, 255, 255, 0.62);
  backdrop-filter: blur(10px);
  font-family: ${fontFamily.body};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${brandColors.brown};
`;

export const FlowBoard = styled.div`
  position: relative;
  margin-bottom: clamp(2.75rem, 6vw, 4rem);
  padding: clamp(1.15rem, 2.5vw, 1.6rem);
  border-radius: 24px;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 50px rgba(${brandRgb.black}, 0.05);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  scrollbar-width: thin;
`;

export const FlowTrack = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.65rem 0;
  padding: 0.35rem 0.25rem 0.5rem;

  ${media.md} {
    flex-wrap: nowrap;
    min-width: max-content;
    gap: 0;
  }
`;

export const FlowSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
`;

export const FlowNode = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  min-width: 6.5rem;
  padding: 0 0.35rem;
`;

export const FlowDot = styled.span<{ $accent?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${({ $accent }) =>
    $accent ? brandColors.chocolate : 'rgba(255, 255, 255, 0.9)'};
  color: ${({ $accent }) => ($accent ? brandColors.white : brandColors.brown)};
  border: 1px solid
    ${({ $accent }) =>
      $accent ? brandColors.chocolate : `rgba(${brandRgb.chocolate}, 0.12)`};
  box-shadow: 0 10px 24px rgba(${brandRgb.black}, 0.06);
  font-family: ${fontFamily.display};
  font-size: 0.7rem;
  font-weight: 700;
`;

export const FlowLabel = styled.span`
  max-width: 6.2rem;
  text-align: center;
  font-family: ${fontFamily.body};
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.35;
  color: ${brandColors.brown};
`;

export const FlowBridge = styled.div`
  display: none;
  flex: 1 1 auto;
  min-width: 2.5rem;
  height: 2px;
  margin-top: -1.35rem;
  background: linear-gradient(
    90deg,
    rgba(${brandRgb.chocolate}, 0.08),
    rgba(201, 162, 39, 0.55),
    rgba(${brandRgb.chocolate}, 0.08)
  );
  opacity: 0.85;

  ${media.md} {
    display: block;
  }
`;

export const Journey = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3.5rem 1fr;
  gap: clamp(1rem, 3vw, 2rem);

  ${media.belowMd} {
    grid-template-columns: 1fr;
  }
`;

export const SpineCol = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  ${media.belowMd} {
    display: none;
  }
`;

export const SpineSvg = styled.svg`
  position: sticky;
  top: 7rem;
  width: 24px;
  height: min(72vh, 640px);
  overflow: visible;
`;

export const StepsCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 6vw, 4.5rem);
`;

export const Step = styled.article<{ $flip?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  align-items: center;

  ${({ $flip }) =>
    $flip
      ? `
    direction: rtl;
    & > * { direction: ltr; }
  `
      : ''}

  ${media.belowLg} {
    grid-template-columns: 1fr;
    direction: ltr;
  }

  &:hover [data-how-visual] {
    transform: translateY(-4px);
  }

  &:hover [data-how-icon] {
    transform: scale(1.06);
  }
`;

export const StepCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: ${fontFamily.display};
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${brandColors.gold};
`;

export const StepTitle = styled.h3`
  margin: 0;
  font-family: ${fontFamily.display};
  font-size: clamp(1.45rem, 2.6vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: ${brandColors.black};
`;

export const StepBody = styled.p`
  margin: 0;
  font-family: ${fontFamily.body};
  font-size: 0.975rem;
  font-weight: 500;
  line-height: 1.75;
  color: ${brandColors.taupe};
`;

export const StepHighlight = styled.p`
  margin: 0;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(201, 162, 39, 0.28);
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.55;
  color: ${brandColors.chocolate};
`;

export const VisualFrame = styled.div`
  position: relative;
  min-height: 16rem;
  border-radius: 24px;
  border: 1px solid rgba(${brandRgb.chocolate}, 0.08);
  background: radial-gradient(
      circle at 20% 20%,
      rgba(255, 255, 255, 0.85),
      transparent 50%
    ),
    rgba(255, 255, 255, 0.48);
  backdrop-filter: blur(16px);
  box-shadow: 0 22px 55px rgba(${brandRgb.black}, 0.07);
  overflow: hidden;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const VisualInner = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  min-height: 16rem;
  padding: 1.15rem;
`;

export const VendorStack = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  height: 100%;
`;

export const VendorMini = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background: ${brandColors.tan};
  box-shadow: 0 12px 28px rgba(${brandRgb.black}, 0.08);
  animation: ${softFloat} 5s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: 0.4s;
    margin-top: 1rem;
  }

  &:nth-child(3) {
    animation-delay: 0.8s;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const VendorImg = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  transition: transform 0.8s ease;

  ${VendorMini}:hover & {
    transform: scale(1.05);
  }
`;

export const VendorMeta = styled.div`
  padding: 0.55rem 0.6rem 0.7rem;
  background: rgba(255, 255, 255, 0.92);
`;

export const VendorName = styled.span`
  display: block;
  font-family: ${fontFamily.display};
  font-size: 0.7rem;
  font-weight: 700;
  color: ${brandColors.black};
`;

export const VendorLock = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  margin-top: 0.2rem;
  font-size: 0.625rem;
  font-weight: 600;
  color: ${brandColors.taupe};
`;

export const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.85rem;
`;

export const Tag = styled.span`
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  background: rgba(${brandRgb.chocolate}, 0.06);
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${brandColors.brown};
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.55rem;
  height: 100%;
  min-height: 14rem;
`;

export const GalleryCell = styled.div<{ $hero?: boolean }>`
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  grid-row: ${({ $hero }) => ($hero ? '1 / span 2' : 'auto')};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover img {
    transform: scale(1.07);
  }
`;

export const EnquireScene = styled.div`
  position: relative;
  height: 100%;
  min-height: 15rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 0.5rem;
`;

export const Actor = styled.div<{ $role: 'customer' | 'admin' | 'vendor' }>`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  width: 5.5rem;
`;

export const ActorOrb = styled.span<{ $role: 'customer' | 'admin' | 'vendor' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  background: ${({ $role }) =>
    $role === 'admin' ? brandColors.chocolate : 'rgba(255, 255, 255, 0.92)'};
  color: ${({ $role }) =>
    $role === 'admin' ? brandColors.white : brandColors.brown};
  border: 1px solid
    ${({ $role }) =>
      $role === 'admin'
        ? brandColors.gold
        : `rgba(${brandRgb.chocolate}, 0.1)`};
  animation: ${({ $role }) => ($role === 'admin' ? pulseGlow : 'none')} 2.8s
    ease-in-out infinite;
  transition: transform 0.35s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ActorLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 700;
  text-align: center;
  color: ${brandColors.brown};
`;

export const EnquireSvg = styled.svg`
  position: absolute;
  inset: 18% 12% 35% 12%;
  width: auto;
  height: auto;
  overflow: visible;
  pointer-events: none;
`;

export const Packet = styled.span`
  position: absolute;
  z-index: 3;
  left: 12%;
  top: 42%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${brandColors.gold};
  color: ${brandColors.chocolate};
  box-shadow: 0 8px 20px rgba(${brandRgb.black}, 0.15);
`;

export const BridgeScene = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.2fr) auto minmax(
      0,
      1fr
    );
  gap: 0.5rem;
  align-items: center;
  min-height: 14rem;
  padding: 0.5rem;

  ${media.belowSm} {
    grid-template-columns: 1fr;
    justify-items: center;

    & > div:nth-child(even) {
      transform: rotate(90deg);
    }
  }
`;

export const BridgeCard = styled.div<{ $center?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 8.5rem;
  padding: 1rem 0.75rem;
  border-radius: 18px;
  text-align: center;
  background: ${({ $center }) =>
    $center ? brandColors.chocolate : 'rgba(255, 255, 255, 0.72)'};
  color: ${({ $center }) => ($center ? brandColors.white : brandColors.brown)};
  border: 1px solid
    ${({ $center }) =>
      $center ? brandColors.gold : `rgba(${brandRgb.chocolate}, 0.08)`};
  box-shadow: 0 16px 36px rgba(${brandRgb.black}, 0.08);
`;

export const BridgeTitle = styled.strong`
  font-family: ${fontFamily.display};
  font-size: 0.85rem;
  font-weight: 700;
`;

export const BridgeNote = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  line-height: 1.4;
  opacity: 0.85;
`;

export const BridgeArrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  color: ${brandColors.gold};
  font-size: 1rem;
  font-weight: 700;
`;

export const PayScene = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  min-height: 14rem;
  text-align: center;
`;

export const PayCheck = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4.25rem;
  height: 4.25rem;
  border-radius: 50%;
  background: linear-gradient(145deg, ${brandColors.gold}, #dfc15a);
  color: ${brandColors.chocolate};
  box-shadow: 0 16px 40px rgba(${brandRgb.black}, 0.12);
  animation: ${pulseGlow} 2.6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PayTitle = styled.strong`
  font-family: ${fontFamily.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${brandColors.black};
`;

export const PayMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
`;

export const CelebrateScene = styled.div`
  position: relative;
  min-height: 15rem;
  border-radius: 18px;
  overflow: hidden;
`;

export const CelebrateImg = styled.img`
  width: 100%;
  height: 100%;
  min-height: 15rem;
  object-fit: cover;
  transition: transform 1s ease;

  ${CelebrateScene}:hover & {
    transform: scale(1.05);
  }
`;

export const CelebrateOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.15rem;
  background: linear-gradient(
    180deg,
    transparent 35%,
    rgba(${brandRgb.black}, 0.72) 100%
  );
  color: ${brandColors.white};
`;

export const CelebrateTitle = styled.strong`
  font-family: ${fontFamily.display};
  font-size: 1.15rem;
  font-weight: 700;
`;

export const CelebrateNote = styled.span`
  margin-top: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.88;
`;

export const FootTrust = styled.p`
  margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fontFamily.body};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${brandColors.taupe};

  svg {
    color: ${brandColors.gold};
    flex-shrink: 0;
  }
`;
