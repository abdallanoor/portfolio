"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  Home01Icon,
  Mail01Icon,
  Moon01Icon,
  Sun02Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import LocaleSwitcher from "./locale-switcher";

// Dock pops in with a spring, then its children cascade in (stagger)
const dockVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
};

// iOS-style theme switch: a recessed glass track with a liquid-glass knob.
const iconSpring = { type: "spring", stiffness: 300, damping: 20 } as const;

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("header");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <motion.button
      dir="ltr"
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      title={t("toggleTheme")}
      aria-label={t("toggleTheme")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      className="liquid-track relative flex h-8 w-[3.25rem] shrink-0 cursor-pointer items-center rounded-full px-1"
    >
      <motion.span
        className="liquid-knob relative flex size-6 items-center justify-center rounded-full"
        initial={false}
        animate={{ x: isDark ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 34, mass: 0.6 }}
      >
        <motion.span
          className="absolute flex"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            scale: isDark ? 0 : 1,
          }}
          transition={iconSpring}
        >
          <HugeiconsIcon
            icon={Sun02Icon}
            className="size-3.5 text-foreground"
          />
        </motion.span>
        <motion.span
          className="absolute flex"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            scale: isDark ? 1 : 0,
          }}
          transition={iconSpring}
        >
          <HugeiconsIcon
            icon={Moon01Icon}
            className="size-3.5 text-foreground"
          />
        </motion.span>
      </motion.span>
      <span className="sr-only">{t("toggleTheme")}</span>
    </motion.button>
  );
}

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const t = useTranslations("header");

  const navItems = useMemo(
    () => [
      { name: t("links.home"), href: "#hero", Icon: Home01Icon },
      { name: t("links.about"), href: "#about", Icon: UserIcon },
      { name: t("links.projects"), href: "#projects", Icon: Briefcase01Icon },
      { name: t("links.contact"), href: "#contact", Icon: Mail01Icon },
    ],
    [t],
  );

  // Section offsets measured once (and on resize / content changes) so the
  // scroll handler never forces a layout reflow on every frame — that reflow
  // is what made the dock judder while scrolling on mobile.
  const sectionOffsets = useRef<{ id: string; top: number; bottom: number }[]>(
    [],
  );

  const measureSections = useCallback(() => {
    sectionOffsets.current = navItems
      .map(({ href }) => {
        const el = document.getElementById(href.substring(1));
        if (!el) return null;
        return {
          id: el.id,
          top: el.offsetTop,
          bottom: el.offsetTop + el.offsetHeight,
        };
      })
      .filter(
        (s): s is { id: string; top: number; bottom: number } => s !== null,
      );
  }, [navItems]);

  const updateActiveSection = useCallback((scrollY: number) => {
    const scrollPosition = scrollY + 100;
    let current = "";
    for (const s of sectionOffsets.current) {
      if (scrollPosition >= s.top && scrollPosition < s.bottom) {
        current = s.id;
        break;
      }
    }
    // Skip the state update (and the layout spring) when nothing changed.
    setActiveSection((prev) => (prev === current ? prev : current));
  }, []);

  // Read from Lenis's own rAF-batched scroll loop instead of a raw `scroll`
  // listener that fires far more often on mobile.
  const lenis = useLenis(({ scroll }) => updateActiveSection(scroll));

  useEffect(() => {
    measureSections();
    updateActiveSection(window.scrollY);

    // Re-measure when the viewport or document height changes (font swap,
    // images loading, layout shifts) so offsets stay accurate.
    const ro = new ResizeObserver(measureSections);
    ro.observe(document.body);
    window.addEventListener("resize", measureSections);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureSections);
    };
  }, [measureSections, updateActiveSection]);

  const scrollToSection = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 md:bottom-auto md:top-5">
      <motion.nav
        variants={dockVariants}
        initial="hidden"
        animate="show"
        onMouseLeave={() => setHoveredIndex(null)}
        className="liquid-glass relative flex items-center gap-1 rounded-full p-1.5"
      >
        {navItems.map(({ name, href, Icon }, index) => {
          const isActive = activeSection === href.substring(1);
          return (
            <motion.button
              key={name}
              variants={itemVariants}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.92 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => scrollToSection(href)}
              aria-current={isActive ? "page" : undefined}
              title={name}
              className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors md:w-auto md:px-4 md:text-sm ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-active-thumb"
                  className="liquid-thumb absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              {!isActive && hoveredIndex === index && (
                <motion.span
                  layoutId="dock-hover-thumb"
                  className="absolute inset-0 rounded-full bg-foreground/[0.04] dark:bg-white/[0.05] border border-foreground/[0.03] dark:border-white/[0.04] shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              <HugeiconsIcon
                icon={Icon}
                className="relative size-[1.2rem] md:hidden"
              />
              <span className="relative hidden md:inline">{name}</span>
            </motion.button>
          );
        })}

        <motion.span
          variants={itemVariants}
          onMouseEnter={() => setHoveredIndex(null)}
          className="mx-1 h-6 w-px bg-border/70"
        />

        <motion.div
          variants={itemVariants}
          onMouseEnter={() => setHoveredIndex(null)}
        >
          <LocaleSwitcher />
        </motion.div>
        <motion.div
          variants={itemVariants}
          onMouseEnter={() => setHoveredIndex(null)}
        >
          <ThemeToggle />
        </motion.div>
      </motion.nav>
    </header>
  );
}
