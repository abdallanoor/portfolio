import { useTranslations } from "next-intl";
import SectionHeader from "../section-header";
import { Badge } from "../ui/badge";

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
    <section className="section container scroll-mt-16" id="about">
      <div className="md:col-span-2">
        <SectionHeader title={t("title")} description={t("description")} />
      </div>
      <div className="md:col-span-3">
        <div className="flex flex-col gap-4">
          <p>{t("description1")}</p>
          <p>{t("description2")}</p>
        </div>
        <div className="mt-6">
          <p className="mb-3 text-xl font-medium">{t("technologies")}</p>
          <div className="flex gap-1 flex-wrap">
            {technologies.map((tech, i) => (
              <Badge variant="secondary" className="px-3 py-1" key={i}>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
