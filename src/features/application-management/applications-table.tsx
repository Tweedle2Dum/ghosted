import {
  columnVisibilityFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  APPLICATION_STATUSES,
  type Application,
} from "@/entities/application/models";
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
import { useUpdateApplicationStatus } from "./hooks";
import { ApplicationStatusBadge } from "./ui/ApplicationStatusBadge";
import { ApplicationTableActionsMenu } from "./ui/application-table-actions-menu";

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

function ApplicationTableStatusMenu({
  application,
}: {
  application: Application;
}) {
  const updateStatus = useUpdateApplicationStatus();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <ApplicationStatusBadge
            status={application.currentStatus}
            className="cursor-pointer"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {APPLICATION_STATUSES.map((s) => (
          <DropdownMenuItem
            key={s}
            className="capitalize"
            onSelect={() => {
              updateStatus.mutate({ applicationId: application.id, status: s });
            }}
            disabled={updateStatus.isPending}
          >
            {s}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
    cell: ({ row }) => (
      <ApplicationTableStatusMenu application={row.original} />
    ),
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
        {row.getValue("resumeVersionName") || "-"}
      </div>
    ),
  }),
  helper.accessor("daysInStatus", {
    header: () => <div className="text-right pr-4">Days in Status</div>,
    cell: ({ row }) => (
      <div className="text-right pr-4">{row.getValue("daysInStatus")}d</div>
    ),
  }),
  helper.display({
    id: "actions",
    cell: ({ row }) => (
      <ApplicationTableActionsMenu application={row.original} />
    ),
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
