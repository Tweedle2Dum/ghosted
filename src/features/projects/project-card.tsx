"use client";

import { ArrowUpRight, Users } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/entities/project";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColor = {
    active: "default",
    completed: "outline",
    draft: "secondary",
    archived: "destructive",
  }[project.status] as "default" | "outline" | "secondary" | "destructive";

  return (
    <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-center justify-between">
          <Badge
            variant={statusColor}
            className="capitalize text-xs font-semibold"
          >
            {project.status}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {project.category}
          </span>
        </div>
        <CardTitle className="text-base font-semibold leading-snug">
          <Link
            href={`/projects`}
            className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
          >
            {project.name}
            <ArrowUpRight className="size-3.5 opacity-60" />
          </Link>
        </CardTitle>
        <CardDescription className="text-xs line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-muted-foreground">
            <span>Milestone Progress</span>
            <span className="text-foreground">{project.progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Users className="size-3.5" />
          <span>{project.membersCount} collaborators</span>
        </div>
        <Button variant="ghost" size="xs">
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
