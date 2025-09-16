"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear().toLocaleString("ar-EG"); // يخلي الأرقام بالعربي المصري

  return (
    <footer className="border-t py-6">
      <div className="container">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
          <p>{t("copyright", { year })}</p>
          <p className="flex items-center gap-1">
            {t("madeWith.part1")} <Heart className="size-4" />
            {t("madeWith.part2")}
          </p>
        </div>
      </div>
    </footer>
  );
}
