"use client";

import { useState } from "react";
import { CodeXml, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

export interface ProjectData {
  year: string;
  status: "active" | "archived" | "in-development";
  featured: boolean;
  title: string;
  description: string;
  projectUrl?: string;
  docsUrl?: string;
  technologies: string[];
}

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [showAllTech, setShowAllTech] = useState(false);
  const tStatus = useTranslations("projects.status");
  const t = useTranslations("projects");

  const visibleTech = showAllTech
    ? project.technologies
    : project.technologies.slice(0, 5);
  const hiddenCount = project.technologies.length - 5;

  return (
    <Card className="project-card group shadow-none">
      <CardHeader className="gap-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time className="font-medium">{project.year}</time>
            <Badge
              variant={project.status === "archived" ? "secondary" : "outline"}
              className={`rounded-full leading-normal border-0 ${
                project.status === "active"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                  : project.status === "in-development"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  : ""
              }`}
            >
              {tStatus(project.status)}
            </Badge>
            {project.featured && (
              <Badge
                variant="outline"
                className="rounded-full leading-normal border-0 bg-purple-200 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
              >
                {tStatus("featured")}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-1">
            {project.projectUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="size-6 opacity-60 hover:opacity-100"
                asChild
              >
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Link2 className="size-4" />
                </a>
              </Button>
            )}
            {project.docsUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="size-6 opacity-60 hover:opacity-100"
                asChild
              >
                <a
                  href={project.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CodeXml className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-balance leading-tight mb-2">
              {project.projectUrl ? (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition-all"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
              {project.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-1.5">
        {visibleTech.map((tech, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted transition-colors"
          >
            {tech}
          </Badge>
        ))}

        {hiddenCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setShowAllTech(!showAllTech)}
          >
            {showAllTech ? t("buttons.hide") : `+${hiddenCount}`}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
