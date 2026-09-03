"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SignalResult = {
  company: string;
  domain: string;
  buyingSignalScore: number;
  signals: string[];
  decisionMakers: { name: string; title: string; linkedinUrl: string }[];
  generatedOutreach: string;
};

const PRESETS: Record<string, SignalResult> = {
  "Vercel": {
    company: "Vercel Inc.",
    domain: "vercel.com",
    buyingSignalScore: 94,
    signals: [
      "🔥 Active Hiring: 14 new Senior Enterprise SDR & Sales Ops roles posted",
      "🚀 Scaling Signal: 45% Team expansion in EMEA / London region",
      "💼 Budget Movement: Expanded Series E funding earmarked for outbound growth"
    ],
    decisionMakers: [
      { name: "Alex Rivers", title: "VP of Global Sales", linkedinUrl: "https://linkedin.com/in/nandinigoyaldev" },
      { name: "Elena Rostova", title: "Head of Revenue Operations", linkedinUrl: "https://linkedin.com/in/nandinigoyaldev" }
    ],
    generatedOutreach: "Hey Alex, saw Vercel's recent 45% team expansion in EMEA & the 14 new Enterprise Sales roles. Most B2B teams at your scale get stuck on static lead lists. At algoacquisition, our AI agentically scrapes real-time buying signals to drive 3-4x qualified response rates. Worth 5 mins?"
  },
  "Linear": {
    company: "Linear Systems",
    domain: "linear.app",
    buyingSignalScore: 89,
    signals: [
      "🔥 Tech Migration: Transitioning stack to enterprise AI agents",
      "🚀 Active Hiring: Hiring Head of Growth & Outbound Pipeline Engineers",
      "📈 Hiring Velocity: 30% QoQ engineering & sales growth"
    ],
    decisionMakers: [
      { name: "Marcus Vance", title: "Head of Growth", linkedinUrl: "https://linkedin.com/in/nandinigoyaldev" },
      { name: "Sarah Chen", title: "VP Product Marketing", linkedinUrl: "https://linkedin.com/in/nandinigoyaldev" }
    ],
    generatedOutreach: "Hi Marcus, noticed Linear's 30% QoQ growth & open Outbound Pipeline roles. Instead of spray-and-pray outreach, our AI systems agentically target active buying signals across LinkedIn & email. Let's exchange thoughts!"
  },
  "Stripe": {
    company: "Stripe",
    domain: "stripe.com",
    buyingSignalScore: 97,
    signals: [
      "🔥 Expansion Signal: Launching new B2B AI billing vertical",
      "🚀 Active Hiring: 28 Enterprise Account Executive requisitions open",
      "⚡ High Intent: Heavy API activity around automated web scraping"
    ],
    decisionMakers: [
      { name: "David Kim", title: "Chief Commercial Officer", linkedinUrl: "https://linkedin.com/in/nandinigoyaldev" },
      { name: "Rachel Adams", title: "Global SDR Director", linkedinUrl: "https://linkedin.com/in/nandinigoyaldev" }
    ],
    generatedOutreach: "Hello David, congrats on the new B2B AI billing vertical launch! As Stripe expands enterprise sales, static lead lists won't cut it. At algoacquisition, we deploy agentic web scraping to turn buying signals into predictable qualified deal flow."
  }
};

