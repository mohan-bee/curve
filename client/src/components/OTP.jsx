import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const OTP = () => {
  const [otp, setOtp] = useState('')
  const { verify } = useAuthStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Enter OTP</h2>
        <input
          type="number"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-center text-lg"
          placeholder="1234"
        />
        <button
          onClick={async () => {
            await verify(otp); 
            window.location.reload()
          }
          }
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Verify
        </button>
      </div>
    </div>
  )
}

export default OTP
