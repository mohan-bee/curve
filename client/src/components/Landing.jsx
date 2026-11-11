import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Sparkles, Terminal } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-zinc-950 via-slate-900 to-cyan-950 overflow-hidden flex items-center justify-center px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_55%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs sm:text-sm font-medium"
        >
          <Sparkles size={15} /> Curated Topic-Wise DSA Mastery
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-xl"
        >
          MASTER DSA WITH{' '}
          <span className="bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent">
            CURVE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed"
        >
          Practice hand-picked data structures and algorithms problems organized by topic, with an integrated code runner and real-time test feedback.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-7 py-3.5 cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold rounded-xl text-base sm:text-lg shadow-lg shadow-cyan-500/20 transition"
          >
            Dive in <ArrowRight size={18} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl pt-8 text-left">
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 backdrop-blur">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-1">
              <Code2 size={16} /> Topic-Focused Roadmaps
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              High-signal problem sets structured to build pattern recognition without fluff.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 backdrop-blur">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
              <Terminal size={16} /> Instant Code Execution
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              Write, test, and verify solutions directly in the browser with immediate test-case diagnostics.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
