import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const positionRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });

  // 1. Detect touch/mobile device (runs once)
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(hasTouch);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // 2. Track mouse position (updates a ref, not state, so this effect never restarts)
    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      positionRef.current = { x: e.clientX, y: e.clientY };
      setPosition(positionRef.current);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('clickable') ||
          target.getAttribute('role') === 'button';

        setIsPointer(!!isClickable);

        const isSpecCard = target.closest('.project-card') || target.closest('.blog-card');
        setIsHovered(!!isSpecCard);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // 3. Smooth Lerping for cursor trail — single continuous RAF loop
    let animationId: number;
    const updateTrail = () => {
      const lerpFactor = 0.12;
      trailRef.current.x += (positionRef.current.x - trailRef.current.x) * lerpFactor;
      trailRef.current.y += (positionRef.current.y - trailRef.current.y) * lerpFactor;
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      animationId = requestAnimationFrame(updateTrail);
    };
    animationId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Main Dot */}
      <div
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#00f2fe] rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          scale: isPointer ? 1.5 : 1,
        }}
      />

      {/* 2. Outer Smooth Halo */}
      <div
        id="custom-cursor-halo"
        className="fixed top-0 left-0 rounded-full border border-[#00f2fe]/40 pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 mix-blend-difference flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isHovered ? '70px' : isPointer ? '44px' : '28px',
          height: isHovered ? '70px' : isPointer ? '44px' : '28px',
          backgroundColor: isHovered ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
          borderColor: isHovered ? 'rgba(0, 242, 254, 0.8)' : isPointer ? 'rgba(0, 242, 254, 0.6)' : 'rgba(0, 242, 254, 0.3)',
        }}
      >
        {isHovered && (
          <span className="text-[9px] text-[#00f2fe] font-mono tracking-widest font-bold uppercase scale-75 select-none animate-pulse">
            VIEW
          </span>
        )}
      </div>
    </>
  );
}