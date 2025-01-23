"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryProvider } from "@/context/CategoryContext";
import { Header } from "./Header";
import { TaskForm } from "./TaskForm";
import { SearchAndFilter } from "./SearchAndFilter";
import { TaskList } from "./TaskList";
import { TaskStats } from "./TaskStats";
import { ThemeToggle } from "./ThemeToggle";
import { Task } from "@/types/task";

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showCompleted, setShowCompleted] = useState(true);

  const handleNewTaskChange = (value: string) => setNewTask(value);
  const handleSearchChange = (value: string) => setSearch(value);
  const handleCategoryChange = (categoryId: string) =>
    setSelectedCategory(categoryId);
  const handleSortChange = (value: string) => setSortBy(value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      content: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 px-4"
    >
      <CategoryProvider>
        <div className="max-w-4xl mx-auto">
          <Header />
          <TaskStats tasks={tasks} />
          <TaskForm
            newTask={newTask}
            onNewTaskChange={handleNewTaskChange}
            onSubmit={handleSubmit}
          />
          <SearchAndFilter
            search={search}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            showCompleted={showCompleted}
            onShowCompletedChange={setShowCompleted}
          />
          <TaskList
            tasks={tasks}
            onToggle={(id) => {
              setTasks(
                tasks.map((task) =>
                  task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
                )
              );
            }}
            onDelete={(id) => {
              setTasks(tasks.filter((task) => task.id !== id));
            }}
            onEdit={(task) => {
              setEditingTask(task.id);
              setEditContent(task.content);
            }}
            onCategoryChange={(taskId, categoryId) => {
              setTasks(
                tasks.map((task) =>
                  task.id === taskId ? { ...task, categoryId } : task
                )
              );
            }}
            editingTask={editingTask}
            editContent={editContent}
            onEditChange={setEditContent}
            onSave={(id) => {
              setTasks(
                tasks.map((task) =>
                  task.id === id ? { ...task, content: editContent } : task
                )
              );
              setEditingTask(null);
            }}
            onUpdateTask={(taskId, updates) => {
              setTasks(
                tasks.map((task) =>
                  task.id === taskId ? { ...task, ...updates } : task
                )
              );
            }}
          />
        </div>
        <ThemeToggle />
      </CategoryProvider>
    </motion.section>
  );
}
