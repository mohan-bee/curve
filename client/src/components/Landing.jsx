import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { ArrowRight, Code2, Sparkles, Timer, Trophy } from 'lucide-react'

const FEATURES = [
  {
    icon: Code2,
    title: 'Topic-Focused Mastery',
    description:
      'Practice curated high-signal DSA problems organized by topic instead of endless random lists.',
  },
  {
    icon: Timer,
    title: 'Timed Sprints',
    description:
      'Solve consecutive challenges under a live timer to build interview speed and recall.',
  },
  {
    icon: Trophy,
    title: 'Instant Verification',
    description:
      'Run Python solutions directly in the browser workspace and validate every test case in real time.',
  },
]

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden flex flex-col justify-between">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_55%)]" />

      <header className="relative z-10 max-w-6xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/Logo.png" alt="Curve Logo" className="w-9 h-9 object-contain" />
          <span className="text-xl font-black tracking-tight">CURVE</span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 transition cursor-pointer"
        >
          Sign in
        </button>
      </header>

      <main className="relative z-10 max-w-5xl w-full mx-auto px-6 py-12 flex flex-col items-center text-center gap-8">
        <Motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Topic-wise DSA Playground
        </Motion.div>

        <Motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-3xl leading-[1.08]"
        >
          Master algorithms one{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            focused curve
          </span>{' '}
          at a time.
        </Motion.h1>

        <Motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed"
        >
          Skip the noise. Pick a core data structure or algorithm topic, solve
          hand-picked problems in an integrated Python workspace, and track your
          speed.
        </Motion.p>

        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-base shadow-lg shadow-emerald-500/20 transition cursor-pointer"
          >
            Start Practicing
            <ArrowRight className="w-4 h-4" />
          </button>
        </Motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-8 text-left">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                {React.createElement(feature.icon, { className: 'w-4 h-4' })}
              </div>
              <h2 className="text-base font-semibold text-zinc-100 mb-1">
                {feature.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 py-6 text-center text-xs text-zinc-500 border-t border-zinc-900">
        Built for focused DSA preparation
      </footer>
    </div>
  )
}

export default Landing
