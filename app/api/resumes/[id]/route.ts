import type { NextRequest } from "next/server";
import { deleteResume, updateResume } from "@/entities/resume/db/ops";
import { jsonError, jsonOk } from "@/shared/lib/api-helpers";
import { getSession } from "@/shared/lib/session";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return jsonError("Unauthorized", 401);
  }

  const { id } = await params;

  if (!id) {
    return jsonError("Missing resume ID", 400);
  }

  const { error } = await deleteResume(id, session.id);

  if (error) {
    return jsonError(error.message, error.status || 500);
  }

  return jsonOk({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session) {
    return jsonError("Unauthorized", 401);
  }

  const { id } = await params;

  if (!id) {
    return jsonError("Missing resume ID", 400);
  }

  const body = await req.json();

  const { data, error } = await updateResume(id, session.id, {
    notes: body.notes,
    targetRoleType: body.targetRoleType,
  });

  if (error) {
    return jsonError(error.message, error.status || 500);
  }

  return jsonOk(data);
}
