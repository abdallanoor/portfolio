"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Hero() {
  const t = useTranslations("hero");
  const lenis = useLenis();

  const scrollToSection = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href, { offset: -64 });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container min-h-[calc(100vh-4rem)] py-32" id="hero">
      <ScrollReveal width="100%">
        <Badge
          variant="secondary"
          className="mb-10 gap-1.5 rounded-full px-4 py-2"
        >
          <div className="relative">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
          {t("available")}
        </Badge>
      </ScrollReveal>

      <ScrollReveal width="100%" delay={0.2}>
        <h1 className="text-5xl sm:text-7xl font-light mb-7">
          {t("name")}{" "}
          <span className="block text-muted-foreground">{t("title")}</span>
        </h1>
      </ScrollReveal>

      <ScrollReveal width="100%" delay={0.4}>
        <p className="max-w-xl text-lg font-light opacity-85 mb-10">
          {t("description")}
        </p>
      </ScrollReveal>

      <ScrollReveal width="100%" delay={0.6}>
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={() => scrollToSection("#contact")}
            className="active:scale-95"
          >
            <span>{t("contact")}</span>
            <ArrowUpRight className="size-4" />
          </Button>

          <Button
            variant="link"
            size="lg"
            onClick={() => scrollToSection("#projects")}
            className="opacity-80 hover:opacity-100 hover:no-underline hover:bg-accent/60 active:scale-95"
          >
            <span>{t("portfolio")}</span>
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
