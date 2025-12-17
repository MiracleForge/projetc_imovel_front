'use client';
import { Activity, useRef, useState } from 'react';
import ScrollButton from '../ui/buttons/ScrollButons.ui';

export default function HorizontalScroll({
  children,
  hideButtons = false,
}: {
  children: React.ReactNode, hideButtons?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDown(true);
    setStartX(e.pageX - (ref.current?.offsetLeft || 0));
    setScrollStart(ref.current?.scrollLeft || 0);
    document.body.style.userSelect = 'none';
  };

  const handleMouseUp = () => {
    setIsDown(false);
    document.body.style.userSelect = 'auto';

    if (!ref.current) return;

    const snapItems =
      ref.current.querySelectorAll<HTMLElement>('.snap-start');
    if (!snapItems.length) return;

    const currentScroll = ref.current.scrollLeft;

    let closest = snapItems[0];
    let closestDist = Math.abs(closest.offsetLeft - currentScroll);

    snapItems.forEach((item) => {
      const dist = Math.abs(item.offsetLeft - currentScroll);
      if (dist < closestDist) {
        closest = item;
        closestDist = dist;
      }
    });

    const maxScroll =
      ref.current.scrollWidth - ref.current.clientWidth;
    const target = Math.min(closest.offsetLeft, maxScroll);

    ref.current.scrollTo({
      left: target,
      behavior: 'smooth',
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !ref.current) return;

    const x = e.pageX - ref.current.offsetLeft;
    const walk = x - startX;

    ref.current.scrollLeft = scrollStart - walk;
  };

  return (
    <div className="relative">
      <Activity mode={hideButtons ? "hidden" : "visible"}>
        <ScrollButton
          size="small"
          position="left"
          onClick={() => scroll(-1)}
          role="tab"
        />
      </Activity>

      <div
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory cursor-grab"
      >
        {children}
      </div>

      <Activity mode={hideButtons ? "hidden" : "visible"}>
        <ScrollButton
          size="small"
          position="right"
          onClick={() => scroll(1)}
          role="tab"
        />

      </Activity>
    </div>
  );
}

