"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { MetricCard } from "@/shared/ui/metric-card";

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Analytics & System Telemetry
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Observability telemetry, compute efficiency, and endpoint
            performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export JSON
          </Button>
          <Button size="sm">Configure Alerts</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="P99 Response Latency"
          value="18"
          valueSuffix="ms"
          description="Edge network global median"
          trend={{ value: 2, percentage: 4.5, direction: "up" }}
        />
        <MetricCard
          title="Total Handled Requests"
          value="4.82"
          valueSuffix="M"
          description="Last 30-day window"
          trend={{ value: 500000, percentage: 18.2, direction: "up" }}
        />
        <MetricCard
          title="Error Budget Consumed"
          value="0.012%"
          description="SLA intact (>99.9%)"
          trend={{ value: 0, percentage: 0.1, direction: "neutral" }}
        />
        <MetricCard
          title="Compute Allocation"
          value="34.6%"
          description="32 of 96 active cores"
          trend={{ value: 4, percentage: 3.2, direction: "down" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Endpoint Latency Profile
            </CardTitle>
            <CardDescription className="text-xs">
              Response distribution across global edge regions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                region: "us-east-1 (N. Virginia)",
                p50: "8 ms",
                p99: "14 ms",
                status: "Optimal",
              },
              {
                region: "eu-central-1 (Frankfurt)",
                p50: "12 ms",
                p99: "21 ms",
                status: "Optimal",
              },
              {
                region: "ap-southeast-1 (Singapore)",
                p50: "18 ms",
                p99: "32 ms",
                status: "Normal",
              },
              {
                region: "us-west-2 (Oregon)",
                p50: "10 ms",
                p99: "16 ms",
                status: "Optimal",
              },
            ].map((node) => (
              <div
                key={node.region}
                className="flex items-center justify-between rounded-xl border border-border/50 bg-secondary/30 p-3 text-xs"
              >
                <div>
                  <p className="font-semibold text-foreground">{node.region}</p>
                  <p className="text-[11px] text-muted-foreground">
                    p50: {node.p50} · p99: {node.p99}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {node.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Event Throughput Distribution
            </CardTitle>
            <CardDescription className="text-xs">
              Message broker ingestion and consumer delivery rates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                topic: "agent.telemetry.events",
                rate: "24,800 msg/s",
                load: "78%",
              },
              {
                topic: "workspace.audit.logs",
                rate: "8,450 msg/s",
                load: "42%",
              },
              {
                topic: "auth.session.rotations",
                rate: "1,200 msg/s",
                load: "14%",
              },
              {
                topic: "system.healthcheck.ticks",
                rate: "600 msg/s",
                load: "5%",
              },
            ].map((stream) => (
              <div key={stream.topic} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-foreground font-mono">
                    {stream.topic}
                  </span>
                  <span className="text-muted-foreground">{stream.rate}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: stream.load }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
