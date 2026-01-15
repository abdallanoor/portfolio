"use client";

import type React from "react";
import {
  Mail,
  Linkedin,
  Github,
  MessageCircle,
  Instagram,
  Copy,
  CheckCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ContactLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  copyable?: boolean;
}

export default function ContactLinks() {
  const t = useTranslations("contact");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const contactLinks: ContactLink[] = [
    {
      icon: Mail,
      label: t("links.email"),
      value: "abdallaahnoor@gmail.com",
      href: "mailto:abdallaahnoor@gmail.com",
      copyable: true,
    },
    {
      icon: Linkedin,
      label: t("links.linkedin"),
      value: "abdallahnoor",
      href: "https://linkedin.com/in/abdallahnoor",
    },
    {
      icon: Github,
      label: t("links.github"),
      value: "abdallanoor",
      href: "https://github.com/abdallanoor",
    },
    {
      icon: Instagram,
      label: t("links.instagram"),
      value: "abdallahanoor",
      href: "https://www.instagram.com/abdallahanoor",
    },
    {
      icon: MessageCircle,
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

  return (
    <div className="space-y-1">
      {contactLinks.map((link, index) => {
        const IconComponent = link.icon;
        const isCopied = copiedIndex === index;

        if (link.copyable) {
          return (
            <button
              key={index}
              onClick={() => handleCopy(link.value, index)}
              aria-label={`${link.label}: ${link.value}`}
              className="group flex items-center gap-2 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-all duration-300 w-full text-start cursor-pointer"
            >
              <div className="p-3 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-muted group-hover:text-foreground">
                <IconComponent className={`size-4`} />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm text-muted-foreground">
                  {link.label}
                </span>
                <span dir="ltr" className="text-xs font-mono">
                  {link.value}
                </span>
              </div>
              <div>
                {isCopied ? (
                  <CheckCheck className="size-3 text-primary animate-in zoom-in-50 duration-200" />
                ) : (
                  <Copy className="size-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </div>
            </button>
          );
        }

        return (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label}: ${link.value}`}
            className="group flex items-center gap-2 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-all duration-300"
          >
            <div
              className={`p-3 bg-muted/50 text-muted-foreground rounded-full flex items-center justify-center transition-colors duration-200 group-hover:bg-muted group-hover:text-foreground`}
            >
              <IconComponent className={`size-4`} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">
                {link.label}
              </span>
              <span dir="ltr" className="text-xs font-mono">
                {link.value}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
