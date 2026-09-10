"use client";

import { Activity, ArrowUpRight, CheckCircle2, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { DUMMY_PROJECTS } from "@/entities/project";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { MetricCard } from "@/shared/ui/metric-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

export function DashboardPage() {
  const [projects] = useState(DUMMY_PROJECTS);

  const handleAction = (msg: string) => {
    toast.success(msg);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            System Operations & Telemetry
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Active workspace node:{" "}
            <span className="text-foreground font-medium">
              primary-cluster-01
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              handleAction("System diagnostic passed. Latency: 12ms.")
            }
          >
            <Activity className="size-3.5 mr-1.5" />
            Run Diagnostics
          </Button>
          <Button
            size="sm"
            onClick={() =>
              handleAction("Initializing new project deployment...")
            }
          >
            <Plus className="size-3.5 mr-1.5" />
            New Project
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Projects"
          value="12"
          description="Across 4 active clusters"
          trend={{ value: 3, percentage: 25, direction: "up" }}
        />
        <MetricCard
          title="Engine Throughput"
          value="98.4k"
          valueSuffix="req/s"
          description="Average cluster ingestion"
          trend={{ value: 12000, percentage: 14.2, direction: "up" }}
        />
        <MetricCard
          title="Cluster Uptime"
          value="99.98%"
          description="Past 90 days SLA target"
          trend={{ value: 0, percentage: 0.1, direction: "neutral" }}
        />
        <MetricCard
          title="Task Completion"
          value="94.2%"
          description="Automated runner runs"
          trend={{ value: 5, percentage: 2.4, direction: "up" }}
        />
      </div>

      {/* Main Grid: Projects Table + Quick Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">
                Active Repositories
              </CardTitle>
              <CardDescription className="text-xs">
                Real-time project statuses and milestone tracking
              </CardDescription>
            </div>
            <Button variant="ghost" size="xs" asChild>
              <Link href="/projects" className="gap-1">
                View all <ArrowUpRight className="size-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead>Project</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} className="text-xs">
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold text-foreground">
                          {project.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">
                          {project.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                        {project.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          project.status === "active"
                            ? "default"
                            : project.status === "completed"
                              ? "outline"
                              : "secondary"
                        }
                        className="text-[10px] capitalize px-2 py-0"
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {project.progress}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick System Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              System Audit Feed
            </CardTitle>
            <CardDescription className="text-xs">
              Live telemetry & agent execution events
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Ghost Runner v2.4 deployed",
                time: "5m ago",
                detail: "Clean build with zero bundle warnings",
              },
              {
                title: "Biome lint suite cleared",
                time: "24m ago",
                detail: "0 errors, 0 warnings across project files",
              },
              {
                title: "Memory limit normalized",
                time: "1h ago",
                detail: "Cluster memory reclaimed: 4.2 GB",
              },
              {
                title: "Auth token rotated",
                time: "3h ago",
                detail: "Automated session refresh flow completed",
              },
            ].map((event, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="mt-0.5 rounded-full p-1 bg-primary/10 text-primary">
                  <CheckCircle2 className="size-3.5" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">
                      {event.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {event.detail}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
