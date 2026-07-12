"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLocale } from "next-intl";
import { useMemo } from "react";

// Each unit fades + slides up (transform/opacity only).
const NAME_CLASS =
  "font-sans text-[clamp(3.2rem,10.5vw,7.2rem)] font-black leading-[0.92] rtl:leading-[1.1] tracking-tighter text-primary rtl:text-[clamp(4.6rem,14.5vw,10rem)] lg:whitespace-nowrap";

/**
 * Staggered display name (#3): letters appear one after another on load.
 *
 * Splits per character for English, but per *word* for Arabic — Arabic is
 * cursive, so splitting into single letters would break their joining.
 * Honours prefers-reduced-motion (renders instantly, no stagger).
 */
export default function HeroName({ name }: { name: string }) {
  const reduceMotion = useReducedMotion();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: isRTL ? 0.18 : 0.035,
          delayChildren: isRTL ? 0.2 : 0.15,
        },
      },
    }),
    [isRTL],
  );

  const unitVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: "40%", filter: "blur(6px)" },
      show: {
        opacity: 1,
        y: "0%",
        filter: "blur(0px)",
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      },
    }),
    [],
  );

  const tokens = useMemo(() => {
    if (isRTL) return name.split(/(\s+)/).filter((t) => t.length > 0);
    return Array.from(name);
  }, [name, isRTL]);

  if (reduceMotion) {
    return (
      <h1 className={NAME_CLASS}>
        <span className="block">{name}</span>
      </h1>
    );
  }

  return (
    <motion.h1
      // Re-key on locale so the reveal replays cleanly when EN/AR switches.
      key={locale}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={NAME_CLASS}
    >
      {/* Unsplit copy for screen readers + SEO */}
      <span className="sr-only">{name}</span>
      <span aria-hidden className="block">
        {tokens.map((token, i) =>
          /^\s+$/.test(token) ? (
            // Breakable whitespace between units (lets the name wrap if needed)
            " "
          ) : (
            <motion.span
              key={i}
              variants={unitVariants}
              className="inline-block blur-none rtl:pb-2 rtl:-mb-2 rtl:px-1 rtl:-mx-1"
            >
              {token}
            </motion.span>
          ),
        )}
      </span>
    </motion.h1>
  );
}
