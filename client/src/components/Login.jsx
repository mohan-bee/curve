import React from 'react'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const {login} = useAuthStore()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <form 
       onSubmit={async  () => {
            await login(username, email)
            navigate('/verify')
            }} 
      className="bg-zinc-800 border border-zinc-700 p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4">
        {/* <input
          type="text"
          placeholder="Enter a username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> */}
        <input
          type="email"
          required
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
        type='submit'
       
            className="w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-zinc-900 cursor-pointer transition-colors">

          Send OTP
          
        </button>
      </form>
    </div>
  )
}

export default Login
