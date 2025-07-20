import React from 'react'
import {Search} from 'lucide-react'

const SearchBar = () => {
  return (
    <div className=' my-25 flex items-center justify-center'>
        <div className='border border-slate-300 ml-2 rounded-4xl w-100 h-13 flex items-center px-3'>
            <Search />
            <input onChange={() => alert("under construction")} type="text" className='w-full h-full px-3 outline-none' placeholder='Search for topics...'/>
        </div>
    </div>
  )
}

export default SearchBar