// TasksProvider.tsx
import { createContext, useContext } from "react";
import { useTasks } from "@/hooks/useTasks";

const TasksContext = createContext<ReturnType<typeof useTasks> | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const value = useTasks();
  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasksContext() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasksContext must be used inside TasksProvider");
  return ctx;
}
