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
            aria-label={`${link.label}: ${link.value}`}
            className="group flex items-center gap-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-all duration-300"
          >
            <div
              className={`p-2.5 bg-muted/50 text-muted-foreground rounded-md flex items-center justify-center transition-colors duration-200 group-hover:bg-muted group-hover:text-foreground`}
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
