export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "active" | "archived" | "draft" | "completed";
  category: "Design" | "Engineering" | "Security" | "Product";
  progress: number;
  membersCount: number;
  updatedAt: string;
  createdAt: string;
}

export const DUMMY_PROJECTS: Project[] = [
  {
    id: "proj-1",
    name: "Autonomous Ghost Runner",
    slug: "autonomous-ghost-runner",
    description:
      "Next-gen headless background agent runner with telemetry streaming.",
    status: "active",
    category: "Engineering",
    progress: 78,
    membersCount: 4,
    updatedAt: "2026-09-02T14:22:00Z",
    createdAt: "2026-08-15T09:00:00Z",
  },
  {
    id: "proj-2",
    name: "Ghosted Design System",
    slug: "ghosted-design-system",
    description:
      "Multi-platform theme token infrastructure and Radix primitive kits.",
    status: "completed",
    category: "Design",
    progress: 100,
    membersCount: 2,
    updatedAt: "2026-09-01T11:45:00Z",
    createdAt: "2026-07-20T10:30:00Z",
  },
  {
    id: "proj-3",
    name: "Zero-Knowledge Auth Vault",
    slug: "zk-auth-vault",
    description:
      "Ephemeral credential delegation engine with cryptographic verification.",
    status: "active",
    category: "Security",
    progress: 45,
    membersCount: 6,
    updatedAt: "2026-09-03T18:10:00Z",
    createdAt: "2026-08-28T16:00:00Z",
  },
  {
    id: "proj-4",
    name: "Observability Pipeline",
    slug: "observability-pipeline",
    description:
      "Real-time edge event collector with ultra-low latency analytics dispatch.",
    status: "draft",
    category: "Product",
    progress: 20,
    membersCount: 3,
    updatedAt: "2026-08-30T08:00:00Z",
    createdAt: "2026-08-25T12:00:00Z",
  },
];
