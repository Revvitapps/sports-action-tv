'use client';
import { useEffect, useRef, useState, PropsWithChildren } from 'react';

export default function Reveal(
  { children, className = '' }: PropsWithChildren<{ className?: string }>
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setShown(true); });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        'transition-all duration-700 ease-out will-change-transform',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      ].join(' ')}
    >
      {children}
    </div>
  );
}
