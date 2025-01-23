"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task } from "@/types/task";
import { TaskItem } from "@/components/TaskItem";
import { TaskForm } from "@/components/TaskForm";
import { Header } from "@/components/Header";
import { CategoryProvider } from "@/context/CategoryContext";
import { SearchAndFilter } from "@/components/SearchAndFilter";

import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { ShortcutsHelp } from "@/components/ShortcutsHelp";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TaskStats } from "@/components/TaskStats";
import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";

// Dynamically import icons
const SparklesDynamic = dynamic<LucideProps>(() =>
  import("lucide-react").then((mod) => mod.Sparkles)
);
const SearchDynamic = dynamic<LucideProps>(() =>
  import("lucide-react").then((mod) => mod.Search)
);
const FilterDynamic = dynamic<LucideProps>(() =>
  import("lucide-react").then((mod) => mod.Filter)
);
const ChevronDownDynamic = dynamic<LucideProps>(() =>
  import("lucide-react").then((mod) => mod.ChevronDown)
);
const ClockDynamic = dynamic<LucideProps>(() =>
  import("lucide-react").then((mod) => mod.Clock)
);
const LayoutDashboardDynamic = dynamic<LucideProps>(() =>
  import("lucide-react").then((mod) => mod.LayoutDashboard)
);
const TagDynamic = dynamic<LucideProps>(() =>
  import("lucide-react").then((mod) => mod.Tag)
);

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  const [searchInputRef, setSearchInputRef] = useState<HTMLInputElement | null>(
    null
  );

  const addTask = (e: React.FormEvent) => {
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

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditContent(task.content);
  };

  const saveEdit = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, content: editContent } : task
      )
    );
    setEditingTask(null);
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const handleCategoryChange = (taskId: string, categoryId: string) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, categoryId } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.content
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || task.categoryId === selectedCategory;
    const matchesCompleted = showCompleted || !task.completed;

    return matchesSearch && matchesCategory && matchesCompleted;
  });

  // Keyboard shortcut handlers
  const handleSearchFocus = () => {
    searchInputRef?.focus();
  };

  const handleClearSearch = () => {
    setSearch("");
    searchInputRef?.blur();
  };

  useKeyboardShortcuts({
    onAddTask: () => {
      const input = document.querySelector<HTMLInputElement>(
        'input[placeholder="What needs to be done?"]'
      );
      input?.focus();
    },
    onToggleCompleted: () => setShowCompleted(!showCompleted),
    onSearch: handleSearchFocus,
    onClearSearch: handleClearSearch,
    onEscape: () => {
      if (editingTask) {
        setEditingTask(null);
      } else {
        handleClearSearch();
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#FAFAD2] to-[#F3E5AB] overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Pattern Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4NGNjMTYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTJ2LTJoMnYyem0wLTJoLTJ2LTJoMnYyem0tMi0yaDJ2LTJoLTJ2MnoiLz48L2c+PC9nPjwvc3ZnPg==')]"
        />

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-lime-400/20 backdrop-blur-lg rounded-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-40 left-20 w-24 h-24 bg-yellow-100/30 backdrop-blur-lg rounded-full"
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pt-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Logo and Title */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center gap-3"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="floating-animation"
              >
                <div className="text-coffee-medium">
                  <SparklesDynamic size={48} />
                </div>
              </motion.div>
              <h1 className="text-7xl font-bold coffee-gradient-text tracking-tight">
                SuperTasks.io
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-lime-700 max-w-2xl mx-auto"
            >
              Transform your productivity with our beautiful and efficient task
              management system
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16"
            >
              <FeatureCard
                icon={<ClockDynamic size={32} />}
                title="Time Management"
                description="Organize tasks efficiently with due dates and reminders"
              />
              <FeatureCard
                icon={<LayoutDashboardDynamic size={32} />}
                title="Beautiful Interface"
                description="Enjoy a clean and intuitive design that makes task management a pleasure"
              />
              <FeatureCard
                icon={<TagDynamic size={32} />}
                title="Smart Categories"
                description="Categorize and filter tasks for better organization"
              />
            </motion.div>

            {/* Task Input */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={addTask}
              className="relative max-w-2xl mx-auto mt-12"
            >
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-8 py-6 text-lg rounded-2xl glass-coffee text-coffee-dark placeholder-coffee-medium/60 focus:outline-none focus:ring-2 focus:ring-caramel/50 shadow-xl"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-3 bg-lime-500 text-white rounded-xl font-medium shadow-lg hover:bg-lime-600 transition-colors"
              >
                Add Task
              </motion.button>
            </motion.form>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-6 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-colors"
              >
                <SearchDynamic size={20} />
                <span>Search Tasks</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-colors"
              >
                <FilterDynamic size={20} />
                <span>Filter</span>
              </motion.button>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16"
            >
              <StatCard number="10k+" label="Active Users" />
              <StatCard number="50k+" label="Tasks Completed" />
              <StatCard number="99%" label="Satisfaction" />
              <StatCard number="24/7" label="Support" />
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-lime-600"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDownDynamic size={32} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Task Management Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-yellow-50 py-20"
      >
        <CategoryProvider>
          <div className="max-w-4xl mx-auto px-4">
            <Header />
            <TaskStats tasks={tasks} />

            <TaskForm
              newTask={newTask}
              onNewTaskChange={setNewTask}
              onSubmit={addTask}
            />
            <SearchAndFilter
              search={search}
              onSearchChange={setSearch}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              showCompleted={showCompleted}
              onShowCompletedChange={setShowCompleted}
              inputRef={setSearchInputRef}
            />

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4 mt-8"
                  >
                    <AnimatePresence>
                      {filteredTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <motion.div
                                className={`backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-lg transition-all ${
                                  snapshot.isDragging ? "scale-105" : ""
                                }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                whileHover={{ scale: 1.02 }}
                              >
                                <TaskItem
                                  task={task}
                                  onToggle={toggleComplete}
                                  onEdit={startEditing}
                                  onDelete={deleteTask}
                                  editingTask={editingTask}
                                  editContent={editContent}
                                  onEditChange={setEditContent}
                                  onSave={saveEdit}
                                  onCategoryChange={handleCategoryChange}
                                  onUpdateTask={(taskId, updates) => {
                                    setTasks(
                                      tasks.map((t) =>
                                        t.id === taskId
                                          ? { ...t, ...updates }
                                          : t
                                      )
                                    );
                                  }}
                                />
                              </motion.div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {tasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/70 mt-12 p-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="mx-auto mb-4 opacity-50">
                  <SparklesDynamic size={48} />
                </div>
                <p className="text-xl">
                  No tasks yet. Add some tasks to get started!
                </p>
              </motion.div>
            ) : filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/70 mt-12 p-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="mx-auto mb-4 opacity-50">
                  <SearchDynamic size={48} />
                </div>
                <p className="text-xl">No tasks match your search criteria.</p>
              </motion.div>
            ) : null}
          </div>
          <ShortcutsHelp />
          <ThemeToggle />
        </CategoryProvider>
      </motion.section>
    </div>
  );
}

// New Components
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 backdrop-blur-xl bg-white/70 rounded-2xl border border-lime-200 shadow-lg"
    >
      <div className="text-lime-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-lime-700 mb-2">{title}</h3>
      <p className="text-lime-600/80">{description}</p>
    </motion.div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="text-center p-4 backdrop-blur-xl bg-white/70 rounded-xl border border-lime-200 shadow-lg"
    >
      <div className="text-3xl font-bold text-lime-600 mb-1">{number}</div>
      <div className="text-sm text-lime-600/70">{label}</div>
    </motion.div>
  );
}
