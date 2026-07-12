"use client";

import { useTranslations } from "next-intl";

import { ScrollReveal } from "@/components/scroll-reveal";
import HeroName from "./hero-name";
import HeroAvatar from "./hero-avatar";
import HeroCta from "./hero-cta";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-between overflow-hidden pb-28 pt-10 lg:py-24"
    >
      {/* Main content area — vertically centred in the available space */}
      <div className="container flex flex-1 items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-28 lg:gap-12 xl:gap-24 w-full lg:py-0">
          {/* Text block — Name and hand-drawn annotations */}
          <div className="relative w-fit shrink-0 order-2 lg:order-1">
            {/* "Hello, I'm" — tucked into the top-start, overlapping the name */}
            <ScrollReveal className="absolute top-0 start-[5%] sm:start-[8%] z-10 -translate-y-[70%] rtl:-translate-y-[0%] xl:rtl:translate-y-[60%]">
              <span className="font-hand inline-block text-xl max-sm:rtl:text-lg leading-none text-foreground sm:text-2xl md:text-3xl">
                {t("greeting")}
              </span>
            </ScrollReveal>

            {/* Oversized display name with staggered reveal on load */}
            <HeroName name={t("name")} />

            {/* "software engineer" — tucked under the bottom-end of the name */}
            <ScrollReveal
              className="absolute bottom-0 end-[18%] z-10 translate-y-[70%] rtl:translate-y-[55%]"
              delay={0.55}
            >
              <span className="font-hand inline-block text-xl max-sm:rtl:text-lg leading-none text-foreground sm:text-2xl md:text-3xl">
                {t("role")}
              </span>
            </ScrollReveal>
          </div>

          {/* Avatar block — polaroid sticker */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end items-center flex-1 w-full lg:w-auto">
            <HeroAvatar delay={0.65} />
          </div>
        </div>
      </div>

      {/* Call-to-action buttons — toward the bottom of the section */}
      <div className="container mt-20 lg:mt-0 flex justify-center lg:justify-start">
        <ScrollReveal delay={0.8}>
          <HeroCta />
        </ScrollReveal>
      </div>
    </section>
  );
}
