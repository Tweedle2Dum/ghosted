"use client";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

/**
 * Custom React hook to format a timestamp into a relative, human-readable time string (e.g., "7 minutes ago").
 *
 * Automatically re-evaluates and updates the displayed string every 60 seconds (1 minute interval).
 *
 * @param timestamp - Unix epoch timestamp in milliseconds, or `null`/`undefined`.
 * @returns Formatted relative time string (e.g., "3 hours ago"), or empty string if no timestamp is provided.
 *
 * @example
 * ```tsx
 * function CommentTimestamp({ createdAt }: { createdAt: number }) {
 *   const timeAgo = useRelativeTime(createdAt);
 *   return <span className="text-muted-foreground text-xs">{timeAgo}</span>;
 * }
 * ```
 */
export function useRelativeTime(timestamp?: number | null): string {
  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    if (!timestamp) {
      setRelativeTime("");
      return;
    }

    const updateTime = () => {
      setRelativeTime(formatDistanceToNow(timestamp, { addSuffix: true }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return relativeTime;
}
