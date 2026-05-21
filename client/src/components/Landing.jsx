import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Code2, Gauge, Layers3 } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-10 sm:px-8 lg:px-10">
        <nav className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/Logo.png" alt="Curve" className="h-12 w-12 object-contain" />
            <span className="text-xl font-black tracking-wide">CURVE</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-emerald-400 hover:text-white"
          >
            Sign in
          </button>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200">
              Topic-wise DSA practice
            </p>

            <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Practice the problems that actually build recall.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
              Curve organizes important data-structure and algorithm problems by topic, so every session has a clear target.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300"
              >
                Start practicing <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/home')}
                className="rounded-lg border border-zinc-700 px-5 py-3 text-sm font-bold text-zinc-200 transition hover:border-cyan-400 hover:text-white"
              >
                Explore topics
              </button>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-2xl">
            {[
              ['Arrays and hashing', '18 core problems', Code2],
              ['Two pointers', 'Pattern drills', Layers3],
              ['Dynamic programming', 'Timed practice', Gauge],
            ].map(([title, detail, Icon]) => (
              <div key={title} className="flex items-center gap-4 rounded-md border border-zinc-800 bg-zinc-950 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-200">
                  {React.createElement(Icon, { size: 20 })}
                </span>
                <div>
                  <h2 className="text-base font-bold">{title}</h2>
                  <p className="text-sm text-zinc-400">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing
