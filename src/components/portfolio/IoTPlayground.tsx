"use client";

import React, { useState, useEffect, useRef } from "react";
import { soundEngine } from "../../lib/useSoundFX";

export default function IoTPlayground() {
  const [distance, setDistance] = useState(35);
  const [powerOn, setPowerOn] = useState(true);
  const [mode, setMode] = useState<"AUTONOMOUS" | "MANUAL" | "CALIBRATING">("AUTONOMOUS");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = powerOn ? "#10b981" : "#ef4444";

      const width = canvas.width;
      const height = canvas.height;
      const mid = height / 2;

      for (let x = 0; x < width; x++) {
        const freq = powerOn ? 0.05 + (100 - distance) / 500 : 0.01;
        const amp = powerOn ? (distance < 20 ? 25 : 12) : 2;
        const y = mid + Math.sin((x + offset) * freq) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      offset += powerOn ? 3 : 0.5;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [distance, powerOn]);

  const getMotorStatus = () => {
    if (!powerOn) return { status: "OFFLINE", color: "text-red-400", speed: "0 RPM" };
    if (distance < 15) return { status: "EMERGENCY REVERSE", color: "text-red-400 animate-pulse", speed: "-850 RPM" };
    if (distance < 30) return { status: "OBSTACLE AVOIDANCE TURN", color: "text-yellow-400", speed: "420 RPM" };
    return { status: "FULL FORWARD CRUISE", color: "text-emerald-400", speed: "1200 RPM" };
  };

  const motor = getMotorStatus();

  return (
    <section id="iot-playground" className="relative bg-[#050505] px-6 py-28 text-white overflow-hidden border-t border-white/10">
      
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(16,185,129,0.1)_1px,_transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl z-10">
        
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-3 border border-emerald-500/40 px-4 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-300">
              National Hackathon 2nd Place Build
            </span>
          </div>
          <h2 className="font-mono text-3xl font-light tracking-widest text-white md:text-5xl uppercase">
            AutoBotX <span className="text-emerald-400 font-bold">IoT Simulator</span>
          </h2>
          <p className="mt-3 font-mono text-xs text-white/50 max-w-lg leading-relaxed uppercase tracking-wider">
            [ Hardware-Software Playground: Adjust virtual ultrasonic sensors & test real-time Python motor orchestration ]
          </p>
        </div>

        <div className="bg-[#090f14] border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(16,185,129,0.15)] font-mono backdrop-blur-xl">
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setPowerOn(!powerOn);
                }}
                className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest transition-all cursor-pointer ${powerOn ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-red-500/20 text-red-400 border border-red-500/40'}`}
              >
                {powerOn ? "SYS_POWER: ON 🟢" : "SYS_POWER: OFF 🔴"}
              </button>

              <div className="hidden sm:flex gap-2 text-[10px] text-white/40 uppercase">
                <span>MCU: ESP32 / Arduino</span>
                <span>•</span>
                <span>BACKEND: Python Server</span>
              </div>
            </div>

            <div className="flex gap-2">
              {(["AUTONOMOUS", "MANUAL", "CALIBRATING"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => {
                    soundEngine.playClick();
                    setMode(m);
                  }}
                  className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider border transition-all cursor-pointer ${mode === m ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'border-white/10 text-white/40 hover:text-white'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2 text-xs text-white/70 uppercase">
                  <span>Ultrasonic Distance Sensor Input</span>
                  <span className="text-emerald-400 font-bold">{distance} cm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={distance}
                  onChange={(e) => {
                    soundEngine.playScan();
                    setDistance(Number(e.target.value));
                  }}
                  disabled={!powerOn}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[9px] text-white/30 mt-1 uppercase">
                  <span>5cm (Obstacle Emergency)</span>
                  <span>100cm (Clear Path)</span>
                </div>
              </div>

              <div className="border border-emerald-500/30 bg-black/80 rounded-xl p-4 relative overflow-hidden">
                <div className="flex justify-between items-center text-[9px] text-white/40 mb-2">
                  <span>SENSOR_TELEMETRY_STREAM</span>
                  <span className={powerOn ? "text-emerald-400 animate-pulse" : "text-red-400"}>
                    {powerOn ? "LIVE DATA 80Hz" : "DISCONNECTED"}
                  </span>
                </div>
                <canvas ref={canvasRef} width={380} height={100} className="w-full h-24 rounded" />
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-emerald-400 uppercase tracking-widest mb-4">
                  Python Motor Orchestration Output
                </div>

                <div className="space-y-3 text-xs mb-6">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/40">ACTION_STATE</span>
                    <span className={`font-bold ${motor.color}`}>{motor.status}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/40">MOTOR_DRIVE_SPEED</span>
                    <span className="text-white font-bold">{motor.speed}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/40">LOOP_LATENCY</span>
                    <span className="text-white font-bold">4.2ms</span>
                  </div>
                </div>

                <div className="bg-[#050810] border border-white/10 p-3 rounded font-mono text-[10px] text-emerald-400/90 leading-relaxed overflow-x-auto">
                  <code>
                    [LOG] dist={distance}cm | mode={mode} <br/>
                    [CALL] motor_control(pwm={distance < 15 ? -255 : 200}) <br/>
                    [SYS] sensory loop nominal, status=OK
                  </code>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] text-white/40">
                <span>Award: 2nd Place IoT Hackathon</span>
                <a href="https://github.com/nandinigoyaldev/AutoBotX" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  Source Code ↗
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
