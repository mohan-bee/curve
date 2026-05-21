import { LogOut, User } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className='sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10'>
      <div className='flex items-center gap-2'>
        <img src="/Logo.png" alt="Curve" className="h-11 w-11 object-contain" />
        <div>
          <h1 className='text-xl font-black tracking-wide text-white'>CURVE</h1>
          <p className='text-xs font-medium text-zinc-500'>Practice workspace</p>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open account menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-white transition hover:border-emerald-400"
        >
          <User size={18} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl">
            <button
              type="button"
              aria-label="Log out"
              className="flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-zinc-800"
              onClick={async () => {
                navigate("/login")
                await logout()
              }}
            >
              Log out <LogOut size={15}/>
            </button>
          </div>
        )}
      </div>
      </div>
    </header>
  );
};

export default Navbar;
