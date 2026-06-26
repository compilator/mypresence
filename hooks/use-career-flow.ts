import { useCareerFlowStore } from "@/features/career-flow/store";

/** Ergonomic access to the career flow store. */
export function useCareerFlow() {
  return useCareerFlowStore();
}
