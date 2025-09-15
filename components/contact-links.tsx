"use client";

import type React from "react";
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface ContactLink {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}

export default function ContactLinks() {
  const t = useTranslations("contact");

  const contactLinks: ContactLink[] = [
    {
      icon: Mail,
      label: t("links.email"),
      value: "abdallaahnoor@gmail.com",
      href: "mailto:abdallaahnoor@gmail.com",
    },
    {
      icon: Linkedin,
      label: t("links.linkedin"),
      value: "in/abdallahnoor",
      href: "https://linkedin.com/in/abdallahnoor",
    },
    {
      icon: Github,
      label: t("links.github"),
      value: "@abdallanoor",
      href: "https://github.com/abdallanoor",
    },
    {
      icon: MessageCircle,
      label: t("links.whatsapp"),
      value: "+20 (10) 2504 7619",
      href: "https://wa.me/201025047619",
    },
  ];
  return (
    <div className="space-y-1">
      {contactLinks.map((link) => {
        const IconComponent = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? "_self" : "_blank"}
            rel={
              link.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            className="group flex items-center gap-2 py-1 rounded-md"
          >
            <div className="flex-shrink-0">
              <IconComponent className="size-4 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  {link.label}
                </span>
                <span
                  dir="ltr"
                  className="text-xs text-muted-foreground font-mono truncate"
                >
                  {link.value}
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
