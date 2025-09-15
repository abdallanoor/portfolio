"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="container py-32">
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

      <h1 className="text-5xl sm:text-7xl font-light mb-7">
        {t("name")}{" "}
        <span className="block text-muted-foreground">{t("title")}</span>
      </h1>

      <p className="max-w-xl text-lg font-light opacity-85 mb-10">
        {t("description")}
      </p>

      <div className="flex items-center gap-2">
        <Button
          size="lg"
          onClick={() => scrollToSection("contact")}
          className="cursor-pointer"
        >
          <span>{t("contact")}</span>
          <ArrowUpRight className="size-4" />
        </Button>

        <Button
          variant="link"
          onClick={() => scrollToSection("projects")}
          className="opacity-80 hover:opacity-100 hover:no-underline cursor-pointer"
        >
          <span>{t("portfolio")}</span>
          <ArrowUpRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
