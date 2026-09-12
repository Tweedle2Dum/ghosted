import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/features/auth";
import { Card, CardContent } from "@/shared/ui/card";
import { Logo } from "@/shared/ui/logo";
import { Spinner } from "@/shared/ui/spinner";

export function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo href="/" />
          <p className="text-xs text-muted-foreground">
            Sign in to access your autonomous workspace
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
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/signup"
            className="text-primary hover:underline font-semibold"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
