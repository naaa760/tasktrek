import { useEffect } from "react";

interface ShortcutHandlers {
  onAddTask?: () => void;
  onToggleCompleted?: () => void;
  onSearch?: () => void;
  onClearSearch?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts({
  onAddTask,
  onToggleCompleted,
  onSearch,
  onClearSearch,
  onEscape,
}: ShortcutHandlers) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Check if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        if (event.key === "Escape") {
          onEscape?.();
        }
        return;
      }

      // Global shortcuts
      if (event.metaKey || event.ctrlKey) {
        switch (event.key.toLowerCase()) {
          case "k":
            event.preventDefault();
            onSearch?.();
            break;
          case "enter":
            event.preventDefault();
            onAddTask?.();
            break;
          case "d":
            event.preventDefault();
            onToggleCompleted?.();
            break;
          case "escape":
            event.preventDefault();
            onClearSearch?.();
            break;
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onAddTask, onToggleCompleted, onSearch, onClearSearch, onEscape]);
}
