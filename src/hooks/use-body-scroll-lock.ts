import { useEffect } from 'react';

/**
 * Global reference-counted scroll locker.
 * Handles both standard document body AND documentElement (html),
 * because html is the root scroll container when overflow-x: clip is active.
 */
let lockCount = 0;
let prevHtmlOverflow = '';
let prevBodyOverflow = '';
let prevHtmlOverscroll = '';
let prevBodyOverscroll = '';

export function acquireScrollLock(): void {
  if (typeof document === 'undefined') return;

  if (lockCount === 0) {
    prevHtmlOverflow = document.documentElement.style.overflow;
    prevBodyOverflow = document.body.style.overflow;
    prevHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    prevBodyOverscroll = document.body.style.overscrollBehavior;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overscrollBehavior = 'none';

    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
  }
  lockCount++;
}

export function releaseScrollLock(): void {
  if (typeof document === 'undefined') return;

  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.documentElement.style.overflow = prevHtmlOverflow;
    document.body.style.overflow = prevBodyOverflow;
    document.documentElement.style.overscrollBehavior = prevHtmlOverscroll;
    document.body.style.overscrollBehavior = prevBodyOverscroll;

    document.documentElement.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }
}

/**
 * Automatically sync with Ant Design's built-in `ant-scrolling-effect` class.
 * Ant Design adds this class to <body> when any Modal, Drawer, or Dialog opens,
 * but only locks <body>. We sync this to <html> as well.
 */
if (typeof document !== 'undefined') {
  let antdLocked = false;
  const observer = new MutationObserver(() => {
    const hasAntdEffect = document.body.classList.contains(
      'ant-scrolling-effect',
    );
    if (hasAntdEffect && !antdLocked) {
      antdLocked = true;
      document.documentElement.classList.add('ant-scrolling-effect-root');
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
    } else if (!hasAntdEffect && antdLocked) {
      antdLocked = false;
      document.documentElement.classList.remove('ant-scrolling-effect-root');
      if (lockCount === 0) {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.documentElement.style.overscrollBehavior = prevHtmlOverscroll;
      }
    }
  });

  // Observe once DOM is ready
  if (document.body) {
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
      });
    });
  }
}

/**
 * React hook: Prevents the background page from scrolling while a modal/overlay is open.
 */
export function useBodyScrollLock(open: boolean): void {
  useEffect(() => {
    if (!open) return;
    acquireScrollLock();
    return () => {
      releaseScrollLock();
    };
  }, [open]);
}
