"use server";

import { unauthorized } from "next/navigation";
import { insertApplication } from "@/entities/application/db/ops";
import { AppError } from "@/shared/lib/errors";
import { formDataToObject } from "@/shared/lib/form-data";
import { getSession } from "@/shared/lib/session";
import { supabaseAdmin } from "@/shared/lib/supabase-server";

import { addApplicationSchema } from "./validators";

export async function createApplication(formData: FormData) {
  const session = await getSession();
  if (!session) {
    unauthorized();
  }

  const rawData = formDataToObject(formData);

  // The client schema expects 'resume' to be a FileList/Array for validation,
  // but formDataToObject gives us a single File. We wrap it for the Zod schema.
  if (rawData.resume && !Array.isArray(rawData.resume)) {
    rawData.resume = [rawData.resume];
  }

  const data = addApplicationSchema.parse(rawData);
  const resume =
    data.resume && data.resume.length > 0 ? data.resume[0] : undefined;
  let resumeVersionId: string | null = null;

  if (resume && resume.size > 0 && resume.name !== "undefined") {
    // 1. Upload to Supabase Storage
    const fileExt = resume.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `user-resumes/${fileName}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("resumes")
      .upload(filePath, resume, {
        contentType: resume.type,
      });

    if (uploadError) {
      throw new AppError("Failed to upload resume file.");
    }

    // 2. Create resume_versions record
    const { data: resumeRecord, error: resumeError } = await supabaseAdmin
      .from("resume_versions")
      .insert({
        name: resume.name,
        file_path: filePath,
        user_id: session.id,
      })
      .select("id")
      .single();

    if (resumeError) {
      throw new AppError("Failed to create resume record.");
    }

    resumeVersionId = resumeRecord.id;
  }

  const { error, data: newApp } = await insertApplication({
    company: data.company,
    role_title: data.roleTitle,
    source: data.source || null,
    current_status: data.currentStatus || "applied",
    job_url: data.jobUrl || null,
    priority: data.priority || 0,
    salary_range: data.salaryRange || null,
    notes: data.notes || null,
    date_applied: data.dateApplied || null,
    resume_version_id: resumeVersionId,
    user_id: session.id,
  });

  if (error) {
    throw new AppError(error.message || "Failed to create application");
  }

  return newApp;
}