export default function SignalScanner() {
  const [targetQuery, setTargetQuery] = useState("Vercel");
  const [isScanning, setIsScanning] = useState(false);
  const [activeResult, setActiveResult] = useState<SignalResult | null>(PRESETS["Vercel"]);

  const handleScan = (queryToScan?: string) => {
    const query = (queryToScan || targetQuery).trim();
    if (!query) return;

    setIsScanning(true);
    setActiveResult(null);

    setTimeout(() => {
      const matchKey = Object.keys(PRESETS).find(k => k.toLowerCase() === query.toLowerCase());
      if (matchKey) {
        setActiveResult(PRESETS[matchKey]);
      } else {
        // Generate custom dynamic result for any typed company
        setActiveResult({
          company: `${query.charAt(0).toUpperCase() + query.slice(1)} Inc.`,
          domain: `${query.toLowerCase().replace(/\s+/g, "")}.com`,
          buyingSignalScore: Math.floor(Math.random() * 20) + 80,
          signals: [
            `🔥 Buying Signal: Active hiring for SDRs & Growth leads detected`,
            `🚀 Expansion Signal: Web footprint expanded in key B2B verticals`,
            `💼 Intent Signal: High buying urgency detected from live web scraping`
          ],
          decisionMakers: [
            { name: "Jordan Taylor", title: "VP of Business Development", linkedinUrl: "https://linkedin.com/in/nandinigoyaldev" },
            { name: "Sam Morgan", title: "Head of Enterprise SDR", linkedinUrl: "https://linkedin.com/in/nandinigoyaldev" }
          ],
          generatedOutreach: `Hi Jordan, noticed your team at ${query} is actively hiring & expanding outreach. Most B2B teams rely on static lists, but at algoacquisition our AI systems agentically target buying intent for 3-4x response rates. Open to a quick intro?`
        });
      }
      setIsScanning(false);
    }, 1200);
  };

  return (
    <section id="signal-scanner" className="relative bg-[#070b14] px-6 py-28 text-white overflow-hidden border-t border-b border-white/10">
      
      {/* Background Tech Mesh */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.15)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.03)_1px,_transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl z-10">
        
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-3 border border-cyan-500/40 px-4 py-1.5 rounded-full bg-cyan-500/10 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              algoacquisition Demo
            </span>
          </div>
          <h2 className="font-mono text-3xl font-light tracking-widest text-white md:text-5xl uppercase">
            AI Buying <span className="text-cyan-400">Signal Scanner</span>
          </h2>
          <p className="mt-4 font-mono text-xs text-white/50 max-w-xl leading-relaxed uppercase tracking-wider">
            [ Interactive Demo: Simulate how our AI agentically scrapes the live web for buying signals & generates hyper-personalized B2B outreach ]
          </p>
        </div>

        {/* Scanner Control Box */}
        <div className="bg-[#0a0f1d] border border-white/15 rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          
          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="font-mono text-xs text-white/60 uppercase tracking-widest">
              Quick Target Presets:
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(PRESETS).map(name => (
                <button
                  key={name}
                  onClick={() => {
                    setTargetQuery(name);
                    handleScan(name);
                  }}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider border transition-all ${targetQuery === name ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30 hover:text-white'}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar Input */}
          <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                value={targetQuery}
                onChange={(e) => setTargetQuery(e.target.value)}
                placeholder="Enter B2B company name or domain (e.g. OpenAI, Stripe)..."
                className="w-full bg-[#050810] border border-white/20 rounded-xl px-5 py-3.5 text-white font-mono text-sm placeholder:text-white/30 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] text-white/30 uppercase">
                AGENT_ID: SDR_01
              </span>
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              {isScanning ? (
                <>
                  <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Scraping Signals...
                </>
              ) : (
                <>
                  ⚡ Run Signal Agent
                </>
              )}
            </button>
          </form>

          {/* Scanning Animation State */}
          {isScanning && (
            <div className="py-16 flex flex-col items-center justify-center gap-4 border border-cyan-500/20 bg-cyan-500/5 rounded-xl font-mono">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <div className="text-cyan-400 text-xs tracking-widest uppercase animate-pulse">
                [ Agentically scraping live web... Job postings • Hiring velocity • Decision makers ]
              </div>
            </div>
          )}

          {/* Output Display */}
          <AnimatePresence mode="wait">
            {!isScanning && activeResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Left Card: Signal Telemetry */}
                <div className="bg-[#050810] border border-white/10 rounded-xl p-6 flex flex-col justify-between font-mono">
                  <div>
                    <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                      <div>
                        <span className="text-[9px] text-cyan-400 tracking-widest uppercase">Target Telemetry</span>
                        <h3 className="text-xl font-bold text-white uppercase">{activeResult.company}</h3>
                        <span className="text-xs text-white/40">{activeResult.domain}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-[9px] text-white/40 uppercase">Buying Intent Score</div>
                        <div className="text-2xl font-bold text-emerald-400">{activeResult.buyingSignalScore}/100</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="text-[10px] text-white/40 uppercase tracking-wider">Live Web Buying Signals:</div>
                      {activeResult.signals.map((sig, idx) => (
                        <div key={idx} className="text-xs text-white/80 bg-white/[0.03] p-2.5 rounded border border-white/5 leading-relaxed">
                          {sig}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Mapped Decision Makers:</div>
                    <div className="flex flex-col gap-2">
                      {activeResult.decisionMakers.map((dm, i) => (
                        <div key={i} className="flex justify-between items-center bg-cyan-950/20 border border-cyan-500/20 px-3 py-2 rounded text-xs">
                          <div>
                            <span className="text-white font-bold">{dm.name}</span>
                            <span className="text-white/40 block text-[10px]">{dm.title}</span>
                          </div>
                          <span className="text-cyan-400 text-[10px] uppercase">Ready ➔</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Card: Hyper-Personalized Outreach Output */}
                <div className="bg-[#050810] border border-cyan-500/30 rounded-xl p-6 flex flex-col justify-between font-mono relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-cyan-500 text-black text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl">
                    Generated Agentic Outreach
                  </div>

                  <div>
                    <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-3">
                      LinkedIn & Email Copy (3-4x Conversion Engine)
                    </div>

                    <div className="bg-black/60 border border-white/10 rounded-lg p-4 text-xs text-white/90 leading-relaxed font-sans mb-6 relative">
                      <div className="font-mono text-[9px] text-white/40 mb-2 border-b border-white/10 pb-1">
                        Subject: Quick question regarding {activeResult.company}&apos;s team expansion
                      </div>
                      <p>{activeResult.generatedOutreach}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center text-xs">
                      <div className="bg-white/[0.02] border border-white/10 p-3 rounded">
                        <span className="text-cyan-400 font-bold block text-base">3-4x</span>
                        <span className="text-[9px] text-white/40 uppercase">Response Uplift</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/10 p-3 rounded">
                        <span className="text-emerald-400 font-bold block text-base">100%</span>
                        <span className="text-[9px] text-white/40 uppercase">Intent Targeted</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-white/40 uppercase">
                    <span>System: algoacquisition SDR System</span>
                    <a href="https://linkedin.com/in/nandinigoyaldev" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                      Connect with Nandini ↗
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
