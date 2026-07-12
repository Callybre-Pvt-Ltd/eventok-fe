/**
 * EVENTOK DESIGN SYSTEM — Motion
 *
 * Animations GUIDE the user through the story.
 * Never decorative. Always purposeful.
 */

import { shadows } from './spacing';

export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.55,
  reveal: 0.7,
  hero: 0.9,
} as const;

export const easing = {
  /** Default — confident deceleration */
  out: [0.22, 1, 0.36, 1] as const,
  /** Entering elements */
  in: [0.64, 0, 0.78, 0] as const,
  /** Playful micro-interactions */
  spring: [0.34, 1.56, 0.64, 1] as const,
  /** Smooth scroll-linked */
  linear: [0, 0, 1, 1] as const,
} as const;

export const motionPresets = {
  /** Scroll reveal — content enters as user discovers */
  revealUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.reveal, ease: easing.out },
    },
  },
  revealLeft: {
    hidden: { opacity: 0, x: -48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.reveal, ease: easing.out },
    },
  },
  revealRight: {
    hidden: { opacity: 0, x: 48 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.reveal, ease: easing.out },
    },
  },
  /** Stagger children in lists/grids */
  stagger: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  },
  /** Photo ken-burns subtle zoom */
  photoZoom: {
    rest: { scale: 1 },
    hover: {
      scale: 1.04,
      transition: { duration: duration.slow, ease: easing.out },
    },
  },
  /** Card lift — invitation to explore */
  cardLift: {
    rest: { y: 0, boxShadow: shadows.md },
    hover: {
      y: -6,
      transition: { duration: duration.normal, ease: easing.out },
    },
  },
} as const;

export const viewport = {
  once: true,
  margin: '-60px' as const,
  amount: 0.2 as const,
};
