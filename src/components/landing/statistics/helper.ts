import { useEffect, useRef, useState } from 'react';

export const statsData = [
  { key: 'vendors', value: 500, suffix: '+', labelKey: 'landing.statsVendors' },
  { key: 'events', value: 12000, suffix: '+', labelKey: 'landing.statsEvents' },
  { key: 'cities', value: 45, suffix: '+', labelKey: 'landing.statsCities' },
  { key: 'rating', value: 4.9, suffix: '', labelKey: 'landing.statsRating' },
] as const;

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active, duration]);

  return count;
}

export function useStatistics() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, active, stats: statsData };
}

export function useStatCount(value: number, active: boolean) {
  return useCountUp(value, active);
}
