import React from 'react'
import { useGlobalStore } from '../../store/useGlobalStore'
import { Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Solved = () => {
    const {timer, resetProblemSolved} = useGlobalStore()
    const randomIdx = Math.floor(Math.random() * 13)

    const navigate = useNavigate()

  return (
    <div className='flex items-center w-screen h-250 z-10  justify-center absolute top-0 backdrop-blur-xs'>
        <div className='w-100 h-120 bg-white flex flex-col gap-2 justify-between px-10 py-5'>
            <div className=''>
                <p className='text-2xl text-center font-bold'>CONGRATULATIONS</p>
            <p className='text-center font-light mb-2 text-sm'>You completed within {Math.floor(timer / 60)} mins</p>
            <div className=''>
            <img src={`/badges/Badge-4.png`} alt=""/>
            </div>
            </div>
            <button 
            className=' flex cursor-pointer items-center justify-center gap-2 bg-black text-white px-2 py-1 rounded-md'
            onClick={() => {
                navigate('/home')
                resetProblemSolved()
            }}
            > 
            <Home size={17}/> Go Home  
            </button>
        </div>
    </div>
  )
}

export default Solved