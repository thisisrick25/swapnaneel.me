"use client"

import { useState, useEffect, useRef, useCallback } from 'react';

type Heading = {
  text: string;
  level: number;
  slug: string;
};

export default function SidebarRuler({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string>('');

  // Keep ref in sync for event listeners
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Intersection Observer for highlighting active headings
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (isDragging) return; // Don't override active state while dragging

      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);

      if (intersectingEntries.length > 0) {
        setActiveId(intersectingEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-10% 0px -80% 0px', // Trigger when heading is near the top
    });

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [headings, isDragging]);

  const handleDragMove = useCallback((clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    // Clamp Y to the container boundaries
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

    const percentage = y / rect.height;
    // Map to an index: 0 to headings.length - 1
    let index = Math.floor(percentage * headings.length);
    if (index >= headings.length) index = headings.length - 1;

    const targetHeading = headings[index];
    if (targetHeading && targetHeading.slug !== activeIdRef.current) {
      setActiveId(targetHeading.slug); // Optimistic UI update
      const element = document.getElementById(targetHeading.slug);
      if (element) {
        // Use scrollIntoView to respect the CSS scroll-margin-top we added in globals.css
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  }, [headings]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.preventDefault(); // prevent text selection
    // Immediately scroll to the clicked spot
    handleDragMove(e.clientY);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleDragMove(e.clientY);
      }
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, handleDragMove]);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-1/4 right-4 md:right-8 xl:right-[calc(50%-480px)] z-50 hidden lg:flex flex-col items-end py-4">
      <div
        ref={containerRef}
        className={`relative flex flex-col select-none touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={handlePointerDown}
        title="Drag to scroll"
      >
        {/* Add an invisible wider hit area for easier dragging */}
        <div className="absolute inset-y-0 right-0 w-12 bg-transparent z-10" />

        {/* Ticks for each heading */}
        {headings.map((heading) => {
          const isActive = activeId === heading.slug;

          let widthClass = 'w-2'; // default for h4 and lower
          if (heading.level === 1) widthClass = 'w-8';
          else if (heading.level === 2) widthClass = 'w-6';
          else if (heading.level === 3) widthClass = 'w-4';

          return (
            <div
              key={heading.slug}
              className="relative z-20 group flex items-center justify-end h-7 w-12"
            >
              {/* Popup tooltip when dragging or hovering */}
              <div
                className={`absolute right-12 mr-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-md transition-all duration-200 pointer-events-none origin-right
                  ${isActive && isDragging
                    ? 'opacity-100 scale-100 translate-x-0'
                    : 'opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0'
                  }
                `}
              >
                {heading.text}
              </div>

              <div
                className={`transition-all duration-150 ease-out h-px rounded-full pointer-events-none
                  ${isActive
                    ? 'bg-blue-500 dark:bg-blue-400 opacity-100'
                    : 'bg-gray-400 dark:bg-gray-600 opacity-50 group-hover:opacity-100 group-hover:bg-gray-600 dark:group-hover:bg-gray-400'
                  }
                  ${widthClass}
                  ${isActive ? 'w-10 bg-blue-500 h-[2px]' : ''}
                `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
