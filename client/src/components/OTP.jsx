import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Link, useNavigate } from 'react-router-dom'
import { SkipBack } from 'lucide-react'

const OTP = () => {
  const [otp, setOtp] = useState('')
  const { verify } = useAuthStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-zinc-900 border border-zinc-700 shadow-md rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Enter OTP</h2>
        <input
          type="number"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border border-zinc-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-600 mb-4 text-center text-lg"
          placeholder="1234"
        />
        <button
          onClick={async () => {
            await verify(otp); 
            window.location.reload()
          }
          }
          className="w-full mb-5 bg-black text-white py-2 rounded-lg hover:bg-zinc-800 border border-zinc-700 transition duration-200"
        >
          Verify
        </button>
        <Link className='mt-10 text-zinc-400 hover:underline flex items-center gap-2' to={"/login"}>resend <SkipBack size={15}/> </Link>
      </div>
    </div>
  )
}

export default OTP
