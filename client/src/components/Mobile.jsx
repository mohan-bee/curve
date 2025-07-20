
import { MonitorX } from 'lucide-react'
import React from 'react'

const Mobile = () => {
  return (
    <div className='flex flex-col gap-2 items-center h-screen w-screen justify-center'>
        <MonitorX size={30} className='text-amber-400'/>
        <p className='text-sm'>Switch to Desktop</p>
    </div>
  )
}

export default Mobile