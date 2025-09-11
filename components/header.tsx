"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import LocaleSwitcher from "./locale-switcher";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");

  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background border-b z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <div className="sm:text-lg hover:opacity-80 font-semibold">
            <Link href="/">{t("name")}</Link>
          </div>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={toggleTheme}
              title={t("toggleTheme")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 3l0 18" />
                <path d="M12 9l4.65 -4.65" />
                <path d="M12 14.3l7.37 -7.37" />
                <path d="M12 19.6l8.85 -8.85" />
              </svg>
              <span className="sr-only">{t("toggleTheme")}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
