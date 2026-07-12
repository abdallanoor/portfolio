"use client";

// import { HugeiconsIcon } from "@hugeicons/react";
// import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t pb-22 md:pb-0">
      <div className="container">
        <div className="flex items-center justify-center text-sm text-muted-foreground h-16">
          <p>{t("copyright")}</p>
          {/* <p className="flex items-center gap-1">
            {t("madeWith.part1")} <HugeiconsIcon icon={FavouriteIcon} className="size-4" />
            {t("madeWith.part2")}
          </p> */}
        </div>
      </div>
    </footer>
  );
}
