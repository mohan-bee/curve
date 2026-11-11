import { LogOut, User } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
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
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-zinc-900/90 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/home" className="flex items-center gap-2.5">
          <img src="/Logo.png" alt="Curve Logo" className="w-9 h-9 object-contain" />
          <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            CURVE
          </span>
        </Link>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            aria-label="User menu"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center p-2.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700 cursor-pointer transition"
          >
            <User size={18} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl z-20 overflow-hidden">
              <button
                type="button"
                className="w-full px-4 py-2.5 flex justify-between items-center text-sm text-red-400 hover:bg-zinc-800 cursor-pointer"
                onClick={async () => {
                  setOpen(false)
                  navigate('/login')
                  await logout()
                }}
              >
                <span>Log out</span>
                <LogOut size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
