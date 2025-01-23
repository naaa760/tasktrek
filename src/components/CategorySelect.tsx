"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Tag, Plus } from "lucide-react";
import { useCategories } from "@/context/CategoryContext";
import { useState } from "react";

interface CategorySelectProps {
  value?: string;
  onChange: (categoryId: string) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  const { categories, addCategory } = useCategories();
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#C4A484",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      addCategory(newCategory);
      setNewCategory({ name: "", color: "#C4A484" });
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2"
      >
        <Tag className="h-4 w-4 text-coffee-medium" />
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="glass-coffee text-coffee-dark rounded-lg px-3 py-1.5 text-sm border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-caramel/50 hover:border-coffee-light/40 transition-all"
        >
          <option value="">No Category</option>
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

        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAdding(!isAdding)}
          className="p-1 hover:bg-cream/50 rounded-full transition-colors"
        >
          <Plus
            className={`h-4 w-4 text-coffee-medium transition-transform ${
              isAdding ? "rotate-45" : ""
            }`}
          />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="flex gap-2 overflow-hidden"
          >
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              placeholder="Category name"
              className="flex-1 glass-coffee text-coffee-dark rounded-lg px-3 py-1.5 text-sm border border-coffee-light/20 focus:outline-none focus:ring-2 focus:ring-caramel/50 hover:border-coffee-light/40 transition-all placeholder-coffee-medium/60"
              autoFocus
            />
            <input
              type="color"
              value={newCategory.color}
              onChange={(e) =>
                setNewCategory({ ...newCategory, color: e.target.value })
              }
              className="w-8 h-8 rounded-lg cursor-pointer hover:scale-110 transition-transform"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-3 py-1.5 bg-coffee-medium text-cream rounded-lg text-sm hover:bg-coffee-dark transition-colors"
            >
              Add
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-2 mt-2"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
              style={{
                backgroundColor: `${category.color}20`,
                color: category.color,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
