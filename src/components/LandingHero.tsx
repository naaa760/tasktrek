"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

export function LandingHero() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center py-6 px-8"
      >
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="XinoTask" width={32} height={32} />
          <span className="text-xl font-semibold">XinoTask</span>
        </div>

        <div className="flex items-center gap-8">
          <NavLink href="#features">How it works</NavLink>
          <NavLink href="#blog">Blogs</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#enterprise">Enterprise</NavLink>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-white text-indigo-600 rounded-full font-medium"
          >
            Start for Free
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-8"
          >
            <span className="text-sm text-indigo-200">Welcome to XinoTask</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
          >
            Your All-in-One Solution for{" "}
            <span className="text-indigo-400">Smarter Task</span> Management
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-indigo-200 mb-12"
          >
            Plan, prioritize, and track every project from start to finish with
            ease.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full font-medium text-white shadow-lg flex items-center gap-2"
            >
              <Download size={20} className="h-5 w-5" />
              Download for Mac
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 rounded-full font-medium text-white hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Book a demo
              <ArrowRight size={20} className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-full max-w-6xl mx-auto mt-16"
        >
          <div className="glass-morphism rounded-2xl p-2 shadow-2xl">
            <Image
              src="/dashboard-preview.png"
              alt="Dashboard Preview"
              width={1200}
              height={800}
              className="rounded-xl w-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      className="text-indigo-200 hover:text-white transition-colors"
    >
      {children}
    </motion.a>
  );
}
