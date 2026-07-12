"use client";

import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useLenis } from "lenis/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

/**
 * Hero call-to-action buttons (#5), pinned toward the bottom of the section.
 * "View Projects" / "Let's Talk" smooth-scroll to their sections via Lenis
 * (matching the header), with a small lift + arrow-shift on hover.
 */
export default function HeroCta() {
  const t = useTranslations("hero");
  const lenis = useLenis();
  
  const controlsProjects = useAnimation();
  const controlsContact = useAnimation();
  const isAnimating = useRef(false);

  const handleScroll = async (href: string, isProjects: boolean) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const controls = isProjects ? controlsProjects : controlsContact;

    // 1. Fly out top-right (takes 250ms)
    await controls.start({
      x: 24,
      y: -24,
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" }
    });

    // 2. Teleport to bottom-left (hidden)
    controls.set({ x: -20, y: 20 });

    // 3. Start sliding back into place (no await, runs asynchronously)
    const returnPromise = controls.start({
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.32, ease: "easeOut" }
    });

    // 4. Wait just 120ms so the user sees the arrow enter the button again
    await new Promise((resolve) => setTimeout(resolve, 120));

    // 5. Trigger scroll
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }

    // Reset animation state when return completes fully
    returnPromise.then(() => {
      isAnimating.current = false;
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
      <motion.div whileTap={{ scale: 0.96 }}>
        <Button
          size="lg"
          onClick={() => handleScroll("#projects", true)}
          className="group relative overflow-hidden"
        >
          <span>{t("portfolio")}</span>
          <motion.span
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={controlsProjects}
            className="inline-block shrink-0"
          >
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.span>
        </Button>
      </motion.div>

      <motion.div whileTap={{ scale: 0.96 }}>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => handleScroll("#contact", false)}
          className="group relative overflow-hidden"
        >
          <span>{t("contact")}</span>
          <motion.span
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={controlsContact}
            className="inline-block shrink-0"
          >
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </motion.span>
        </Button>
      </motion.div>
    </div>
  );
}
