"use client";

import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import TextScramble from "./TextScramble";

type CertificationNode = {
  id: string;
  name: string;
  category: "GLOBAL CERT" | "AI & WEB" | "AUTOMATION" | "HACKATHON WIN" | "HONOR";
  issuer: string;
  year: string;
  hash: string;
  details: string;
  color: "cyan" | "emerald" | "fuchsia" | "yellow";
  position: { left: string; top: string };
};

const CERTIFICATIONS: CertificationNode[] = [
  {
    id: "oscg-2026",
    name: "Open Source Connect Global '26",
    category: "GLOBAL CERT",
    issuer: "Open Source Connect Global",
    year: "2026",
    hash: "0xOSCG992",
    details: "Awarded Certificate of Participation for host & management leadership, technical speaker sessions, and developer event coordination at Open Source Connect Global 2026.",
    color: "cyan",
    position: { left: "18%", top: "28%" }
  },
  {
    id: "ang-genai",
    name: "Angular Meets Generative AI",
    category: "AI & WEB",
    issuer: "Angular Tech Summit",
    year: "2026",
    hash: "0xGENAI881",
    details: "Certified in 'Beyond the Browser: Angular Meets Generative AI' — building intelligent agent workflows, neural API integrations, and modern full-stack web architectures.",
    color: "fuchsia",
    position: { left: "50%", top: "72%" }
  },
  {
    id: "office-auto",
    name: "Office Automation Certificate",
    category: "AUTOMATION",
    issuer: "Open Source Hackathon",
    year: "2026",
    hash: "0xAUTO440",
    details: "Certificate of Participation in Pre-Assessment round of Open Source Hackathon & Business Process Automation.",
    color: "emerald",
    position: { left: "82%", top: "28%" }
  },
  {
    id: "iot-win",
    name: "IoT Hackathon 2nd Place",
    category: "HACKATHON WIN",
    issuer: "National IoT Hackathon",
    year: "2026",
    hash: "0xIOTWIN2",
    details: "Hackathon Winner: Awarded 2nd Place nationally for AutoBotX — an autonomous IoT system blending hardware sensory loops with Python orchestration.",
    color: "yellow",
    position: { left: "32%", top: "50%" }
  },
  {
    id: "apertre-top25",
    name: "Top 25 Contributor Apertre",
    category: "HONOR",
    issuer: "Apertre 3.0 Mentorship",
    year: "2026",
    hash: "0xTOP25OS",
    details: "Recognized among Top 25 national contributors in Apertre 3.0 open source program for high pull request output and repository contributions.",
    color: "cyan",
    position: { left: "68%", top: "50%" }
  }
];

