'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const HorizontalScrollDesktop = dynamic(
  () => import('./HorizontalScrollDesktop.wrapper'),
  { ssr: false }
);

type Props = {
  children: React.ReactNode;
  hideButtons?: boolean;
};

export default function HorizontalScroll({
  children,
  hideButtons = false,
}: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    setIsDesktop(media.matches);

    const handler = (e: MediaQueryListEvent) =>
      setIsDesktop(e.matches);

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // 📱 Mobile
  if (!isDesktop) {
    return (
      <div className="overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {children}
      </div>
    );
  }

  // 🖥️ Desktop
  return (
    <HorizontalScrollDesktop hideButtons={hideButtons}>
      {children}
    </HorizontalScrollDesktop>
  );
}

