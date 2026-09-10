import Link from "next/link";
import { Suspense } from "react";
import { SignupForm } from "@/features/auth";
import { Card, CardContent } from "@/shared/ui/card";
import { Logo } from "@/shared/ui/logo";
import { Spinner } from "@/shared/ui/spinner";

export function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo href="/" />
          <p className="text-xs text-muted-foreground">
            Get started with your Ghosted instance
          </p>
        </div>

        <Card className="border-border/70 shadow-lg shadow-black/5 p-6">
          <CardContent className="p-0">
            <Suspense
              fallback={
                <div className="flex h-48 items-center justify-center">
                  <Spinner className="size-6 text-primary" />
                </div>
              }
            >
              <SignupForm />
            </Suspense>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
