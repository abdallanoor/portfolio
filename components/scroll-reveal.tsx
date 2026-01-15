"use client";

import { motion, useInView, UseInViewOptions } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";

// Animation configuration - change these values to customize the reveal effect
const ANIMATION_OFFSET_Y = 10; // Vertical movement distance in pixels
const ANIMATION_BLUR = 4; // Blur amount in pixels

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  options?: UseInViewOptions;
  delay?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  width = "fit-content",
  className = "",
  options,
  delay = 0,
  duration = 0.5,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-18% 0px -10% 0px",
    ...options,
  });
  const [yOffset, setYOffset] = useState(ANIMATION_OFFSET_Y);

  useLayoutEffect(() => {
    if (ref.current) {
      if (window.scrollY < 100) {
        setYOffset(ANIMATION_OFFSET_Y);
      } else {
        const rect = ref.current.getBoundingClientRect();
        const isAbove = rect.top < window.innerHeight / 2;
        setYOffset(isAbove ? -ANIMATION_OFFSET_Y : ANIMATION_OFFSET_Y);
      }
    }
  }, [isInView]);

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          y: ANIMATION_OFFSET_Y,
          filter: `blur(${ANIMATION_BLUR}px)`,
        }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: yOffset, filter: `blur(${ANIMATION_BLUR}px)` }
        }
        transition={{ duration, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
