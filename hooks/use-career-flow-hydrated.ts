"use client";

import { useSyncExternalStore } from "react";

import { useCareerFlowStore } from "@/features/career-flow/store";

function subscribeHydration(onStoreChange: () => void): () => void {
  const persist = useCareerFlowStore.persist;
  if (!persist) return () => {};
  return persist.onFinishHydration(onStoreChange);
}

function getHydratedSnapshot(): boolean {
  return useCareerFlowStore.persist?.hasHydrated() ?? true;
}

function getServerHydratedSnapshot(): boolean {
  return false;
}

/** Wait for zustand persist rehydration before routing guards run. */
export function useCareerFlowHydrated(): boolean {
  return useSyncExternalStore(
    subscribeHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );
}
