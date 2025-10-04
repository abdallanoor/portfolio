"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t">
      <div className="container">
        <div className="flex items-center justify-center text-sm text-muted-foreground h-16">
          <p>{t("copyright")}</p>
          {/* <p className="flex items-center gap-1">
            {t("madeWith.part1")} <Heart className="size-4" />
            {t("madeWith.part2")}
          </p> */}
        </div>
      </div>
    </footer>
  );
}
