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
  
  // To prevent the observer from jumping the active state during smooth scrolls
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Keep ref in sync for event listeners
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  // Handle scroll debounce to re-enable observer after smooth scrolling finishes
  useEffect(() => {
    const handleScroll = () => {
      if (isProgrammaticScroll.current) {
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 150); // 150ms after scrolling stops, re-enable observer
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    // Intersection Observer for highlighting active headings
    const callback = (entries: IntersectionObserverEntry[]) => {
      // Don't override active state while dragging OR while smooth-scrolling programmatically
      if (isDragging || isProgrammaticScroll.current) return;
      
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
        isProgrammaticScroll.current = true;
        
        // If they click/drag very fast, reset the timeout so it doesn't clear early
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        // Fallback timeout in case no scroll events fire (e.g. already at destination)
        scrollTimeout.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 300);

        // Use smooth scroll to animate the page to the new destination
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      >
        {/* Vertical hint text on the right side */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 flex items-center justify-center pointer-events-none opacity-50">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 dark:text-gray-600 [writing-mode:vertical-rl] rotate-180">
            Drag to scroll
          </span>
        </div>

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
