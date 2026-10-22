import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { CyfyIcon } from './CyfyIcon';

interface TargetRect {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius: string;
}

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const currentHoverElRef = useRef<HTMLElement | null>(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  // Re-checks what's under the pointer; assigned inside the listener effect below
  const resyncHoverRef = useRef<() => void>(() => {});
  const location = useLocation();

  useEffect(() => {
    // Detect touch-only devices
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      // The hovered element may have been unmounted (e.g. a closed dropdown) without firing pointerout
      if (currentHoverElRef.current && !currentHoverElRef.current.isConnected) clearHover();
    };

    const clearHover = () => {
      currentHoverElRef.current = null;
      setIsHovered(false);
      setTargetRect(null);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      clearHover();
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Find closest interactive element
    const getInteractiveElement = (target: EventTarget | null): HTMLElement | null => {
      if (!(target instanceof HTMLElement)) return null;
      return target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], select, .cursor-pointer, [data-cursor-expand], .service-card-immersive'
      );
    };

    const updateRectFromElement = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      // A detached or hidden element measures 0x0 — drop the cover rather than leave it stranded
      if (!el.isConnected || rect.width === 0 || rect.height === 0) {
        clearHover();
        return;
      }
      const computedStyle = window.getComputedStyle(el);
      const radius = computedStyle.borderRadius || '8px';
      setTargetRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: radius,
      });
      setIsHovered(true);
    };

    const handlePointerOver = (e: PointerEvent) => {
      const el = getInteractiveElement(e.target);
      if (el) {
        currentHoverElRef.current = el;
        updateRectFromElement(el);
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      if (!currentHoverElRef.current) return;
      const related = e.relatedTarget;
      if (related instanceof Node && currentHoverElRef.current.contains(related)) {
        return; // Still inside the interactive element
      }
      clearHover();
    };

    // Content can move or change under a still pointer (scroll, resize, navigation, menus closing),
    // so resolve the interactive element at the pointer again instead of tracking a stale one
    const resyncHover = () => {
      const { x, y } = mousePosRef.current;
      const el = getInteractiveElement(document.elementFromPoint(x, y));
      if (el) {
        currentHoverElRef.current = el;
        updateRectFromElement(el);
      } else if (currentHoverElRef.current) {
        clearHover();
      }
    };
    resyncHoverRef.current = resyncHover;

    const handleScrollOrResize = () => resyncHover();
    // Clicks often close menus or navigate; check again once the DOM has updated
    const handleClick = () => requestAnimationFrame(resyncHover);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('click', handleClick);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isVisible]);

  // On route change the page under the pointer is replaced; re-check once it has rendered
  useEffect(() => {
    const raf = requestAnimationFrame(() => resyncHoverRef.current());
    return () => cancelAnimationFrame(raf);
  }, [location.key]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Padding to generously cover the hovered button/link
  const EXPAND_PADDING = 6;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Ambient Background Glow that trails mouse */}
      <motion.div
        className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        animate={{
          x: isHovered && targetRect ? targetRect.x + targetRect.width / 2 : mousePos.x,
          y: isHovered && targetRect ? targetRect.y + targetRect.height / 2 : mousePos.y,
          width: isHovered && targetRect ? targetRect.width + 80 : 180,
          height: isHovered && targetRect ? targetRect.height + 80 : 180,
          opacity: isHovered ? 0.35 : 0.2,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 28,
          mass: 0.4,
        }}
        style={{
          background: 'radial-gradient(circle, rgba(0, 149, 175, 0.4) 0%, rgba(255, 183, 75, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* 2. Interactive Expanded Cover: When hovering over button/link, expands and wraps the element */}
      <AnimatePresence>
        {isHovered && targetRect && (
          <motion.div
            initial={{
              x: mousePos.x - 20,
              y: mousePos.y - 20,
              width: 40,
              height: 40,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              x: targetRect.x - EXPAND_PADDING,
              y: targetRect.y - EXPAND_PADDING,
              width: targetRect.width + EXPAND_PADDING * 2,
              height: targetRect.height + EXPAND_PADDING * 2,
              borderRadius: `calc(${targetRect.borderRadius} + ${EXPAND_PADDING}px)`,
              opacity: 1,
              scale: isClicking ? 0.98 : 1,
            }}
            exit={{
              x: mousePos.x - 18,
              y: mousePos.y - 18,
              width: 36,
              height: 36,
              opacity: 0,
              scale: 0.6,
            }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 30,
              mass: 0.35,
            }}
            className="fixed pointer-events-none border border-primary/70 bg-primary/10 shadow-[0_0_25px_rgba(0,149,175,0.3),inset_0_0_15px_rgba(255,183,75,0.1)] backdrop-blur-[0.5px]"
          >
            {/* Exact CYFY Cyan & Amber Corner Reticles */}
            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00c2ff]" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#ff9d2e]" />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00c2ff]" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#ff9d2e]" />

            {/* Glowing CYFY Badge watermark on top-right of the covered element */}
            <div className="absolute -top-2.5 -right-2.5 w-6 h-6 flex items-center justify-center bg-bg-base/90 rounded-full border border-primary/80 shadow-md scale-95">
              <CyfyIcon size={18} glow={false} />
            </div>

            {/* Subtle Cyber Scanline Sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-[inherit] opacity-25">
              <motion.div
                className="w-full h-1 bg-gradient-to-r from-transparent via-[#00c2ff] to-transparent"
                animate={{ y: [0, targetRect.height + EXPAND_PADDING * 2] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Primary CYFY Icon Cursor (Always follows cursor tip, shrinks seamlessly when element is covered) */}
      <motion.div
        className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHovered ? 0.65 : isClicking ? 0.85 : 1,
          opacity: isHovered ? 0.85 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 650,
          damping: 38,
          mass: 0.15,
        }}
        style={{ width: 54, height: 54 }}
      >
        {/* Exact Attached CYFY Icon rendered as cursor */}
        <div className="relative flex items-center justify-center">
          <CyfyIcon size={51} glow={true} />
          
          {/* Central Precision Aim Pointer */}
          {/* <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#00c2ff]" /> */}
        </div>
      </motion.div>
    </div>
  );
};
