"use client";

import { AnimatePresence } from "framer-motion";
import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onCategoryChange: (taskId: string, categoryId: string) => void;
  editingTask: string | null;
  editContent: string;
  onEditChange: (value: string) => void;
  onSave: (id: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onCategoryChange,
  editingTask,
  editContent,
  onEditChange,
  onSave,
  onUpdateTask,
}: TaskListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onCategoryChange={onCategoryChange}
            editingTask={editingTask}
            editContent={editContent}
            onEditChange={onEditChange}
            onSave={onSave}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
