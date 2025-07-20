import { DoorClosed, DoorOpen, LogOut, User } from 'lucide-react';
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
    <div className='flex py-5 items-center justify-around bg-white border-b border-b-slate-300'>
      <div className='flex items-center gap-2'>
        <img src="/Logo.png" alt="Logo" className="w-13 mb-2" />
        <h1 className='text-4xl font-black'>CURVE</h1>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center p-2 rounded-full bg-stone-800 text-white hover:bg-stone-700"
        >
          <User />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-30 bg-white border border-stone-200 rounded-lg shadow-lg z-10">
            <div 
            className="px-4  flex justify-between items-center py-2 text-sm text-red-600 hover:bg-stone-100 cursor-pointer"
            onClick={async () => {
              navigate("/login")
              await logout()
            }}
            >
              Log out <LogOut size={15}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
