"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ApplicationStatus } from "@/entities/application/models";
import { objectToFormData } from "@/shared/lib/form-data";
import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { useAddApplication } from "./hooks";
import { StatusSelect } from "./ui/status-select";
import {
  type AddApplicationFormData,
  addApplicationSchema,
} from "./validators";

export function AddApplicationModal() {
  const [open, setOpen] = useState(false);
  const addApplication = useAddApplication();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<AddApplicationFormData>({
    resolver: zodResolver(addApplicationSchema),
    defaultValues: {
      company: "",
      roleTitle: "",
      source: "",
      currentStatus: "applied",
    },
  });

  const currentStatus = watch("currentStatus");

  const onSubmit = (data: AddApplicationFormData) => {
    const { resume, ...rest } = data;
    const formData = objectToFormData({
      ...rest,
      resume: resume && resume.length > 0 ? resume[0] : undefined,
    });

    addApplication.mutate(formData, {
      onSuccess: () => {
        toast.success("Application added successfully");
        setOpen(false);
        reset();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to add application");
      },
    });
  };

  const isPending = addApplication.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-3.5 mr-1.5" />
          Add application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>
            Track a new job application. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
        >
          <Field>
            <FieldLabel>Company</FieldLabel>
            <Input placeholder="Acme Corp" {...register("company")} />
            {errors.company && (
              <FieldError>{errors.company.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Role Title</FieldLabel>
            <Input
              placeholder="Senior Frontend Engineer"
              {...register("roleTitle")}
            />
            {errors.roleTitle && (
              <FieldError>{errors.roleTitle.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Source</FieldLabel>
            <Input
              placeholder="LinkedIn, Referral, etc."
              {...register("source")}
            />
            {errors.source && <FieldError>{errors.source.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Job URL</FieldLabel>
            <Input placeholder="https://..." {...register("jobUrl")} />
            {errors.jobUrl && <FieldError>{errors.jobUrl.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel>Priority</FieldLabel>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select
                  value={field.value?.toString() ?? ""}
                  onValueChange={(val) => field.onChange(parseInt(val, 10))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 (Highest)</SelectItem>
                    <SelectItem value="4">4 (High)</SelectItem>
                    <SelectItem value="3">3 (Medium)</SelectItem>
                    <SelectItem value="2">2 (Low)</SelectItem>
                    <SelectItem value="1">1 (Lowest)</SelectItem>
                    <SelectItem value="0">0 (None)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.priority && (
              <FieldError>{errors.priority.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Date Applied</FieldLabel>
            <Controller
              control={control}
              name="dateApplied"
              render={({ field }) => (
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) =>
                    field.onChange(date ? date.toISOString().split("T")[0] : "")
                  }
                />
              )}
            />
            {errors.dateApplied && (
              <FieldError>{errors.dateApplied.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Salary Range</FieldLabel>
            <Input placeholder="$100k - $120k" {...register("salaryRange")} />
            {errors.salaryRange && (
              <FieldError>{errors.salaryRange.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel>Status</FieldLabel>
            <StatusSelect
              value={currentStatus}
              onValueChange={(val) =>
                setValue("currentStatus", val as ApplicationStatus)
              }
            />
            {errors.currentStatus && (
              <FieldError>{errors.currentStatus.message}</FieldError>
            )}
          </Field>

          <div className="md:col-span-2">
            <Field>
              <FieldLabel>Resume (PDF max 5MB)</FieldLabel>
              <Input
                type="file"
                accept="application/pdf"
                {...register("resume")}
              />
              {errors.resume && (
                <FieldError>{errors.resume?.message as string}</FieldError>
              )}
            </Field>
          </div>

          <div className="md:col-span-2">
            <Field>
              <FieldLabel>Notes</FieldLabel>
              <Textarea
                placeholder="Any extra info..."
                className="resize-none"
                rows={3}
                {...register("notes")}
              />
              {errors.notes && <FieldError>{errors.notes.message}</FieldError>}
            </Field>
          </div>

          <DialogFooter className="pt-4 md:col-span-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
