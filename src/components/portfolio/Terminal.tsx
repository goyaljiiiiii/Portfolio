/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FILE_SYSTEM: Record<string, any> = {
  about: {
    "me.txt": "Nandini Goyal - SDR @ algoacquisition | AI Outbound Systems, Campus Lead @ Work2Hire, Founder @ CDN IGNOU, Content Creator @ Self Taught Bob.",
    "skills.txt": "AI Outbound Systems, B2B Signal Scraping, React, Next.js, Python, TypeScript, IoT, OpenCV, Program Management.",
    "certifications.txt": "1. Open Source Connect Global 2026\n2. Office Automation Certificate (Hackathon Pre-Assessment)\n3. Beyond the Browser: Angular Meets Generative AI",
  },
  experience: {
    "algoacquisition.txt": "Sales Development Representative (May 2026 - Present, London Area / Remote)\nBuilding AI systems that agentically scrape live web buying signals, map decision makers, & run hyper-personalized outreach across LinkedIn & email.",
    "work2hire.txt": "Campus Ambassador Program Manager Lead (June 2026 - Present)\nRecruiting, onboarding, and managing ambassador workflows across diverse universities & colleges.",
    "ssoc.txt": "Project Admin @ Social Summer of Code '26\nLeading open source projects, guiding contributors, and conducting code reviews.",
    "cdn-ignou.txt": "Founder & Technical Lead @ CDN IGNOU\nOrganizing hackathons, workshops, and student learning events via Commudle.",
  },
  projects: {
    "autobotx.txt": "AutoBotX: Award-winning IoT system (2nd Place National Hackathon). Blends hardware sensory loops with Python orchestration.",
    "autoalign.txt": "AutoAlign: Layout spatial calculation utility recognized on Commudle.",
  },
  "contact.txt": "Email: nandunandinigoyal@gmail.com\nLinkedIn: linkedin.com/in/nandinigoyaldev\nGitHub: github.com/nandinigoyaldev\nYouTube: youtube.com/@self_taught_bob\nResume: /assets/Nandini.pdf",
};

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cwd, setCwd] = useState<string[]>([]);
  const [history, setHistory] = useState<{ command: string; output: string }[]>([
    { command: "", output: "Welcome to the hidden terminal. Type 'help' for commands." }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let keyBuffer = "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (isOpen) return; // don't track when open
      keyBuffer += e.key;
      if (keyBuffer.length > 4) {
        keyBuffer = keyBuffer.slice(-4);
      }
      if (keyBuffer.toLowerCase() === "hack") {
        setIsOpen(true);
        keyBuffer = "";
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-terminal", handleOpen);
    return () => window.removeEventListener("open-terminal", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getCurrentNode = (path: string[]) => {
    let node = FILE_SYSTEM;
    for (const dir of path) {
      if (node[dir]) node = node[dir];
      else return null;
    }
    return node;
  };

  const [historyIndex, setHistoryIndex] = useState(-1);

  const matchKey = (obj: any, target: string) => {
    if (!target || !obj) return null;
    const s = target.toLowerCase();
    for (const key of Object.keys(obj)) {
      if (key.toLowerCase() === s) return key;
      if (s === "project" && key.toLowerCase() === "projects") return key; // handle plural alias
      // handle missing extension
      if (key.toLowerCase().startsWith(s + ".")) return key;
    }
    return null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const commandHistory = history.filter(h => h.command !== "").map(h => h.command);
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdLine = input.trim();
    if (!cmdLine) {
      setHistory((prev) => [...prev, { command: "", output: "" }]);
      setInput("");
      return;
    }

    setHistoryIndex(-1); // Reset history index on new command

    const args = cmdLine.split(" ").filter(Boolean);
    const cmd = args[0].toLowerCase();
    let output = "";

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }
    if (cmd === "exit") {
      setIsOpen(false);
      setInput("");
      return;
    }

    const currentNode = getCurrentNode(cwd);

    if (cmd === "help") {
      output = "Available commands: ls, cd, cat, pwd, clear, exit";
    } else if (cmd === "pwd") {
      output = "/home/visitor" + (cwd.length > 0 ? "/" + cwd.join("/") : "");
    } else if (cmd === "ls") {
      if (typeof currentNode === "object" && currentNode !== null) {
        output = Object.keys(currentNode)
          .map(k => typeof currentNode[k] === "object" ? `${k}/` : k)
          .join("  ");

        // Smart Hints
        if (cwd.length === 0) {
          output += "\n\n💡 Hint: Type 'cd projects' to open a folder, or 'cat contact.txt' to read a file.";
        } else {
          output += "\n\n💡 Hint: Type 'cat <filename>' to read a file, or 'cd ..' to go back.";
        }
      } else {
        output = "Not a directory.";
      }
    } else if (cmd === "cd") {
      const target = args[1];
      if (!target || target === "~") {
        setCwd([]);
      } else if (target === "..") {
        setCwd(prev => prev.slice(0, -1));
      } else if (target === "/") {
        setCwd([]);
      } else {
        const actualKey = matchKey(currentNode, target);
        if (actualKey && currentNode !== null && typeof currentNode[actualKey] === "object") {
          setCwd(prev => [...prev, actualKey]);
        } else if (actualKey && currentNode !== null && typeof currentNode[actualKey] === "string") {
          output = `cd: not a directory: ${target}`;
        } else {
          output = `cd: no such file or directory: ${target}`;
        }
      }
    } else if (cmd === "cat") {
      const target = args[1];
      if (!target) {
        output = "cat: missing file operand";
      } else {
        const actualKey = matchKey(currentNode, target);
        if (actualKey && currentNode !== null && typeof currentNode[actualKey] === "string") {
          output = currentNode[actualKey];
        } else if (actualKey && currentNode !== null && typeof currentNode[actualKey] === "object") {
          output = `cat: ${target}: Is a directory`;
        } else {
          output = `cat: ${target}: No such file or directory`;
        }
      }
    } else {
      output = `Command not found: ${cmd}. Type 'help'.`;
    }

    setHistory((prev) => [...prev, { command: cmdLine, output }]);
    setInput("");
  };

  const promptString = `visitor@nandini:~${cwd.length > 0 ? "/" + cwd.join("/") : ""}$`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[999] bg-black/95 text-green-500 font-mono p-6 flex flex-col backdrop-blur-md"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="absolute top-4 right-4 text-green-500/50 text-sm">
            [SYS_OVERRIDE_ACTIVE]
          </div>

          <div className="flex-1 overflow-y-auto mb-4">
            {history.map((h, i) => (
              <div key={i} className="mb-4">
                {h.command && (
                  <div className="flex gap-2">
                    <span className="text-green-700">{h.command.startsWith('cd') || h.command.startsWith('clear') ? "" : (i === history.length - 1 ? promptString : "visitor@nandini:~$ ")}</span>
                    <span>{h.command}</span>
                  </div>
                )}
                {h.output && (
                  <div className="whitespace-pre-wrap mt-1 text-green-400">
                    {h.output}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <span className="text-green-700 whitespace-nowrap">{promptString}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-green-500"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
