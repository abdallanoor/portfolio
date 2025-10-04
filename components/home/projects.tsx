import { useTranslations } from "next-intl";
import SectionHeader from "../section-header";
import { ProjectCard, ProjectData } from "../porject-card";

export default function Projects() {
  const t = useTranslations("projects");

  const projectsData: ProjectData[] = [
    {
      year: "2025",
      status: "in-development",
      featured: false,
      projectUrl: "https://wattsupmedia.vercel.app",
      docsUrl: "https://github.com/abdallanoor/watts-up-media",
      title: t("list.6.title"),
      description: t("list.6.description"),
      technologies: ["nextjs", "tailwindcss", "shadcn-ui", "resend"],
    },
    {
      year: "2025",
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
    {
      year: "2025",
      status: "active",
      featured: false,
      projectUrl: "https://tazkaraa.vercel.app",
      docsUrl: "https://github.com/abdallanoor/event-booking-platform",
      title: t("list.3.title"),
      description: t("list.3.description"),
      technologies: ["angular", "primeng", "tailwindcss", "ngx-translate"],
    },
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
  ];

  return (
    <section className="relative bg-section scroll-mt-16" id="projects">
      <div className="section container">
        <div className="md:col-span-2 md:sticky md:top-20 md:self-start">
          <SectionHeader title={t("title")} description={t("description")} />
        </div>
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 gap-6">
            {projectsData.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
