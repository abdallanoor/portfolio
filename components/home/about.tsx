"use client";

import { useTranslations } from "next-intl";
import SectionHeader from "../section-header";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Tailwind",
  "Node.js",
  "MongoDB",
  "Docker",
  "Git & GitHub",
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.9,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function About() {
  const t = useTranslations("about");
  const techRef = useRef<HTMLDivElement>(null);
  const isTechInView = useInView(techRef, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section container" id="about">
      <div className="md:col-span-2">
        <ScrollReveal width="100%" delay={0.4}>
          <SectionHeader title={t("title")} description={t("description")} />
        </ScrollReveal>
      </div>
      <div className="md:col-span-3">
        <ScrollReveal width="100%" delay={0.6}>
          <div className="flex flex-col gap-4">
            <p>{t("description1")}</p>
            <p>{t("description2")}</p>
          </div>
        </ScrollReveal>
        <div ref={techRef} className="mt-6">
          <ScrollReveal width="100%" delay={0.8}>
            <p className="mb-3 text-xl font-medium">{t("technologies")}</p>
          </ScrollReveal>
          {shouldReduceMotion ? (
            <div className="flex gap-1 flex-wrap">
              {technologies.map((tech, i) => (
                <Badge variant="secondary" className="px-3 py-1" key={i}>
                  {tech}
                </Badge>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isTechInView ? "show" : "hidden"}
              className="flex gap-1 flex-wrap"
            >
              {technologies.map((tech, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Badge variant="secondary" className="px-3 py-1">
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