const colorMap = {
  cyan: { text: "text-cyan-400", border: "border-cyan-500", bg: "bg-cyan-500", glow: "shadow-[0_0_30px_rgba(6,182,212,0.4)]" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500", bg: "bg-emerald-500", glow: "shadow-[0_0_30px_rgba(16,185,129,0.4)]" },
  fuchsia: { text: "text-fuchsia-400", border: "border-fuchsia-500", bg: "bg-fuchsia-500", glow: "shadow-[0_0_30px_rgba(217,70,239,0.4)]" },
  yellow: { text: "text-yellow-400", border: "border-yellow-500", bg: "bg-yellow-500", glow: "shadow-[0_0_30px_rgba(234,179,8,0.4)]" },
};

export default function CertificationsVault() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const activeCert = CERTIFICATIONS.find(c => c.id === activeId);

  return (
    <section className="relative bg-[#050505] px-6 pt-32 pb-24 text-white flex flex-col items-center justify-center overflow-hidden" id="certifications">
      
      {/* Deep Circuit Grid Background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.04)_1px,_transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#050505_100%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl z-10">
        
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4 border border-yellow-500/40 px-4 py-1.5 rounded-full bg-yellow-500/10 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-yellow-400">
              Security Protocol
            </span>
          </div>
          <h2 className="font-mono text-3xl font-light tracking-widest text-white md:text-5xl uppercase">
            <TextScramble text="CERTIFICATIONS" />
          </h2>
          <p className="mt-4 font-mono text-xs text-white/40 tracking-widest uppercase">
            [ Select encrypted credential core to decrypt verification token ]
          </p>
        </div>

        {/* The Holographic Motherboard Area */}
        <div className="relative w-full h-[420px] md:h-[480px] border border-white/10 bg-[#070b14]/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]">
          
          {/* Orbital Trace Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full animate-[spin_25s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

          {/* SVG Connection Laser Traces */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
            <line x1="18%" y1="28%" x2="50%" y2="50%" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="82%" y1="28%" x2="50%" y2="50%" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="72%" x2="50%" y2="50%" stroke="rgba(217,70,239,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="32%" y1="50%" x2="50%" y2="50%" stroke="rgba(234,179,8,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="68%" y1="50%" x2="50%" y2="50%" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Central Security Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-yellow-500/40 bg-yellow-500/10 backdrop-blur flex items-center justify-center pointer-events-none z-10">
            <span className="font-mono text-[9px] text-yellow-400 font-bold uppercase tracking-tighter">
              VAULT
            </span>
          </div>

          {/* Render Certification Microchip Nodes */}
          {CERTIFICATIONS.map((cert) => {
            const isActive = activeId === cert.id;
            const styles = colorMap[cert.color];

            return (
              <div
                key={cert.id}
                onClick={() => setActiveId(cert.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                style={cert.position}
              >
                {/* Glow Aura */}
                <div className={`absolute inset-0 ${styles.bg} blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                {isActive && <div className={`absolute inset-0 ${styles.bg} blur-2xl opacity-60`} />}

                {/* Chip Body */}
                <div className={`relative w-28 h-20 md:w-36 md:h-24 bg-[#0a0f1a] border-2 transition-all duration-300 ${isActive ? styles.border + ' ' + styles.glow : 'border-white/20 group-hover:border-white/50'} rounded-lg flex flex-col items-center justify-center p-2`}>
                  
                  <div className="text-center">
                    <div className={`font-mono text-[8px] uppercase tracking-widest ${isActive ? styles.text : 'text-white/40'}`}>
                      {cert.hash}
                    </div>
                    <div className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-tight line-clamp-2 mt-1 ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                      {cert.name}
                    </div>
                  </div>

                  <div className={`absolute -bottom-3 px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase border bg-[#050505] ${styles.border} ${styles.text}`}>
                    {cert.category}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Decryption Inspection Modal (Rendered outside overflow-hidden) */}
        <AnimatePresence>
          {activeCert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed inset-0 z-[150] flex items-center justify-center p-4"
              onClick={() => setActiveId(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/85 backdrop-blur-md pointer-events-none" />

              <div 
                className="relative w-full max-w-2xl bg-[#0a0f1a] border border-white/20 p-6 md:p-10 shadow-[0_0_80px_rgba(0,0,0,0.9)] rounded-2xl flex flex-col pointer-events-auto overflow-hidden font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 ${colorMap[activeCert.color].bg}`} />

                <button 
                  onClick={() => setActiveId(null)}
                  className="absolute top-4 right-4 text-xs text-white/50 hover:text-white uppercase tracking-widest cursor-pointer"
                >
                  [ Close ]
                </button>

                <div className="mb-4">
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${colorMap[activeCert.color].text}`}>
                    {activeCert.category} • {activeCert.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase text-white mt-1">
                    {activeCert.name}
                  </h3>
                  <div className="text-xs text-white/50 mt-1">
                    Issuer: {activeCert.issuer}
                  </div>
                </div>

                <div className="bg-black/60 border border-white/10 p-4 rounded-xl text-xs text-white/80 leading-relaxed font-sans mb-6">
                  <p>{activeCert.details}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40">VERIFY_TOKEN:</span>
                    <span className={`font-bold ${colorMap[activeCert.color].text}`}>{activeCert.hash}</span>
                  </div>

                  <a 
                    href="/assets/Nandini.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-white/90 transition-all text-[11px]"
                  >
                    View Resume & Certs ↗
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
