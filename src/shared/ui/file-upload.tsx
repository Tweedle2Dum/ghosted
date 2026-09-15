import { UploadCloud } from "lucide-react";
import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface FileUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      label = "Click to upload or drag and drop",
      description,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center w-full py-8 px-6 border-2 border-dashed rounded-2xl border-muted-foreground/25 bg-muted/10 hover:bg-muted/40 transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          className,
        )}
      >
        <UploadCloud className="size-10 mb-3 text-muted-foreground/40" />
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {description}
          </p>
        )}
        <input
          type="file"
          ref={ref}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...props}
        />
      </div>
    );
  },
);
FileUpload.displayName = "FileUpload";
