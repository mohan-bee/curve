import { ExternalLink, Sparkles, X } from 'lucide-react'
import React from 'react'

const Info = ({ setOpenPopup }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-2xl p-6 sm:p-7 flex flex-col justify-between w-full max-w-md shadow-2xl space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Welcome to Curve</h3>
              <p className="text-xs text-zinc-400">Topic-focused DSA playground</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpenPopup(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
          <p>
            Thanks for visiting Curve. This playground helps you master Data
            Structures & Algorithms by focusing on curated, high-signal problems
            for each topic.
          </p>
          <p className="font-medium text-zinc-100">
            Built for developers who want structured, topic-wise preparation.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:underline"
              href="https://github.com/mohan-bee/curve"
            >
              Contribute on GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:underline"
              href="https://discord.gg/mYyc4NDj"
            >
              Join Discord
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <button
          type="button"
          className="w-full bg-emerald-500 hover:bg-emerald-400 cursor-pointer text-zinc-950 font-semibold py-2.5 rounded-xl text-sm transition"
          onClick={() => setOpenPopup(false)}
        >
          Got it, let&apos;s code
        </button>
      </div>
    </div>
  )
}

export default Info
