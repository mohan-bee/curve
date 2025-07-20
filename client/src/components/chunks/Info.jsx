import { Cross } from 'lucide-react'
import React from 'react'

const Info = ({setOpenPopup}) => {
  return (
    <div className='w-screen h-screen flex items-center backdrop-blur-xs justify-center absolute top-0'>
        <div className='bg-white border border-slate-300 rounded-md p-7 flex flex-col justify-between w-100 h-130'>
            <p>
                Hey, thanks for visiting Curve, Sadly this is under construction but some features may work go play around with those. <br />
                This is the playground where your can solve dsa problems specific to the topic and this will only have the important problems which will
                make you master in that topic.
                This application is open to contribution intrested one go ahead <a target='__blank' className='text-blue-500 underline' href="https://github.com/mohan-bee/curve">contribute here.</a> <br />
                <strong>I Built this because i struggled for topic wise preparation.</strong>  <br />
                if you are interest to work with me join the <a className='text-blue-500 underline' target='__blank' href="https://discord.gg/mYyc4NDj">discord</a> channel we can cook some thing better.
            </p>
            <button  className='bg-black cursor-pointer text-white py-2 rounded-md' onClick={() => setOpenPopup(false)}>Close</button>
        </div>
    </div>
  )
}

export default Info