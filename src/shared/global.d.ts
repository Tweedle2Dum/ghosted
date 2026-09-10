import "@tanstack/react-query";
import type { AppError } from "./lib/errors";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AppError;
  }
}
