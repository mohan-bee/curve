import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const {login} = useAuthStore()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 text-white">
      <form 
       onSubmit={async (event) => {
            event.preventDefault()
            await login('', email)
            navigate('/verify')
            }} 
      className="w-full max-w-md space-y-5 rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">Sign in</p>
          <h1 className="mt-2 text-3xl font-black">Continue to Curve</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-400">Use your email to receive a one-time code.</p>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-300">Email</span>
          <span className="flex h-12 items-center rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-zinc-500 transition focus-within:border-cyan-400">
            <Mail size={18} />
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="h-full w-full bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </span>
        </label>
        <button 
        type='submit'
       
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-emerald-400 py-3 text-sm font-black text-zinc-950 transition hover:bg-emerald-300">

          Send OTP <ArrowRight size={17} />
          
        </button>
      </form>
    </div>
  )
}

export default Login
