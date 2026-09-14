import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Clock, GripVertical } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  Application,
  ApplicationStatus,
} from "@/entities/application/models";
import { cn } from "@/shared/lib/utils";
import { Badge, badgeVariants } from "@/shared/ui/badge";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";
import { statusConfig } from "./ui/ApplicationStatusBadge";

const STATUSES: { id: ApplicationStatus; label: string }[] = [
  { id: "applied", label: "Applied" },
  { id: "screening", label: "Screening" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Rejected" },
  { id: "ghosted", label: "Ghosted" },
  { id: "withdrew", label: "Withdrew" },
];

function KanbanCard({
  application,
  isDragging,
}: {
  application: Application;
  isDragging?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: application.id,
    data: { application },
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.4 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-md border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow p-3 space-y-2 cursor-grab active:cursor-grabbing ${isDragging ? "ring-2 ring-primary opacity-50" : ""}`}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-sm leading-none mb-1">
            {application.company}
          </p>
          <p className="text-xs text-muted-foreground">
            {application.roleTitle}
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="size-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <Badge
          variant="outline"
          className="text-[10px] px-1.5 py-0 rounded-sm font-normal"
        >
          {application.source}
        </Badge>
        <div className="flex items-center text-[10px] text-muted-foreground">
          <Clock className="size-3 mr-1" />
          {application.daysInStatus}d
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({
  status,
  applications,
}: {
  status: { id: ApplicationStatus; label: string };
  applications: Application[];
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: status.id,
  });

  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div
        className={cn(
          badgeVariants({ variant: statusConfig[status.id].variant }),
          "flex w-full items-center justify-between mb-3 px-3 py-2 rounded-md text-sm",
        )}
      >
        <span className="font-semibold">{status.label}</span>
        <span className="text-xs font-medium bg-background/50 rounded-full px-2 py-0.5">
          {applications.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex-1 rounded-md bg-muted/30 p-2 min-h-[500px] flex flex-col gap-2 transition-colors ${
          isOver ? "bg-muted/60 ring-2 ring-primary/20" : ""
        }`}
      >
        {applications.map((app) => (
          <KanbanCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  );
}

interface ApplicationsKanbanProps {
  data: Application[];
  onDataChange?: (newData: Application[]) => void;
}

export function ApplicationsKanban({
  data,
  onDataChange,
}: ApplicationsKanbanProps) {
  const [localData, setLocalData] = useState<Application[]>(data);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const activeApplication = useMemo(
    () => localData.find((app) => app.id === activeId),
    [activeId, localData],
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeApp = active.data.current?.application as Application;
      const newStatus = over.id as ApplicationStatus;

      if (activeApp && newStatus && activeApp.currentStatus !== newStatus) {
        const newData = localData.map((app) =>
          app.id === activeApp.id
            ? { ...app, currentStatus: newStatus, daysInStatus: 0 }
            : app,
        );
        setLocalData(newData);
        onDataChange?.(newData);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 p-4 min-h-[600px] h-full items-start">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status.id}
              status={status}
              applications={localData.filter(
                (app) => app.currentStatus === status.id,
              )}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <DragOverlay>
        {activeApplication ? (
          <KanbanCard application={activeApplication} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
