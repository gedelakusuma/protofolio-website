/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, ShieldAlert } from 'lucide-react';

export default function PageLoader() {
  const [logs, setLogs] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const [completeCount, setCompleteCount] = useState(0);

  const startupSequence = [
    'Initializing neural interfaces...',
    'Establishing secure protocol to Duvvada, Visakhapatnam node...',
    'Loading academic database (CGPA: 9.07)...',
    'Importing Generative AI datasets...',
    'Synchronizing creative Full-Stack systems...',
    'Active Connection Established! Ready.'
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < startupSequence.length) {
        setLogs(prev => [...prev, startupSequence[currentIdx]]);
        setCompleteCount(c => c + Math.ceil(100 / startupSequence.length));
        currentIdx++;
      } else {
        clearInterval(interval);
        // Elegant short delay to let user see "Ready"
        setTimeout(() => {
          setVisible(false);
        }, 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070B14] text-white font-mono p-6"
        >
          {/* Glowing orb backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-violet-400/10 blur-[100px] pointer-events-none" />

          <div className="w-full max-w-lg p-6 rounded-xl border border-white/5 bg-slate-950/80 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">SYSTEM COGNITION BOOT</span>
              </div>
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Simulated terminal logs */}
            <div className="space-y-2 h-[160px] overflow-y-auto text-[11px] leading-relaxed select-none scrollbar-thin scrollbar-thumb-white/10">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start space-x-2"
                >
                  <span className="text-violet-400 font-bold shrink-0">&gt;</span>
                  <span className={index === startupSequence.length - 1 ? 'text-sky-300 font-bold' : 'text-slate-300'}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress counter */}
            <div className="mt-5 space-y-2 pt-3 border-t border-white/5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>PORTFOLIO CORE ENGINE</span>
                <span className="text-sky-400 font-bold">{Math.min(completeCount, 100)}%</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400"
                  animate={{ width: `${Math.min(completeCount, 100)}%` }}
                  transition={{ ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center space-x-2 text-xs text-slate-500 select-none">
            <Terminal className="w-3.5 h-3.5 text-violet-400/60" />
            <span>GEDELA KUSUMA // CS & AI INTELLECT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
