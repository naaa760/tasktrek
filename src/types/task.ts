export type TaskPriority = "low" | "medium" | "high";

export type TaskCategory = {
  id: string;
  name: string;
  color: string;
};

export interface Task {
  id: string;
  content: string;
  completed: boolean;
  categoryId?: string;
  dueDate?: string;
  priority?: TaskPriority;
  notes?: string;
}
