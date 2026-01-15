"use client";

import { useEffect, useMemo, useState } from "react";
import { useLenis } from "lenis/react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import LocaleSwitcher from "./locale-switcher";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lenis = useLenis();

  const t = useTranslations("header");
  const { setTheme } = useTheme();

  const navItems = useMemo(
    () => [
      { name: t("links.home"), href: "#hero" },
      { name: t("links.about"), href: "#about" },
      { name: t("links.projects"), href: "#projects" },
      { name: t("links.contact"), href: "#contact" },
    ],
    [t]
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const scrollToSection = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href, { offset: -64 });
      setIsMobileMenuOpen(false);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
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
    <header className="fixed top-0 left-0 right-0 bg-background z-50">
      <div className="container flex items-center justify-between h-16">
        <button
          onClick={() => scrollToSection("#hero")}
          className="text-lg hover:opacity-80 font-semibold cursor-pointer"
        >
          {t("name")}
        </button>

        <nav className="hidden md:flex items-center justify-center gap-3 flex-1">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="link"
              size="sm"
              onClick={() => scrollToSection(item.href)}
              className={`hover:no-underline cursor-pointer p-1 transition-all duration-300 ${
                activeSection === item.href.substring(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.name}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2 ms-auto me-2">
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

        <button
          className="md:hidden p-1 pe-0 cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
          <span className="sr-only">{t("menu")}</span>
        </button>
      </div>

      <div
        className={`md:hidden bg-background overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="py-4">
          <div className="container space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                size="lg"
                variant="ghost"
                onClick={() => scrollToSection(item.href)}
                className={`w-full transition-all duration-300 active:scale-95 cursor-pointer ${
                  activeSection === item.href.substring(1)
                    ? "bg-accent dark:bg-accent/50"
                    : ""
                }`}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
