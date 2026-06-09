"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
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

  const scrollToSection = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
      <motion.div whileTap={{ scale: 0.96 }}>
        <Button
          size="lg"
          onClick={() => scrollToSection("#projects")}
          className="group"
        >
          <span>{t("portfolio")}</span>
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      </motion.div>

      <motion.div whileTap={{ scale: 0.96 }}>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => scrollToSection("#contact")}
          className="group"
        >
          <span>{t("contact")}</span>
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      </motion.div>
    </div>
  );
}
