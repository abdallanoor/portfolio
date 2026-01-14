"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Home, User, Briefcase, Mail } from "lucide-react";
import LocaleSwitcher from "./locale-switcher";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");

  const t = useTranslations("header");
  const { setTheme } = useTheme();

  const navItems = useMemo(
    () => [
      { name: t("links.home"), href: "#hero", icon: Home },
      { name: t("links.about"), href: "#about", icon: User },
      { name: t("links.projects"), href: "#projects", icon: Briefcase },
      { name: t("links.contact"), href: "#contact", icon: Mail },
    ],
    [t]
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
    <header className="fixed top-0 left-0 right-0 bg-background border-b z-50">
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

        <div className="flex items-center gap-2 ms-auto">
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

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 h-16">
        <nav className="container h-full flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                activeSection === item.href.substring(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <item.icon className="size-5 mb-1" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
