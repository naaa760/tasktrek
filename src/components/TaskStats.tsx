"use client";

import { motion } from "framer-motion";
import { useCategories } from "@/context/CategoryContext";
import { Task } from "@/types/task";
import { ChartBar, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const { categories } = useCategories();

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    overdue: tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completed
    ).length,
    highPriority: tasks.filter((t) => t.priority === "high" && !t.completed)
      .length,
  };

  const categoryStats = categories.map((cat) => ({
    name: cat.name,
    count: tasks.filter((t) => t.categoryId === cat.id).length,
    color: cat.color,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="coffee-card rounded-2xl p-6 mb-8"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold text-coffee-dark mb-6 flex items-center gap-2"
      >
        <ChartBar className="h-6 w-6 text-coffee-medium" />
        Task Statistics
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<CheckCircle className="h-5 w-5" />}
          label="Completed"
          value={`${stats.completed}/${stats.total}`}
          color="text-coffee-medium"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label="Overdue"
          value={stats.overdue.toString()}
          color="text-caramel"
        />
        <StatCard
          icon={<AlertCircle className="h-5 w-5" />}
          label="High Priority"
          value={stats.highPriority.toString()}
          color="text-red-400"
        />
        <StatCard
          icon={<ChartBar className="h-5 w-5" />}
          label="Progress"
          value={`${
            stats.total ? Math.round((stats.completed / stats.total) * 100) : 0
          }%`}
          color="text-coffee-medium"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-t border-coffee-light/20 pt-4"
      >
        <h3 className="text-sm font-medium text-coffee-dark mb-3">
          By Category
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {categoryStats.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm text-coffee-dark">{cat.name}</span>
              <span className="text-sm text-coffee-medium">({cat.count})</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-coffee rounded-xl p-4 border border-coffee-light/20 hover:border-coffee-light/40 transition-all"
    >
      <div className={`flex items-center gap-2 ${color} mb-2`}>
        {icon}
        {label}
      </div>
      <div className="text-2xl font-bold text-coffee-dark">{value}</div>
    </motion.div>
  );
}
