import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { ApplicationStatus } from "@/entities/application/models";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/shared/ui/attachment";
import { Button } from "@/shared/ui/button";
import { DatePicker } from "@/shared/ui/date-picker";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { FileUpload } from "@/shared/ui/file-upload";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { PrioritySelect } from "../ui/priority-select";
import { StatusSelect } from "../ui/status-select";
import { type StepTwoFormData, stepTwoSchema } from "../validators";

export function StepTwo({
  defaultValues,
  onFinalSubmit,
  onBack,
  isPending,
}: {
  defaultValues?: Partial<StepTwoFormData>;
  onFinalSubmit: (data: StepTwoFormData) => void;
  onBack: () => void;
  isPending: boolean;
}) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      source: defaultValues?.source || "",
      jobUrl: defaultValues?.jobUrl || "",
      currentStatus: defaultValues?.currentStatus || "applied",
      priority: defaultValues?.priority,
      salaryRange: defaultValues?.salaryRange || "",
      dateApplied: defaultValues?.dateApplied || "",
      notes: defaultValues?.notes || "",
      resume: defaultValues?.resume,
    },
  });

  const currentStatus = watch("currentStatus");
  const resumeFiles = watch("resume") as FileList | undefined;
  const resumeFile =
    resumeFiles && resumeFiles.length > 0 ? resumeFiles[0] : null;

  return (
    <form
      onSubmit={handleSubmit(onFinalSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
    >
      <Field>
        <FieldLabel>Source</FieldLabel>
        <Input placeholder="LinkedIn, Referral, etc." {...register("source")} />
        {errors.source && <FieldError>{errors.source.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel>Job URL</FieldLabel>
        <Input placeholder="https://..." {...register("jobUrl")} />
        {errors.jobUrl && <FieldError>{errors.jobUrl.message}</FieldError>}
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

      <Field>
        <FieldLabel>Priority</FieldLabel>
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <PrioritySelect
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
        {errors.priority && <FieldError>{errors.priority.message}</FieldError>}
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

      <div className="md:col-span-2">
        <Field>
          <FieldLabel>Resume</FieldLabel>
          <FileUpload
            accept="application/pdf"
            description="PDF up to 5MB"
            {...register("resume")}
          />
          {!!resumeFile && (
            <div className="mt-3">
              <Attachment size="sm">
                <AttachmentMedia>
                  <FileText className="size-4" />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{resumeFile.name}</AttachmentTitle>
                  <AttachmentDescription>
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    aria-label="Remove resume"
                    onClick={() => setValue("resume", undefined)}
                  >
                    <X className="size-4" />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </div>
          )}
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

      <div className="md:col-span-2 flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isPending}
        >
          Back
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add Application"}
        </Button>
      </div>
    </form>
  );
}
