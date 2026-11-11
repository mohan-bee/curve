import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'

const Login = () => {
  const [username] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || submitting) return
    setSubmitting(true)
    try {
      await login(username, email.trim())
      navigate('/verify')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md space-y-6 bg-zinc-900/90 border border-zinc-800 p-6 sm:p-8 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 mb-2"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
          <h1 className="text-2xl font-bold text-white">Sign in to Curve</h1>
          <p className="text-sm text-zinc-400">
            Enter your email address to receive a one-time verification code.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email-input" className="block text-xs font-medium text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                id="email-input"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-zinc-950 font-semibold py-2.5 rounded-xl text-sm cursor-pointer transition-colors"
          >
            {submitting ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
