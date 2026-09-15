import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import { type StepOneFormData, stepOneSchema } from "../validators";

export function StepOne({
  defaultValues,
  onNext,
}: {
  defaultValues?: Partial<StepOneFormData>;
  onNext: (data: StepOneFormData) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      company: defaultValues?.company || "",
      roleTitle: defaultValues?.roleTitle || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4 py-4">
      <Field>
        <FieldLabel>Company</FieldLabel>
        <Input placeholder="Acme Corp" {...register("company")} autoFocus />
        {errors.company && <FieldError>{errors.company.message}</FieldError>}
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

      <div className="flex justify-end pt-4">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
