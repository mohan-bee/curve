import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { SkipBack } from 'lucide-react'

const OTP = () => {
  const [otp, setOtp] = useState('')
  const [verifying, setVerifying] = useState(false)
  const { verify } = useAuthStore()

  const handleVerify = async (e) => {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 px-4 py-12">
      <form
        onSubmit={handleVerify}
        className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm space-y-4"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white">Verify OTP</h2>
          <p className="text-xs text-zinc-400">
            Enter the 4-digit code sent to your email address
          </p>
        </div>

        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-center text-lg tracking-widest text-white"
          placeholder="1234"
          aria-label="One-time password"
        />

        <button
          type="submit"
          disabled={verifying}
          className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-zinc-950 font-semibold py-2.5 rounded-xl transition duration-200 cursor-pointer"
        >
          {verifying ? 'Verifying...' : 'Verify & Continue'}
        </button>

        <div className="pt-2 flex justify-center">
          <Link
            className="text-xs text-zinc-400 hover:text-zinc-200 hover:underline inline-flex items-center gap-1.5"
            to="/login"
          >
            <SkipBack size={14} /> Change email or resend OTP
          </Link>
        </div>
      </form>
    </div>
  )
}

export default OTP
