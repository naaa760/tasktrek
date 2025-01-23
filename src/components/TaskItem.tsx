"use client";

import { Edit2 as EditIcon, Trash2 as TrashIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Task } from "@/types/task";
import { CategorySelect } from "./CategorySelect";
import { TaskDetails } from "./TaskDetails";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  editingTask: string | null;
  editContent: string;
  onEditChange: (value: string) => void;
  onSave: (id: string) => void;
  onCategoryChange: (id: string, categoryId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
  editingTask,
  editContent,
  onEditChange,
  onSave,
  onCategoryChange,
  onUpdateTask,
}: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateX: 2 }}
      className="coffee-card rounded-xl p-6 hover-lift-3d text-gray-800"
    >
      <div className="flex items-center gap-4">
        <motion.input
          whileTap={{ scale: 0.9 }}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 rounded border-coffee-light text-caramel focus:ring-coffee-medium transition-colors"
        />
        <div className="flex-1">
          {editingTask === task.id ? (
            <input
              type="text"
              value={editContent}
              onChange={(e) => onEditChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSave(task.id)}
              className="w-full px-4 py-2 glass-coffee rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-caramel/50"
              autoFocus
            />
          ) : (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-lg block ${
                task.completed ? "line-through text-gray-500" : "text-gray-800"
              }`}
            >
              {task.content}
            </motion.span>
          )}
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-cream/50 rounded-lg transition-all"
          >
            <EditIcon size={20} className="text-coffee-medium" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(task.id)}
            className="p-2 hover:bg-red-100/50 rounded-lg transition-all"
          >
            <TrashIcon size={20} className="text-red-400" />
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <CategorySelect
          value={task.categoryId}
          onChange={(categoryId) => onCategoryChange(task.id, categoryId)}
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-3 text-sm text-coffee-medium hover:text-coffee-dark transition-colors"
      >
        {isExpanded ? "Hide Details" : "Show Details"}
      </motion.button>

      <AnimatePresence>
        {isExpanded && <TaskDetails task={task} onUpdate={onUpdateTask} />}
      </AnimatePresence>
    </motion.div>
  );
}
