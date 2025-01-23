"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { TaskCategory } from "@/types/task";

const defaultCategories: TaskCategory[] = [
  { id: "1", name: "Work", color: "#3B82F6" },
  { id: "2", name: "Personal", color: "#10B981" },
  { id: "3", name: "Shopping", color: "#F59E0B" },
  { id: "4", name: "Health", color: "#EF4444" },
];

interface CategoryContextType {
  categories: TaskCategory[];
  addCategory: (category: Omit<TaskCategory, "id">) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (id: string, category: Partial<TaskCategory>) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useLocalStorage<TaskCategory[]>(
    "categories",
    defaultCategories
  );

  const addCategory = (category: Omit<TaskCategory, "id">) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const updateCategory = (id: string, category: Partial<TaskCategory>) => {
    setCategories(
      categories.map((cat) => (cat.id === id ? { ...cat, ...category } : cat))
    );
  };

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, deleteCategory, updateCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}
