import { Info, LogOut, User } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ onOpenInfo }) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-20 bg-zinc-950/85 backdrop-blur border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div
          onClick={() => navigate('/home')}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <img src="/Logo.png" alt="Logo" className="w-9 h-9 object-contain" />
          <h1 className="text-xl font-black tracking-tight text-zinc-100">
            CURVE
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {onOpenInfo && (
            <button
              type="button"
              onClick={onOpenInfo}
              title="About Curve"
              className="inline-flex items-center justify-center p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition cursor-pointer"
            >
              <Info size={18} />
            </button>
          )}

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-700 transition cursor-pointer"
            >
              <User size={18} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-30 overflow-hidden">
                <button
                  type="button"
                  className="w-full px-4 py-2.5 flex justify-between items-center text-xs font-medium text-red-400 hover:bg-zinc-800/80 cursor-pointer transition"
                  onClick={async () => {
                    setOpen(false)
                    await logout()
                    navigate('/login')
                  }}
                >
                  <span>Log out</span>
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
