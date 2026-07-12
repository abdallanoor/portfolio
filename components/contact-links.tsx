"use client";

import type React from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Mail01Icon,
  Linkedin01Icon,
  GithubIcon,
  WhatsappIcon,
  InstagramIcon,
  CopyIcon,
  CheckCheckIcon,
} from "@hugeicons/core-free-icons";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

interface ContactLink {
  icon: IconSvgElement;
  label: string;
  value: string;
  href: string;
  copyable?: boolean;
}

interface ContactLinksProps {
  /**
   * When the staggered reveal begins, in seconds. Kept in sync with the
   * surrounding section timeline (header 0.4 → links → form 0.8) so the links
   * cascade in right after the header and finish as the form arrives.
   */
  delay?: number;
}

// Per-item reveal mirrors <ScrollReveal /> (y: 8, blur: 4, easeOut, 0.4s) so
// every animated block across sections shares the same motion "feel".
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// `delayChildren` is supplied via `custom` so the parent can adapt the start
// time to its own timeline without changing the shared stagger rhythm.
const containerVariants: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: {
      staggerChildren: 0.05,
      delayChildren: delay,
    },
  }),
};

export default function ContactLinks({ delay = 0.6 }: ContactLinksProps) {
  const t = useTranslations("contact");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();

  const contactLinks: ContactLink[] = [
    {
      icon: Mail01Icon,
      label: t("links.email"),
      value: "abdallaahnoor@gmail.com",
      href: "mailto:abdallaahnoor@gmail.com",
      copyable: true,
    },
    {
      icon: Linkedin01Icon,
      label: t("links.linkedin"),
      value: "abdallahnoor",
      href: "https://linkedin.com/in/abdallahnoor",
    },
    {
      icon: GithubIcon,
      label: t("links.github"),
      value: "abdallanoor",
      href: "https://github.com/abdallanoor",
    },
    {
      icon: InstagramIcon,
      label: t("links.instagram"),
      value: "abdallahanoor",
      href: "https://www.instagram.com/abdallahanoor",
    },
    {
      icon: WhatsappIcon,
      label: t("links.whatsapp"),
      value: "+20 (10) 2504 7619",
      href: "https://wa.me/201025047619",
    },
  ];

  const handleCopy = async (value: string, index: number) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const renderLink = (link: ContactLink, index: number) => {
    const IconComponent = link.icon;
    const isCopied = copiedIndex === index;

    if (link.copyable) {
      return (
        <button
          onClick={() => handleCopy(link.value, index)}
          aria-label={`${link.label}: ${link.value}`}
          className="group flex items-center gap-2 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-all duration-300 w-full text-start cursor-pointer"
        >
          <div className="p-3 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-muted group-hover:text-foreground">
            <HugeiconsIcon icon={IconComponent} className="size-4" />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm text-muted-foreground">{link.label}</span>
            <span dir="ltr" className="text-xs font-thmanyah-sans">
              {link.value}
            </span>
          </div>
          <div>
            {isCopied ? (
              <HugeiconsIcon
                icon={CheckCheckIcon}
                className="size-3 text-primary animate-in zoom-in-50 duration-200"
              />
            ) : (
              <HugeiconsIcon
                icon={CopyIcon}
                className="size-3 text-muted-foreground group-hover:text-foreground transition-colors"
              />
            )}
          </div>
        </button>
      );
    }

    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.label}: ${link.value}`}
        className="group flex items-center gap-2 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-all duration-300"
      >
        <div
          className={`p-3 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-muted group-hover:text-foreground`}
        >
          <HugeiconsIcon icon={IconComponent} className="size-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">{link.label}</span>
          <span dir="ltr" className="text-xs font-thmanyah-sans">
            {link.value}
          </span>
        </div>
      </a>
    );
  };

  // Respect users who opt out of motion: render the links statically.
  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className="space-y-1">
        {contactLinks.map((link, index) => (
          <div key={index}>{renderLink(link, index)}</div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="space-y-1"
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {contactLinks.map((link, index) => (
        <motion.div key={index} variants={itemVariants}>
          {renderLink(link, index)}
        </motion.div>
      ))}
    </motion.div>
  );
}
