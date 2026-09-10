"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SplashLoader } from "@/widgets/loaders";

interface RedirectProps {
  to: string;
  replace?: boolean;
  onBeforeRedirect?: () => void;
  router?: {
    replace: (path: string) => void;
    push: (path: string) => void;
  };
}

export function Redirect({
  to,
  replace = true,
  onBeforeRedirect,
  router: customRouter,
}: RedirectProps) {
  const nextRouter = useRouter();
  const router = customRouter || nextRouter;

  useEffect(() => {
    onBeforeRedirect?.();
    if (replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, replace, onBeforeRedirect, router]);

  return <SplashLoader />;
}
