import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { KeyRound, Loader2, SkipBack } from 'lucide-react'

const OTP = () => {
  const [otp, setOtp] = useState('')
  const [verifying, setVerifying] = useState(false)
  const { verify } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!otp.trim() || verifying) return

    setVerifying(true)
    try {
      await verify(otp.trim())
      window.location.reload()
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-zinc-100 px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_55%)]" />

      <div className="relative z-10 bg-zinc-900/90 border border-zinc-800 shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto">
            <KeyRound className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Enter Verification Code</h2>
          <p className="text-sm text-zinc-400">
            Enter the 4-digit code sent to your email address.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-center text-xl tracking-[0.35em] font-semibold text-zinc-100 placeholder-zinc-600"
            placeholder="1234"
          />

          <button
            type="submit"
            disabled={verifying || !otp.trim()}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-zinc-950 font-semibold py-2.5 rounded-xl text-sm transition cursor-pointer"
          >
            {verifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify & Continue'
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-zinc-800/80 flex justify-center">
          <Link
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 transition"
            to="/login"
          >
            <SkipBack size={14} />
            Resend code or change email
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OTP
