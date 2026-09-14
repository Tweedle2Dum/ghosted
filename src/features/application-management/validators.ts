import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

/**
 * Zod validation schema for adding a new job application.
 */
export const addApplicationSchema = z.object({
  company: z.string().min(1, "Company is required"),
  roleTitle: z.string().min(1, "Role title is required"),
  source: z.string().optional().or(z.literal("")),
  currentStatus: z.enum([
    "applied",
    "screening",
    "interview",
    "offer",
    "rejected",
    "ghosted",
    "withdrew",
  ]),
  jobUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  priority: z.coerce.number().min(0).max(5).optional(),
  salaryRange: z.string().optional(),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  dateApplied: z.string().optional(),
  resume: z
    .any()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return files[0].size <= MAX_FILE_SIZE;
    }, `Max file size is 5MB.`)
    .refine((files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_FILE_TYPES.includes(files[0].type);
    }, "Only .pdf files are accepted.")
    .optional(),
});

/**
 * Inferred TypeScript form data type for adding a job application.
 */
export type AddApplicationFormData = z.infer<typeof addApplicationSchema>;
