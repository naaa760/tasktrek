"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface TaskFormProps {
  newTask: string;
  onNewTaskChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function TaskForm({
  newTask,
  onNewTaskChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={onSubmit}
      className="mb-8"
    >
      <div className="flex gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex-1 glass-morphism rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-400"
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => onNewTaskChange(e.target.value)}
            className="w-full px-6 py-4 bg-transparent text-white placeholder-indigo-200/60 focus:outline-none"
            placeholder="What needs to be done?"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-shadow flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Task
        </motion.button>
      </div>
    </motion.form>
  );
}
