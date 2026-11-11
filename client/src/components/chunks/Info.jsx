import React from 'react'

const Info = ({ setOpenPopup }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between max-w-md w-full space-y-6 shadow-2xl">
        <div className="space-y-3 text-sm leading-relaxed text-zinc-300">
          <h3 className="text-lg font-bold text-white">Welcome to Curve</h3>
          <p>
            Curve is your focused playground for topic-wise Data Structures & Algorithms mastery.
          </p>
          <p>
            This application is open to contributions —{' '}
            <a
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 underline"
              href="https://github.com/mohan-bee/curve"
            >
              contribute on GitHub
            </a>{' '}
            or join our{' '}
            <a
              className="text-cyan-400 underline"
              target="_blank"
              rel="noreferrer"
              href="https://discord.gg/mYyc4NDj"
            >
              Discord community
            </a>
            .
          </p>
        </div>
        <button
          type="button"
          className="w-full bg-cyan-500 hover:bg-cyan-400 cursor-pointer text-zinc-950 font-semibold py-2.5 rounded-xl transition"
          onClick={() => setOpenPopup(false)}
        >
          Got it, let&apos;s code
        </button>
      </div>
    </div>
  )
}

export default Info
