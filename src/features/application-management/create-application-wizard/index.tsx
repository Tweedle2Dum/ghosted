"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { objectToFormData } from "@/shared/lib/form-data";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useAddApplication } from "../hooks";
import type { AddApplicationFormData } from "../validators";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";

const TOTAL_STEPS = 2;

export function CreateApplicationWizard() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<AddApplicationFormData>>({});

  const addApplication = useAddApplication();

  const handleNext = (stepData: Partial<AddApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = (stepData: Partial<AddApplicationFormData>) => {
    const finalData = { ...formData, ...stepData } as AddApplicationFormData;

    const { resume, ...rest } = finalData;
    const submitData = objectToFormData({
      ...rest,
      resume: resume && resume.length > 0 ? resume[0] : undefined,
    });

    addApplication.mutate(submitData, {
      onSuccess: () => {
        toast.success("Application added successfully");
        setOpen(false);
        // Reset state after closing
        setTimeout(() => {
          setStep(1);
          setFormData({});
        }, 300);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to add application");
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setTimeout(() => {
            setStep(1);
            setFormData({});
          }, 300);
        }
      }}
    >
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
            Step {step} of {TOTAL_STEPS}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && <StepOne defaultValues={formData} onNext={handleNext} />}

        {step === 2 && (
          <StepTwo
            defaultValues={formData}
            onFinalSubmit={handleFinalSubmit}
            onBack={handleBack}
            isPending={addApplication.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
