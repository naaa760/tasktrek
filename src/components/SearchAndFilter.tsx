"use client";

import { motion } from "framer-motion";
import { Search as SearchIcon, Filter as FilterIcon } from "lucide-react";
import { useCategories } from "@/context/CategoryContext";

interface SearchAndFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  showCompleted: boolean;
  onShowCompletedChange: (show: boolean) => void;
  inputRef?: (ref: HTMLInputElement | null) => void;
  sortBy?: string;
  onSortChange?: (value: string) => void;
}

export function SearchAndFilter({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  showCompleted,
  onShowCompletedChange,
  inputRef,
}: SearchAndFilterProps) {
  const { categories } = useCategories();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 space-y-4"
    >
      <div className="flex gap-3">
        <div className="relative flex-1">
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-medium"
          />
          <motion.input
            ref={inputRef}
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-3 glass-coffee text-coffee-dark rounded-xl border border-coffee-light/20 placeholder-coffee-medium/60 focus:outline-none focus:ring-2 focus:ring-caramel/50 hover:border-coffee-light/40 transition-all"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onShowCompletedChange(!showCompleted)}
          className={`px-4 py-2 rounded-xl border transition-all ${
            showCompleted
              ? "bg-coffee-medium border-coffee-dark text-cream"
              : "border-coffee-light text-coffee-medium hover:border-coffee-medium hover:text-coffee-dark"
          }`}
        >
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2"
      >
        <FilterIcon size={20} className="text-coffee-medium" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="glass-coffee text-coffee-dark rounded-xl px-4 py-2 border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-caramel/50 hover:border-coffee-light/40 transition-all"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="text-coffee-dark"
            >
              {category.name}
            </option>
          ))}
        </select>
      </motion.div>
    </motion.div>
  );
}
