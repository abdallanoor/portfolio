import { useTranslations } from "next-intl";
import SectionHeader from "../section-header";
import { ProjectCard, ProjectData } from "../porject-card";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Projects() {
  const t = useTranslations("projects");

  const projectsData: ProjectData[] = [
    {
      year: "2026",
      status: "in-development",
      featured: true,
      projectUrl: "https://booking-solution.vercel.app",
      docsUrl: "https://github.com/abdallanoor/booking",
      title: t("list.7.title"),
      description: t("list.7.description"),
      technologies: [
        "nextjs",
        "mongodb",
        "paymob",
        "jwt-auth",
        "google-oauth",
        "cloudinary",
        "nodemailer",
      ],
    },
    {
      year: "2025",
      status: "active",
      featured: false,
      projectUrl: "https://wattsupmedia-dev.vercel.app",
      // docsUrl: "https://github.com/abdallanoor/watts-up-media",
      title: t("list.6.title"),
      description: t("list.6.description"),
      technologies: [
        "nextjs",
        "mongodb",
        "stripe",
        "dropbox-api",
        "jwt-auth",
        "tailwindcss",
        "shadcn-ui",
        "framer-motion",
      ],
    },
    {
      year: "2025",
      status: "archived",
      featured: false,
      title: t("list.2.title"),
      description: t("list.2.description"),
      technologies: [
        "react",
        "tailwindcss",
        "i18n",
        "restapi",
        "nodejs",
        "expressjs",
        "mongodb",
      ],
    },
    {
      year: "2025",
      status: "active",
      featured: false,
      projectUrl: "https://perapixel.com",
      docsUrl: "https://github.com/abdallanoor/pera-pixel",
      title: t("list.1.title"),
      description: t("list.1.description"),
      technologies: [
        "nextjs",
        "tailwindcss",
        "shadcn-ui",
        "framer-motion",
        "resend",
      ],
    },
    // {
    //   year: "2025",
    //   status: "active",
    //   featured: false,
    //   projectUrl: "https://tazkaraa.vercel.app",
    //   docsUrl: "https://github.com/abdallanoor/event-booking-platform",
    //   title: t("list.3.title"),
    //   description: t("list.3.description"),
    //   technologies: ["angular", "primeng", "tailwindcss", "ngx-translate"],
    // },
    {
      year: "2024",
      status: "active",
      featured: false,
      projectUrl: "https://ecommerce-angular-project.vercel.app",
      docsUrl: "https://github.com/abdallanoor/angular-ecommerce",
      title: t("list.4.title"),
      description: t("list.4.description"),
      technologies: ["angular", "primeng", "tailwindcss", "restapi", "stripe"],
    },
    {
      year: "2024",
      status: "active",
      featured: true,
      projectUrl: "https://warehouse-management-project.vercel.app",
      docsUrl: "https://github.com/abdallanoor/warehouse-managment-system",
      title: t("list.5.title"),
      description: t("list.5.description"),
      technologies: [
        "react",
        "tailwindcss",
        "shadcn-ui",
        "context-api",
        "react-query",
        "restapi",
        "i18n",
      ],
    },
    {
      year: "2023",
      status: "in-development",
      featured: true,
      projectUrl: "https://iwanacademy.net",
      docsUrl: "https://github.com/abdallanoor/iwan-academy",
      title: t("list.0.title"),
      description: t("list.0.description"),
      technologies: [
        "nextjs",
        "tailwindcss",
        "shadcn-ui",
        "next-intl",
        "paypal",
        "restapi",
        "nodejs",
        "expressjs",
        "mongodb",
      ],
    },
  ];

  return (
    <section className="relative bg-section" id="projects">
      <div className="section container">
        <div className="md:col-span-2 md:sticky md:top-20 md:self-start">
          <ScrollReveal width="100%" delay={0.4}>
            <SectionHeader title={t("title")} description={t("description")} />
          </ScrollReveal>
        </div>
        <div className="md:col-span-3">
          <ScrollReveal width="100%" delay={0.6}>
            <div className="grid grid-cols-1 gap-6">
              {projectsData.map((project, i) => (
                <ScrollReveal key={i} width="100%">
                  <ProjectCard project={project} />
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
