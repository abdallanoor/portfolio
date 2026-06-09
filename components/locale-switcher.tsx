"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const next = locale === "en" ? "ar" : "en";
  const currentLabel = locale === "ar" ? "العربية" : "English";
  const targetLabel = next === "ar" ? "العربية" : "English";

  function toggle() {
    if (isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <motion.button
      onClick={toggle}
      disabled={isPending}
      title={`Switch to ${targetLabel}`}
      aria-label={`Switch language to ${targetLabel}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      animate={{ opacity: isPending ? 0.55 : 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      style={{ perspective: 600 }}
      className="liquid-track relative flex h-8 cursor-pointer items-center justify-center overflow-hidden rounded-full px-3.5 text-xs font-semibold text-foreground disabled:cursor-default select-none"
    >
      {/* The word flips like a card when the language changes */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={currentLabel}
          initial={{ rotateX: 80, y: 8, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: -80, y: -8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="block whitespace-nowrap leading-none"
        >
          {targetLabel}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
