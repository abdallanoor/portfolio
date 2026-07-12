"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * Memoji as a tilted polaroid sticker pinned to the top-end corner of the
 * name, opposite the "Hello, I'm" greeting. Echoes the hero's hand-drawn
 * font + rotated annotations:
 *
 * - A piece of "tape" holds the card; a handwritten caption sits underneath.
 * - Pops in on load, then idles statically without distracting shaking.
 * - Straightens upright and lifts smoothly on hover; honours prefers-reduced-motion.
 */
export default function HeroAvatar({ delay = 0.35 }: { delay?: number }) {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      // Outer element owns the entrance + resting tilt (0°). The inner card
      // owns the hover transforms.
      initial={
        reduceMotion
          ? false
          : { opacity: 0, scale: 0.7, rotate: -10, y: -24, filter: "blur(8px)" }
      }
      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 w-[clamp(9rem,24vw,14rem)] lg:w-[clamp(13rem,20vw,17rem)]"
    >
      <motion.div
        // Hover straightens the card (the +4° cancels the outer -4° tilt) and lifts it up.
        whileHover={
          reduceMotion ? undefined : { scale: 1.05, rotate: 4, y: -10 }
        }
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
        }}
        className="relative cursor-pointer rounded-[3px] bg-card p-2 pb-7 shadow-xl ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-2xl"
      >
        {/* Strip of tape pinning the polaroid to the page */}
        <span
          aria-hidden
          className="absolute start-1/2 top-0 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] rounded-[1px] bg-foreground/10 shadow-sm backdrop-blur-[2px] rtl:translate-x-1/2"
        />

        {/* Photo — full 3:4 frame, nothing cropped */}
        <div className="aspect-[3/4] overflow-hidden rounded-[2px] bg-muted">
          <Image
            src="/abdallah.webp"
            alt=""
            width={1050}
            height={1400}
            priority
            className="size-full object-cover"
          />
        </div>

        {/* Handwritten caption in the polaroid's bottom margin */}
        <span className="font-hand absolute inset-x-0 bottom-1 text-center text-lg leading-none sm:text-xl">
          {t("caption")}
        </span>
      </motion.div>
    </motion.div>
  );
}
