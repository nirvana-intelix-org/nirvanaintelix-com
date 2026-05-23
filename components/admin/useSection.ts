"use client";

import { useCallback, useState } from "react";
import type { SaveStatus } from "./fields/SaveBar";

export function useSectionForm<T>(section: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });

  const update = useCallback((patch: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next =
        typeof patch === "function"
          ? (patch as (p: T) => T)(prev)
          : patch;
      return next;
    });
    setDirty(true);
    setStatus({ kind: "idle" });
  }, []);

  const save = useCallback(async () => {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch(`/api/admin/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setStatus({
          kind: "error",
          message: body.error ?? `Save failed (${res.status})`,
        });
        return false;
      }
      setStatus({ kind: "saved", at: Date.now() });
      setDirty(false);
      return true;
    } catch (e) {
      setStatus({
        kind: "error",
        message: e instanceof Error ? e.message : "Network error",
      });
      return false;
    }
  }, [section, value]);

  return { value, update, dirty, status, save };
}
