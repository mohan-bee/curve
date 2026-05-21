import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

const OTP = () => {
  const [otp, setOtp] = useState('')
  const { verify } = useAuthStore()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white">
      <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div className="mb-5 flex items-start gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-200">
            <ShieldCheck size={22} />
          </span>
          <div>
            <h2 className="text-2xl font-black">Enter OTP</h2>
            <p className="mt-1 text-sm text-zinc-400">Verify the code sent to your email.</p>
          </div>
        </div>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
          className="mb-4 h-12 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 text-center text-lg tracking-[0.35em] text-white outline-none transition placeholder:tracking-normal placeholder:text-zinc-600 focus:border-cyan-400"
          placeholder="1234"
        />
        <button
          onClick={async () => {
            await verify(otp); 
            window.location.reload()
          }
          }
          className="mb-5 w-full rounded-lg bg-emerald-400 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300"
        >
          Verify
        </button>
        <Link className='flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white' to={"/login"}><ArrowLeft size={15}/> Resend code</Link>
      </div>
    </div>
  )
}

export default OTP
