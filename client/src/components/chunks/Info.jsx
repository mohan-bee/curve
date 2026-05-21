import { ExternalLink } from 'lucide-react'
import React from 'react'

const Info = ({setOpenPopup}) => {
  return (
    <div className='fixed inset-0 z-30 flex items-center justify-center bg-zinc-950/75 px-4 backdrop-blur-sm'>
        <div className='flex max-h-[90vh] w-full max-w-lg flex-col gap-5 overflow-auto rounded-lg border border-zinc-800 bg-zinc-900 p-6 text-white shadow-2xl'>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">Welcome to Curve</p>
              <h2 className="mt-2 text-2xl font-black">Focused topic practice</h2>
            </div>
            <p className="text-sm leading-7 text-zinc-300">
                Curve is a playground for solving DSA problems by topic. It keeps the important problems together so each session can stay focused.
            </p>
            <div className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
              <a target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 font-semibold text-zinc-100 transition hover:border-cyan-400' href="https://github.com/mohan-bee/curve">
                GitHub <ExternalLink size={15} />
              </a>
              <a className='inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 font-semibold text-zinc-100 transition hover:border-emerald-400' target='_blank' rel='noopener noreferrer' href="https://discord.gg/mYyc4NDj">
                Discord <ExternalLink size={15} />
              </a>
            </div>
            <button  
            className='cursor-pointer rounded-lg bg-white py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300'
            onClick={() => {
              setOpenPopup(false)
              }}>Close</button>
        </div>
    </div>
  )
}

export default Info
