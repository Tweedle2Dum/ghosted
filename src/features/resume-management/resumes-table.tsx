"use client";

import {
  columnVisibilityFeature,
  createColumnHelper,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Download, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import type { ResumeVersion } from "@/entities/resume/models";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useDeleteResume, useResumes, useUpdateResume } from "./hooks";

function ResumeTableActions({ resume }: { resume: ResumeVersion }) {
  const deleteResume = useDeleteResume();
  const updateResume = useUpdateResume();

  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(resume.notes || "");
  const [targetRole, setTargetRole] = useState(resume.targetRoleType || "");

  const handleSaveEdit = () => {
    updateResume.mutate(
      {
        resumeId: resume.id,
        notes,
        targetRoleType: targetRole,
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setNotes(resume.notes || "");
          setTargetRole(resume.targetRoleType || "");
          setIsEditing(true);
        }}
        title="Edit details"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        onClick={() => {
          if (
            confirm(
              `Are you sure you want to delete ${resume.name}? This will also unlink it from any applications using it.`,
            )
          ) {
            deleteResume.mutate(resume.id);
          }
        }}
        disabled={deleteResume.isPending}
        title="Delete resume"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Resume Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="targetRole">Target Role</Label>
              <Input
                id="targetRole"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Frontend Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Custom tailored for Startup X"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={updateResume.isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const features = tableFeatures({
  columnVisibilityFeature,
});
const helper = createColumnHelper<typeof features, ResumeVersion>();

const columns = helper.columns([
  helper.accessor("name", {
    header: "File Name",
    cell: ({ row }) => {
      const resume = row.original;
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const downloadUrl = `${supabaseUrl}/storage/v1/object/public/resumes/${resume.filePath}`;

      return (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-medium text-primary hover:underline"
        >
          {resume.name}
          <Download className="h-3 w-3" />
        </a>
      );
    },
  }),
  helper.accessor("targetRoleType", {
    header: "Target Role",
    cell: ({ row }) => {
      const type = row.original.targetRoleType;
      return type ? (
        <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
          {type}
        </span>
      ) : (
        <span className="text-muted-foreground text-xs italic">
          Not specified
        </span>
      );
    },
  }),
  helper.accessor("notes", {
    header: "Notes",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground truncate max-w-[200px] block">
          {row.original.notes || "-"}
        </span>
      );
    },
  }),
  helper.accessor("createdAt", {
    header: "Uploaded",
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {format(new Date(row.original.createdAt), "MMM d, yyyy")}
        </span>
      );
    },
  }),
  helper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ResumeTableActions resume={row.original} />,
  }),
]);

export function ResumesTable() {
  const { data: resumes } = useResumes();

  const table = useTable({
    features,
    data: resumes || [],
    columns,
  });

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                No resumes uploaded yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
