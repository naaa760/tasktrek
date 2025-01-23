"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CommandIcon, XIcon } from "lucide-react";
import { useState } from "react";

export function ShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ["⌘", "K"], description: "Focus search" },
    { keys: ["⌘", "Enter"], description: "Add new task" },
    { keys: ["⌘", "D"], description: "Toggle show completed" },
    { keys: ["Esc"], description: "Clear search / Close dialogs" },
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/80 transition-colors"
        aria-label="Keyboard shortcuts"
      >
        <CommandIcon className="h-5 w-5 text-lime-600" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-lime-800 flex items-center gap-2">
                  <CommandIcon className="h-5 w-5" />
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-lime-100 rounded-lg transition-colors"
                >
                  <XIcon className="h-5 w-5 text-lime-600" />
                </button>
              </div>
              <div className="space-y-3">
                {shortcuts.map(({ keys, description }) => (
                  <div
                    key={description}
                    className="flex items-center justify-between"
                  >
                    <span className="text-lime-700">{description}</span>
                    <div className="flex gap-1">
                      {keys.map((key) => (
                        <kbd
                          key={key}
                          className="px-2 py-1 bg-white rounded-lg border border-lime-200 text-sm text-lime-600 min-w-[24px] text-center"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
