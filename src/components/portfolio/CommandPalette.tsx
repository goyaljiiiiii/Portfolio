"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CommandItem = {
  id: string;
  title: string;
  category: string;
  icon: string;
  action: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    {
      id: "mentorship",
      title: "YouTube & Mentorship Hub (Self Taught Bob)",
      category: "Community & Video",
      icon: "📹",
      action: () => scrollTo("mentorship")
    },
    {
      id: "terminal",
      title: "Launch Interactive Hacker Terminal",
      category: "System Action",
      icon: "💻",
      action: () => {
        setIsOpen(false);
        window.dispatchEvent(new Event("open-terminal"));
      }
    },
    {
      id: "resume",
      title: "Download Nandini's Official Resume",
      category: "Documents",
      icon: "📄",
      action: () => {
        setIsOpen(false);
        window.open("/assets/Nandini.pdf", "_blank");
      }
    },
    {
      id: "experience",
      title: "Explore Orbital Experience Map",
      category: "Navigation",
      icon: "🚀",
      action: () => scrollTo("experience")
    },
    {
      id: "projects",
      title: "View Hardware & Software Motherboard Cores",
      category: "Navigation",
      icon: "🔌",
      action: () => scrollTo("projects")
    },
    {
      id: "education",
      title: "View Education Neural Spine (IGNOU BCA / IICS MDCE)",
      category: "Navigation",
      icon: "🎓",
      action: () => scrollTo("education")
    },
    {
      id: "contact",
      title: "Connect & Send Message",
      category: "Navigation",
      icon: "✉",
      action: () => scrollTo("connect")
    }
  ];

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Floating Trigger Badge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[90] hidden md:flex items-center gap-2 bg-[#0c101d]/90 border border-white/20 text-white/80 hover:text-white px-4 py-2 rounded-full backdrop-blur-md shadow-2xl transition-all hover:scale-105 font-mono text-xs cursor-pointer"
      >
        <span>🔍 Search / Nav</span>
        <kbd className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-white/60">⌘K</kbd>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0e1a] border border-white/20 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden font-mono"
            >
              {/* Search Bar */}
              <div className="p-4 border-b border-white/10 flex items-center gap-3">
                <span className="text-white/40 text-lg">🔍</span>
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Type a command or search section..."
                  className="w-full bg-transparent text-white placeholder:text-white/30 text-sm outline-none"
                />
                <button onClick={() => setIsOpen(false)} className="text-xs text-white/40 hover:text-white uppercase">
                  Esc
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-[350px] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full text-left p-3 rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 flex items-center justify-between transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{cmd.icon}</span>
                        <div>
                          <div className="text-xs text-white group-hover:text-cyan-300 font-bold">{cmd.title}</div>
                          <div className="text-[10px] text-white/40">{cmd.category}</div>
                        </div>
                      </div>
                      <span className="text-xs text-white/30 group-hover:text-cyan-400">Jump ➔</span>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-white/40">
                    No matching commands found.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40">
                <span>Navigate: ↑↓ • Select: Enter</span>
                <span>Press Cmd+K anytime</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
