"use client";

import { useEffect, useMemo, useState } from "react";
import { useLenis } from "lenis/react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Briefcase, House, Mail, Moon, Sun, UserRound } from "lucide-react";
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
          <Sun className="size-3.5 text-foreground" />
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
          <Moon className="size-3.5 text-foreground" />
        </motion.span>
      </motion.span>
      <span className="sr-only">{t("toggleTheme")}</span>
    </motion.button>
  );
}

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lenis = useLenis();
  const t = useTranslations("header");

  const navItems = useMemo(
    () => [
      { name: t("links.home"), href: "#hero", Icon: House },
      { name: t("links.about"), href: "#about", Icon: UserRound },
      { name: t("links.projects"), href: "#projects", Icon: Briefcase },
      { name: t("links.contact"), href: "#contact", Icon: Mail },
    ],
    [t]
  );

  const scrollToSection = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      let found = false;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            found = true;
            break;
          }
        }
      }

      if (!found) setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

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

              <Icon className="relative size-[1.2rem] md:hidden" />
              <span className="relative hidden md:inline">{name}</span>
            </motion.button>
          );
        })}

        <motion.span
          variants={itemVariants}
          onMouseEnter={() => setHoveredIndex(null)}
          className="mx-1 h-6 w-px bg-border/70"
        />

        <motion.div variants={itemVariants} onMouseEnter={() => setHoveredIndex(null)}>
          <LocaleSwitcher />
        </motion.div>
        <motion.div variants={itemVariants} onMouseEnter={() => setHoveredIndex(null)}>
          <ThemeToggle />
        </motion.div>
      </motion.nav>
    </header>
  );
}
