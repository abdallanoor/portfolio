import { useTranslations } from "next-intl";
import SectionHeader from "../section-header";
import { Badge } from "../ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Tailwind",
  "Shadcn UI",
  "PrimeNG",
  "Framer Motion",
  "Git & GitHub",
];

export default function About() {
  const t = useTranslations("about");

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
        <div className="mt-6">
          <ScrollReveal width="100%" delay={0.8}>
            <p className="mb-3 text-xl font-medium">{t("technologies")}</p>
            <div className="flex gap-1 flex-wrap">
              {technologies.map((tech, i) => (
                <Badge variant="secondary" className="px-3 py-1" key={i}>
                  {tech}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
