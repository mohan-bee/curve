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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Enter a username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
        onClick={async  () => {
            await login(username, email)
            navigate('/verify')
            }} 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">

          Send OTP
          
        </button>
      </div>
    </div>
  )
}

export default Login
