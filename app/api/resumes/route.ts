import { getResumes } from "@/entities/resume/db/ops";
import { jsonError, jsonOk } from "@/shared/lib/api-helpers";
import { getSession } from "@/shared/lib/session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return jsonError("Unauthorized", 401);
  }

  const { data, error } = await getResumes(session.id);

  if (error) {
    return jsonError(error.message, error.status || 500);
  }

  return jsonOk(data);
}
