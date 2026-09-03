"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const VIDEOS = [
  {
    id: "v1",
    title: "Self Taught Developer Journey from 0 | My Ups & Downs",
    category: "Dev Story",
    views: "2.4K views",
    tag: "Self Taught Bob",
    description: "Sharing everything about my development life from ground zero, overcoming obstacles as a self-taught engineer.",
    url: "https://youtube.com/@self_taught_bob"
  },
  {
    id: "v2",
    title: "How to Land Open Source Project Admin Roles (SSOC & GSSOC)",
    category: "Open Source Guide",
    views: "3.1K views",
    tag: "Mentorship",
    description: "A step-by-step roadmap for student developers to transition from first pull request to open source project leadership.",
    url: "https://youtube.com/@self_taught_bob"
  },
  {
    id: "v3",
    title: "Building IoT Hardware + Software (AutoBotX Hackathon Build)",
    category: "Project Deep Dive",
    views: "1.8K views",
    tag: "IoT & Systems",
    description: "Deep dive into how we placed 2nd in a national IoT hackathon using Python orchestration and hardware sensors.",
    url: "https://youtube.com/@self_taught_bob"
  }
];

export default function YouTubeHub() {
  const [isMentorshipOpen, setIsMentorshipOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="mentorship" className="relative bg-[#050505] px-6 py-28 text-white overflow-hidden">
      
      {/* Subtle Warm Backdrop Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400">
                YouTube & Mentorship
              </span>
            </div>
            <h2 className="font-mono text-3xl font-light tracking-widest text-white md:text-5xl uppercase">
              Self Taught <span className="text-red-500 font-bold">Bob</span>
            </h2>
            <p className="mt-3 text-sm text-white/60 font-light max-w-md">
              Teaching students, sharing developer guides, and helping devs grow from step 0.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsMentorshipOpen(true)}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] cursor-pointer"
            >
              🤝 Request Mentorship
            </button>
            <a
              href="https://youtube.com/@self_taught_bob"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 hover:border-white text-white/80 hover:text-white font-mono text-xs uppercase tracking-widest rounded-full transition-all"
            >
              YouTube Channel ↗
            </a>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group bg-[#0a0a0a] border border-white/10 hover:border-red-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex justify-between items-center mb-4 font-mono text-[9px] uppercase tracking-wider">
                  <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded">
                    {video.category}
                  </span>
                  <span className="text-white/40">{video.views}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-400 transition-colors leading-snug">
                  {video.title}
                </h3>

                <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                  {video.description}
                </p>
              </div>

              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-red-400 hover:text-red-300 uppercase tracking-widest pt-4 border-t border-white/5"
              >
                <span>Watch on YouTube</span>
                <span>➔</span>
              </a>
            </div>
          ))}
        </div>

        {/* Mentorship Modal */}
        <AnimatePresence>
          {isMentorshipOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMentorshipOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0c0c0c] border border-white/20 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative"
              >
                <button
                  onClick={() => setIsMentorshipOpen(false)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white font-mono text-xs uppercase"
                >
                  [ Close ]
                </button>

                <div className="mb-6">
                  <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest">Self Taught Bob</span>
                  <h3 className="text-2xl font-bold text-white uppercase mt-1">Request 1-on-1 Mentorship</h3>
                  <p className="text-xs text-white/60 mt-2 leading-relaxed">
                    Need help getting started in software development, open source contributions, or navigating your learning path? Reach out for a mentoring chat!
                  </p>
                </div>

                {submitted ? (
                  <div className="bg-red-950/30 border border-red-500/40 text-red-300 p-6 rounded-xl text-center font-mono text-xs leading-relaxed">
                    🎉 Mentorship request received! Nandini will reach out to your email shortly.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                      setTimeout(() => {
                        setSubmitted(false);
                        setIsMentorshipOpen(false);
                      }, 3000);
                    }}
                    className="space-y-4 font-mono text-xs"
                  >
                    <div>
                      <label className="block text-white/50 mb-1">Your Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Alex"
                        className="w-full bg-[#050505] border border-white/15 rounded-lg px-4 py-2.5 text-white outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 mb-1">Your Email</label>
                      <input
                        required
                        type="email"
                        placeholder="alex@example.com"
                        className="w-full bg-[#050505] border border-white/15 rounded-lg px-4 py-2.5 text-white outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 mb-1">What would you like mentorship on?</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="e.g. Starting open source contributions or BCA learning path..."
                        className="w-full bg-[#050505] border border-white/15 rounded-lg px-4 py-2.5 text-white outline-none focus:border-red-500 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                    >
                      Send Mentorship Request
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
