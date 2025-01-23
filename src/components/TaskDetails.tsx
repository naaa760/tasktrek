"use client";

import { Calendar, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Task, TaskPriority } from "@/types/task";

interface TaskDetailsProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
}

const priorityColors: Record<TaskPriority, string> = {
  low: "text-coffee-light",
  medium: "text-caramel",
  high: "text-red-400",
};

export function TaskDetails({ task, onUpdate }: TaskDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 space-y-4 border-t border-coffee-light/20 pt-4"
    >
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4 text-coffee-medium" />
          <input
            type="date"
            value={task.dueDate || ""}
            onChange={(e) => onUpdate(task.id, { dueDate: e.target.value })}
            className="glass-coffee text-coffee-dark rounded-lg px-3 py-1.5 text-sm border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-caramel/50 hover:border-coffee-light/40 transition-all"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2"
        >
          <AlertCircle className="h-4 w-4 text-coffee-medium" />
          <select
            value={task.priority || ""}
            onChange={(e) =>
              onUpdate(task.id, { priority: e.target.value as TaskPriority })
            }
            className="glass-coffee text-coffee-dark rounded-lg px-3 py-1.5 text-sm border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-caramel/50 hover:border-coffee-light/40 transition-all"
          >
            <option value="">No Priority</option>
            {Object.entries(priorityColors).map(([priority, color]) => (
              <option
                key={priority}
                value={priority}
                className={`${color} font-medium`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      <motion.textarea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileFocus={{ scale: 1.01 }}
        value={task.notes || ""}
        onChange={(e) => onUpdate(task.id, { notes: e.target.value })}
        placeholder="Add notes..."
        className="w-full glass-coffee text-coffee-dark rounded-xl px-4 py-3 text-sm border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-caramel/50 hover:border-coffee-light/40 transition-all min-h-[100px] resize-none placeholder-coffee-medium/60"
      />
    </motion.div>
  );
}
