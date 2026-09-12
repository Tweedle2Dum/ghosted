import {
  columnVisibilityFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import type { Application, ApplicationStatus } from "./types";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  applied: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  screening: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  interview: "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20",
  offer: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  rejected: "bg-muted text-muted-foreground hover:bg-muted/80",
  ghosted: "bg-muted text-muted-foreground hover:bg-muted/80",
  withdrew: "bg-muted text-muted-foreground hover:bg-muted/80",
};

interface ApplicationsTableProps {
  data: Application[];
}

const features = tableFeatures({
  rowSortingFeature,
  rowSelectionFeature,
  columnVisibilityFeature,
  sortedRowModel: createSortedRowModel(),
});

const helper = createColumnHelper<typeof features, Application>();

const columns = helper.columns([
  helper.accessor("company", {
    header: "Company",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("company")}</div>
    ),
  }),
  helper.accessor("roleTitle", {
    header: "Role",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("roleTitle")}</div>
    ),
  }),
  helper.accessor("currentStatus", {
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("currentStatus") as ApplicationStatus;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
              <Badge
                variant="secondary"
                className={`capitalize px-2 py-0.5 rounded-sm font-medium border-0 cursor-pointer ${STATUS_COLORS[status]}`}
              >
                {status}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.keys(STATUS_COLORS).map((s) => (
              <DropdownMenuItem key={s} className="capitalize">
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
  helper.accessor("dateApplied", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="-ml-4 h-8 text-xs hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Applied
          <ArrowUpDown className="ml-2 size-3" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("dateApplied")}</div>,
  }),
  helper.accessor("resumeVersionName", {
    header: "Resume",
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("resumeVersionName")}
      </div>
    ),
  }),
  helper.accessor("daysInStatus", {
    header: "Days in Status",
    cell: ({ row }) => (
      <div className="text-right pr-4">{row.getValue("daysInStatus")}d</div>
    ),
  }),
  helper.display({
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit application</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);

export function ApplicationsTable({ data }: ApplicationsTableProps) {
  const table = useTable({
    features,
    data,
    columns,
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b-border/40 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="h-10 text-xs py-2 whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="text-xs border-b-border/40 hover:bg-muted/30 cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-2.5">
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
